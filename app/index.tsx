import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  HOOK_KEY,
  KID_CAP,
  MENU,
  STATE_KEY,
  STOP_CAP,
  type RunState,
  type Zone,
} from "@/lib/menu";

export const Route = createFileRoute("/")({ component: Home });

type PickKey = string;

type PickRow = {
  key: PickKey;
  store: string;
  name: string;
  cost: number;
  fee: number;
  need?: string;
  spec: string;
};

function Home() {
  const [zone, setZone] = useState<Zone>("wp");
  const [showExtra, setShowExtra] = useState(false);
  const [extraSeen, setExtraSeen] = useState<Record<Zone, boolean>>({ wp: false, st: false });
  const [picks, setPicks] = useState<Record<PickKey, PickRow>>({});
  const [runState, setRunState] = useState<RunState>("open");
  const [hookStatus, setHookStatus] = useState("No webhook on this device yet.");
  const [hookInput, setHookInput] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [pickup, setPickup] = useState("");
  const [note, setNote] = useState("");
  const [cash, setCash] = useState(false);
  const [ticket, setTicket] = useState("");
  const [goLabel, setGoLabel] = useState("Send / copy order");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const saved = (localStorage.getItem(STATE_KEY) as RunState | null) || "open";
    setRunState(saved);
    setHookStatus(
      (localStorage.getItem(HOOK_KEY) || "").trim()
        ? "Webhook saved on this device."
        : "No webhook on this device yet.",
    );
  }, []);

  const stores = useMemo(
    () => MENU.filter((s) => s.zone === zone && (showExtra || !s.extra)),
    [zone, showExtra],
  );
  const extraExists = MENU.some((s) => s.zone === zone && s.extra);
  const list = Object.values(picks);
  const stops = [...new Set(list.map((i) => i.store))];
  const total = list.reduce((s, i) => s + i.cost + i.fee, 0);
  const closed = runState !== "open";

  function switchZone(next: Zone) {
    setZone(next);
    setShowExtra(extraSeen[next]);
    setPicks({});
    setTicket("");
    setGoLabel("Send / copy order");
  }

  function toggleItem(row: Omit<PickRow, "spec">) {
    setPicks((prev) => {
      if (prev[row.key]) {
        const next = { ...prev };
        delete next[row.key];
        return next;
      }
      const nextStops = new Set([...Object.values(prev).map((p) => p.store), row.store]);
      if (nextStops.size > STOP_CAP) {
        setFormError("Two stores is the cap. Uncheck one first or wait for the next walk.");
        return prev;
      }
      setFormError("");
      return { ...prev, [row.key]: { ...row, spec: "" } };
    });
  }

  function setSpec(key: PickKey, spec: string) {
    setPicks((prev) => (prev[key] ? { ...prev, [key]: { ...prev[key], spec } } : prev));
  }

  function persistRun(s: RunState) {
    localStorage.setItem(STATE_KEY, s);
    setRunState(s);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (closed) {
      setFormError("This run is closed.");
      return;
    }
    if (!list.length) {
      setFormError("Pick at least one thing.");
      return;
    }
    const missing = list.find((i) => i.need && !i.spec.trim());
    if (missing) {
      setFormError(`Write the exact thing for ${missing.name}.`);
      return;
    }
    if (!cash) {
      setFormError("Check the cash promise.");
      return;
    }
    const bring = Math.ceil(total);
    const msg = [
      "DORF DASH RESERVE",
      "Who: " + name.trim(),
      "Contact: " + contact.trim(),
      "Pickup: " + pickup.trim(),
      "Run: " + (zone === "st" ? "Stonestown" : "West Portal"),
      "Stores (" + stops.length + "/" + STOP_CAP + "): " + stops.join(", "),
      "Items:",
      ...list.map(
        (i) =>
          "  • " +
          i.name +
          (i.spec ? " — " + i.spec : "") +
          " (" +
          i.store +
          ") ~$" +
          (i.cost + i.fee).toFixed(2),
      ),
      "Bring about $" + bring + " cash",
      note.trim() ? "Note: " + note.trim() : "Note: —",
    ].join("\n");
    setTicket(msg);
    const url = (localStorage.getItem(HOOK_KEY) || "").trim();
    let sent = false;
    if (url) {
      try {
        const r = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: msg }),
        });
        sent = r.ok;
      } catch {
        sent = false;
      }
    }
    try {
      await navigator.clipboard.writeText(msg);
    } catch {
      /* school computers often block clipboard */
    }
    setGoLabel(sent ? "Pinged Discord" : "Copied — paste in Discord");
  }

  function saveHook() {
    const v = hookInput.trim();
    if (!v.startsWith("https://discord.com/api/webhooks/")) {
      setHookStatus("That does not look like a Discord webhook URL.");
      return;
    }
    localStorage.setItem(HOOK_KEY, v);
    setHookInput("");
    setHookStatus("Webhook saved on this device.");
  }

  async function testHook() {
    const url = (localStorage.getItem(HOOK_KEY) || "").trim();
    if (!url) {
      setHookStatus("Save a webhook first.");
      return;
    }
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "Dorf Dash test ping. If you see this, webhooks work." }),
      });
      setHookStatus(r.ok ? "Test landed in Discord." : "Discord said no (" + r.status + ").");
    } catch {
      setHookStatus("Browser blocked it or the URL is dead. Copy still works.");
    }
  }

  const stateChip =
    runState === "full"
      ? "Run is full"
      : runState === "walk"
        ? "Walking back — too late"
        : "Open until we lock it";

  return (
    <div className="mx-auto max-w-xl px-4 pb-20 pt-6">
      <header className="text-center">
        <div className="mx-auto mb-2.5 grid size-[132px] place-items-center overflow-hidden rounded-mark bg-paper shadow-[0_8px_0_#12261e]">
          <img
            src="/gnome.jpg"
            alt="Dorf Dash gnome running with a tote bag"
            className="size-[132px] object-contain"
            width={132}
            height={132}
          />
        </div>
        <span className="mt-2.5 inline-block rounded-full bg-hat px-2.5 py-1 text-[0.78rem] font-bold uppercase tracking-wider text-paper">
          Not DoorDash · cash only · SFWHS
        </span>
        <h1 className="mt-2 font-display text-[clamp(2.2rem,8vw,3.4rem)] font-semibold leading-[0.95] tracking-tight text-cream">
          Dorf Dash
        </h1>
        <p className="mx-auto mt-3.5 max-w-md text-pretty leading-snug text-hint">
          Weston & Loden walk to West Portal or Stonestown so freshmen who can’t leave still
          eat. Cash on handoff. Order before school or from a campus computer — we lock it when the
          tote is full.
        </p>
      </header>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => switchZone("wp")}
          className={cn(
            "rounded-[14px] border px-2.5 py-3 text-center font-bold",
            zone === "wp"
              ? "border-gold bg-gold text-ink"
              : "border-leaf bg-moss-mid text-cream",
          )}
        >
          West Portal
          <small className="mt-0.5 block font-normal opacity-80">avenue shops</small>
        </button>
        <button
          type="button"
          onClick={() => switchZone("st")}
          className={cn(
            "rounded-[14px] border px-2.5 py-3 text-center font-bold",
            zone === "st"
              ? "border-gold bg-gold text-ink"
              : "border-leaf bg-moss-mid text-cream",
          )}
        >
          Stonestown
          <small className="mt-0.5 block font-normal opacity-80">mall run</small>
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3 rounded-2xl border border-leaf bg-moss-mid px-4 py-3.5">
        <div>
          <strong className="block">{zone === "st" ? "Stonestown lunch" : "West Portal lunch"}</strong>
          <span className="text-[0.88rem] leading-snug text-hint">
            {zone === "st"
              ? "Mall run · same lunch windows · 2 stores still the cap"
              : "Wed 12:30–1:30 · Thu 11:30–2:30 · lock before we walk"}
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-moss-deep px-2 py-1 text-xs text-cream">
              {KID_CAP} kids max
            </span>
            <span className="rounded-full bg-moss-deep px-2 py-1 text-xs text-cream">
              {stops.length} / {STOP_CAP} stores
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-1 text-xs",
                closed ? "bg-warn text-warn-fg" : "bg-moss-deep text-cream",
              )}
            >
              {stateChip}
            </span>
          </div>
        </div>
        <div className="shrink-0 rounded-full bg-gold px-2.5 py-1.5 text-xs font-bold text-ink">
          {zone === "st" ? "STONESTOWN" : "WEST PORTAL"}
        </div>
      </div>

      <h2 className="mt-7 font-display text-lg font-semibold">
        {zone === "st" ? "Stonestown shops" : "West Portal shops"}
      </h2>
      <p className="mt-1 text-[0.9rem] text-hint">
        Prices are guesses. Bring the “about” amount in cash. If it says write the thing, write the
        thing.
      </p>

      <div className="mt-3 space-y-3">
        {stores.map((store) => (
          <article key={store.store} className="overflow-hidden rounded-card bg-paper text-ink">
            <div className="flex items-start justify-between gap-2.5 px-3.5 pb-2.5 pt-3.5">
              <div>
                <h3 className="text-[1.08rem] font-bold">{store.store}</h3>
                <p className="mt-0.5 text-sm text-mute">
                  {store.where} · {store.blurb}
                </p>
              </div>
              {store.tag ? (
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-cream",
                    store.tag === "long" ? "bg-hat" : "bg-moss",
                  )}
                >
                  {store.tag}
                </span>
              ) : null}
            </div>
            {store.items.map((item) => {
              const key = `${store.store}::${item.name}`;
              const on = Boolean(picks[key]);
              const about = Math.ceil(item.cost + item.fee);
              return (
                <div
                  key={key}
                  className="grid grid-cols-[28px_1fr_auto] items-start gap-2 border-t border-line px-3.5 py-2.5"
                >
                  <input
                    id={key}
                    type="checkbox"
                    checked={on}
                    onChange={() =>
                      toggleItem({
                        key,
                        store: store.store,
                        name: item.name,
                        cost: item.cost,
                        fee: item.fee,
                        need: item.need,
                      })
                    }
                    className="mt-1 size-[18px]"
                  />
                  <label htmlFor={key} className="cursor-pointer">
                    <div className="font-bold">{item.name}</div>
                    {item.need ? (
                      <div className="mt-0.5 text-[0.78rem] text-need">Write {item.need}</div>
                    ) : null}
                  </label>
                  <div className="text-right tabular-nums">
                    <b className="block">${about}</b>
                    <small className="text-[0.72rem] text-mute">
                      item ~${item.cost.toFixed(0)} + ${item.fee.toFixed(2)} fee
                    </small>
                  </div>
                  {on && item.need ? (
                    <input
                      className="col-start-2 col-end-[-1] mt-1.5 w-full rounded-[10px] border border-field-border bg-field px-2.5 py-2"
                      placeholder={item.need}
                      value={picks[key]?.spec ?? ""}
                      onChange={(ev) => setSpec(key, ev.target.value)}
                    />
                  ) : null}
                </div>
              );
            })}
          </article>
        ))}
      </div>

      {extraExists ? (
        <button
          type="button"
          className="mt-2 mb-2 w-full rounded-xl border border-dashed border-leaf py-2.5 text-hint"
          onClick={() => {
            const next = !showExtra;
            setShowExtra(next);
            setExtraSeen((s) => ({ ...s, [zone]: next }));
          }}
        >
          {showExtra ? "Hide the longer-walk shops" : "Show the longer-walk shops"}
        </button>
      ) : null}

      {list.length > 0 ? (
        <div className="mt-3.5 rounded-2xl bg-moss-mid px-3.5 py-3">
          <h2 className="mb-2 font-display text-lg font-semibold">This run so far</h2>
          <div className="flex flex-wrap gap-1.5">
            {stops.map((st) => {
              const items = list
                .filter((i) => i.store === st)
                .map((i) => i.name + (i.spec ? " — " + i.spec : ""))
                .join(", ");
              return (
                <span
                  key={st}
                  className="inline-block rounded-full bg-moss-deep px-2 py-1 text-xs text-cream"
                >
                  {st}: {items}
                </span>
              );
            })}
          </div>
          <p className="mt-2 text-[0.9rem] text-hint">
            About ${Math.ceil(total)} cash · {stops.length} store{stops.length === 1 ? "" : "s"}
          </p>
        </div>
      ) : null}

      <h2 className="mt-7 font-display text-lg font-semibold">The rules, said out loud</h2>
      <ul className="mt-2 list-disc space-y-1 rounded-2xl bg-moss-deep px-5 py-4 leading-relaxed text-cream marker:text-gold">
        <li>A reserve is not an order. We buy after we know you’ll pay.</li>
        <li>Cash when we hand it to you. No cash = it was never a run.</li>
        <li>One neighborhood per run. Don’t mix Joe’s with Quickly.</li>
        <li>5 kids or 2 stores, whichever fills first. After that you’re on the next walk.</li>
        <li>Pickup spot is required. We announce in Discord. We don’t hunt you.</li>
      </ul>

      <h2 className="mt-7 font-display text-lg font-semibold">Reserve a thing</h2>
      <form onSubmit={onSubmit} className="mt-2 rounded-2xl bg-paper p-4 text-ink">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="who">
              Your name
            </label>
            <input
              id="who"
              required
              placeholder="first name is fine"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-[10px] border border-field-border bg-field px-3 py-2.5"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="contact">
              Discord or phone
            </label>
            <input
              id="contact"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full rounded-[10px] border border-field-border bg-field px-3 py-2.5"
            />
          </div>
        </div>
        <label className="mb-1.5 mt-3 block text-sm font-bold" htmlFor="pickup">
          Pickup spot
        </label>
        <input
          id="pickup"
          required
          placeholder="courtyard, lobby, by the office…"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full rounded-[10px] border border-field-border bg-field px-3 py-2.5"
        />
        <label className="mb-1.5 mt-3 block text-sm font-bold" htmlFor="note">
          Anything else
        </label>
        <textarea
          id="note"
          placeholder="no onions, I have a ten, allergy…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[70px] w-full rounded-[10px] border border-field-border bg-field px-3 py-2.5"
        />
        <label className="mt-3.5 flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={cash}
            onChange={(e) => setCash(e.target.checked)}
            className="mt-0.5"
            required
          />
          <span>
            I will have cash when you get back. If I flake, I cover whoever got stuck with my food.
          </span>
        </label>
        {formError ? <p className="mt-3 text-sm font-bold text-hat">{formError}</p> : null}
        <button
          type="submit"
          disabled={closed}
          className="mt-4 w-full rounded-xl bg-hat py-3.5 text-[1.05rem] font-bold text-paper disabled:cursor-not-allowed disabled:opacity-45"
        >
          {closed
            ? runState === "walk"
              ? "They're already walking"
              : "This run is full"
            : goLabel}
        </button>
        {ticket ? (
          <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-moss-deep p-3 font-mono text-[0.82rem] text-cream">
            {ticket}
          </pre>
        ) : null}
      </form>

      <details className="mt-7 rounded-2xl bg-moss-deep px-3.5 py-3 text-cream">
        <summary className="cursor-pointer font-bold">Dorfer setup (you + Loden)</summary>
        <p className="mt-2 text-[0.9rem] text-hint">
          Webhook stays on this phone only. School computers can still fill the form — you paste or
          it pings from your device.
        </p>
        <div className="mt-2 space-y-2">
          <button
            type="button"
            className="w-full rounded-xl bg-leaf py-2.5 text-paper"
            onClick={() => persistRun("open")}
          >
            Mark run open
          </button>
          <button
            type="button"
            className="w-full rounded-xl bg-leaf py-2.5 text-paper"
            onClick={() => persistRun("full")}
          >
            Mark run full
          </button>
          <button
            type="button"
            className="w-full rounded-xl bg-leaf py-2.5 text-paper"
            onClick={() => persistRun("walk")}
          >
            Mark walking back
          </button>
        </div>
        <label className="mb-1.5 mt-3 block text-sm font-bold text-cream" htmlFor="hook">
          Webhook URL
        </label>
        <input
          id="hook"
          type="password"
          autoComplete="off"
          placeholder="https://discord.com/api/webhooks/..."
          value={hookInput}
          onChange={(e) => setHookInput(e.target.value)}
          className="w-full rounded-[10px] border border-field-border bg-field px-3 py-2.5 text-ink"
        />
        <button
          type="button"
          className="mt-2 w-full rounded-xl bg-leaf py-2.5 text-paper"
          onClick={saveHook}
        >
          Save webhook on this device
        </button>
        <button
          type="button"
          className="mt-2 w-full rounded-xl bg-leaf py-2.5 text-paper"
          onClick={() => void testHook()}
        >
          Send a test ping
        </button>
        <div className="mt-2 text-sm text-ok">{hookStatus}</div>
      </details>

      <footer className="mt-9 text-center text-sm text-mute">
        Parody gnome. Not DoorDash. 470 West Portal Ave.
      </footer>
    </div>
  );
}
