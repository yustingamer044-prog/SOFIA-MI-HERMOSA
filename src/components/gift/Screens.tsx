import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePan } from "./usePan";

/* ---------- P1 ---------- */
const FALLING = ["💗", "🦋", "✨", "💕", "⭐", "🎀", "💖", "🦋"];

export function Welcome({ onStart }: { onStart: () => void }) {
  const drops = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        e: FALLING[i % FALLING.length],
        left: Math.random() * 100,
        dur: 7 + Math.random() * 8,
        delay: -Math.random() * 15,
        size: 16 + Math.random() * 18,
      })),
    [],
  );
  return (
    <div className="bg-dream relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      {drops.map((d, i) => (
        <span
          key={i}
          className="gpu pointer-events-none absolute top-0"
          style={{ left: `${d.left}%`, fontSize: d.size + 8, filter: "drop-shadow(0 2px 4px oklch(0.6 0.2 340 / 0.5))", animation: `fall ${d.dur}s linear ${d.delay}s infinite` }}
        >
          {d.e}
        </span>
      ))}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="glass glow-ring relative z-10 w-full max-w-md rounded-[2rem] p-8 text-center sm:p-12"
      >
        <div className="mb-2 text-3xl">🎀</div>
        <h1 className="font-script text-6xl text-ink sm:text-7xl">Para ti, Sofía</h1>
        <p className="mt-4 text-lg font-semibold text-ink/80">De Julier, con todo el amor que tengo y más.</p>
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="glow-btn pulse-glow mt-8 rounded-full px-10 py-4 text-xl font-bold"
        >
          Empezar 💗
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ---------- Shared modal ---------- */
function LoveCard({ title, text, onClose }: { title: string; text: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-space/70 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.6, rotate: -6 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.6, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-dream relative w-full max-w-sm rounded-[2rem] border-2 border-chrome p-8 text-center"
        style={{ boxShadow: "var(--glow-pink)" }}
      >
        <div className="text-3xl">💌</div>
        <h3 className="font-script mt-1 text-5xl text-ink">{title}</h3>
        <p className="mt-4 text-lg font-semibold leading-relaxed text-ink">{text}</p>
        <button onClick={onClose} className="glow-btn mt-6 rounded-full px-6 py-2 font-bold">
          Cerrar 💖
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ---------- P2 ---------- */
const SUN_TEXT =
  "Tú eres el centro de todo lo que gira en mi vida. Sin ti, todo se apaga. Eres mi luz, mi calor, mi razón de levantarme.";
const PLANETS = [
  { name: "Ojos", e: "👀", color: "oklch(0.75 0.15 230)", text: "Me pierdo en ellos y no quiero que nadie me encuentre. Son lo más bonito que he visto y los miro como si fueran míos... porque lo son." },
  { name: "Risa", e: "😄", color: "oklch(0.85 0.16 90)", text: "Tu risa es mi sonido favorito del universo. Daría lo que fuera por escucharla todos los días de mi vida, hasta toda la eternidad." },
  { name: "Voz", e: "🎙️", color: "oklch(0.72 0.17 310)", text: "Cuando hablas, el mundo se calla. Quiero escucharte siempre, aunque sea para decir tonterías. Tu voz es mi lugar seguro." },
  { name: "Abrazos", e: "🤗", color: "oklch(0.75 0.2 355)", text: "En tus brazos el tiempo se detiene. No hay lugar en el mundo donde quiera estar más que pegadito a ti." },
  { name: "Manos", e: "🤝", color: "oklch(0.75 0.14 160)", text: "Tus manos son mi ancla. Quiero tomarlas para siempre y no soltarlas nunca, ni en esta vida ni en la siguiente." },
  { name: "Forma de ser", e: "🌸", color: "oklch(0.8 0.12 20)", text: "Eres única, Sofía. No existe otra igual en toda la existencia. Y yo tengo la suerte de que seas mía." },
  { name: "Tú", e: "💫", color: "oklch(0.88 0.05 280)", text: "Eres única, Sofía. No existe otra igual en toda la existencia. Y yo tengo la suerte de que seas mía." },
];

export function SolarSystem() {
  const { offset, handlers, isTap } = usePan(500);
  const [open, setOpen] = useState<{ title: string; text: string } | null>(null);
  const tap = (title: string, text: string) => isTap() && setOpen({ title, text });
  return (
    <div className="star-field relative h-full w-full touch-none overflow-hidden bg-space select-none" {...handlers}>
      <p className="absolute top-6 left-0 right-0 z-10 text-center text-sm font-semibold text-chrome/90">
        Arrastra para explorar • Toca un planeta 💖
      </p>
      <div
        className="absolute top-1/2 left-1/2 transition-transform duration-75"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {PLANETS.map((p, i) => {
          const r = 75 + i * 34;
          const dur = 14 + i * 5;
          return (
            <div key={p.name + i}>
              <div
                className="pointer-events-none absolute rounded-full border border-chrome/15"
                style={{ width: r * 2, height: r * 2, left: -r, top: -r }}
              />
              <div
                className="absolute"
                style={{ width: 0, height: 0, animation: `orbit ${dur}s linear ${-i * 3}s infinite` }}
              >
                <div className="absolute" style={{ left: r, top: 0 }}>
                  <div style={{ animation: `counter ${dur}s linear ${-i * 3}s infinite` }}>
                    <button
                      onPointerUp={() => tap(p.name, p.text)}
                      className="pulse-glow -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                      style={{ color: p.color }}
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
                        style={{ background: `radial-gradient(circle at 30% 30%, white, ${p.color})` }}
                      >
                        {p.e}
                      </span>
                      <span className="mt-1 whitespace-nowrap text-[10px] font-bold text-chrome">{p.name}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <button
          onPointerUp={() => tap("Sol", SUN_TEXT)}
          className="absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-script text-3xl text-ink"
          style={{
            background: "radial-gradient(circle, oklch(0.98 0.08 90), oklch(0.85 0.17 60), oklch(0.75 0.2 30))",
            boxShadow: "0 0 40px oklch(0.85 0.17 60), 0 0 100px oklch(0.75 0.2 30 / 0.7)",
            animation: "beat 3s ease-in-out infinite",
          }}
        >
          Sofía
        </button>
      </div>
      <AnimatePresence>{open && <LoveCard {...open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
}

/* ---------- P3 ---------- */
const WORDS = ["ADORO", "MI AMOR ETERNO", "ERES MAGIA", "UNIVERSO", "TE AMO"];
const PHRASES = [
  "Existes, y con eso me basta.", "Tu nombre es mi palabra favorita.", "Contigo hasta el silencio es bonito.",
  "Me haces mejor persona.", "Pienso en ti desde que abro los ojos hasta que los cierro.",
  "Eres mi persona favorita en todo el planeta.", "Tu felicidad es mi felicidad.", "No me imagino un futuro sin ti.",
  "Me gustas más que cualquier canción.", "Eres mi casualidad favorita.", "Contigo todo tiene sentido.",
  "Eres mi hogar.", "Te elegiría en todas las vidas.", "Amarte es lo más fácil que he hecho.",
  "Eres mi persona.", "Cada día te quiero más.",
];
const WORD_POS = [
  { x: -90, y: -170, z: 60 }, { x: 80, y: -125, z: -40 }, { x: -70, y: 150, z: 30 },
  { x: 90, y: 195, z: -20 }, { x: -20, y: 245, z: 80 },
];
const HEART_PATH = "M50 88 C20 66 4 48 4 30 C4 16 15 6 28 6 C38 6 46 12 50 20 C54 12 62 6 72 6 C85 6 96 16 96 30 C96 48 80 66 50 88 Z";

export function KawaiiUniverse() {
  const { offset, handlers, isTap } = usePan(300);
  const [bubble, setBubble] = useState<{ i: number; text: string } | null>(null);
  const idx = useRef(0);
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => {
        const t = (i / 40) * Math.PI * 2;
        const s = 6.2;
        return {
          x: 16 * Math.sin(t) ** 3 * s,
          y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * s,
          d: Math.random() * 2,
        };
      }),
    [],
  );
  const rx = -offset.y / 15;
  const ry = offset.x / 15;
  return (
    <div className="bg-deep-space relative h-full w-full touch-none overflow-hidden select-none" {...handlers}>
      <div className="star-field gpu absolute -inset-[250px] opacity-80" style={{ animation: "drift 90s linear infinite" }} />
      <p className="absolute top-6 left-0 right-0 z-10 text-center text-sm font-semibold text-chrome/90">
        Arrastra para girar • Toca una palabra ✨
      </p>
      <div className="absolute inset-0" style={{ perspective: 900 }}>
        <div
          className="gpu absolute top-1/2 left-1/2"
          style={{ transformStyle: "preserve-3d", transform: `rotateX(${rx}deg) rotateY(${ry}deg)`, transition: "transform 0.1s linear" }}
        >
          {particles.map((p, i) => (
            <span
              key={i}
              className="gpu absolute h-1.5 w-1.5 rounded-full"
              style={{ left: p.x, top: p.y, background: "oklch(0.92 0.1 355)", boxShadow: "0 0 6px var(--pink-hot)", animation: `twinkle 2.4s ease-in-out ${p.d}s infinite` }}
            />
          ))}
          <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: -6, transform: "translateZ(40px)" }}>
            <div className="gpu" style={{ animation: "beat 2.2s ease-in-out infinite" }}>
              <svg width="120" height="110" viewBox="0 0 100 92" style={{ filter: "drop-shadow(0 0 12px oklch(0.7 0.28 355)) drop-shadow(0 0 30px oklch(0.65 0.28 350))", overflow: "visible" }}>
                <defs>
                  <radialGradient id="hg" cx="35%" cy="30%" r="75%">
                    <stop offset="0%" stopColor="oklch(0.97 0.05 350)" />
                    <stop offset="40%" stopColor="oklch(0.75 0.25 355)" />
                    <stop offset="100%" stopColor="oklch(0.45 0.22 350)" />
                  </radialGradient>
                </defs>
                <path d={HEART_PATH} fill="oklch(0.35 0.18 350)" transform="translate(3 4)" />
                <path d={HEART_PATH} fill="url(#hg)" stroke="oklch(0.95 0.08 350)" strokeWidth="1.5" />
                <ellipse cx="30" cy="26" rx="10" ry="6" fill="oklch(1 0 0 / 0.55)" transform="rotate(-30 30 26)" />
              </svg>
            </div>
          </div>
          {WORDS.map((w, i) => (
            <div
              key={w}
              className="absolute"
              style={{ left: WORD_POS[i]!.x, top: WORD_POS[i]!.y, transform: `translate(-50%, -50%) translateZ(${WORD_POS[i]!.z}px)` }}
            >
              <button
                onPointerUp={() => {
                  if (!isTap()) return;
                  setBubble({ i, text: PHRASES[idx.current % PHRASES.length]! });
                  idx.current++;
                }}
                className="neon-3d font-display gpu block whitespace-nowrap text-lg sm:text-3xl"
                style={{ animation: `bob ${3 + i * 0.7}s ease-in-out infinite` }}
              >
                {w}
              </button>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble.text}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setBubble(null)}
            className="glass-dark absolute bottom-24 left-0 right-0 z-20 mx-auto w-[85%] max-w-sm rounded-3xl px-6 py-5 text-center"
          >
            <p className="text-xs font-bold tracking-[0.3em] text-pink/70">✦ {WORDS[bubble.i]} ✦</p>
            <p className="mt-2 text-lg font-bold text-pink" style={{ textShadow: "0 0 10px oklch(0.68 0.24 355 / 0.6)" }}>{bubble.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- P4 ---------- */
const CARDS = [
  { t: "Hay una Sophia en el escenario… pero la mía eres tú.", e: "💗", d: "🎤🦋" },
  { t: "Sé que Daniela es tu favorita… pero tranquila, tú eres la mía. Siempre.", e: "💫", d: "⭐🎀" },
  { t: "Mi canción favorita suena mejor cuando pienso en ti.", e: "🎵", d: "💿✨" },
  { t: "Podría escucharte mil veces y nunca me cansaría.", e: "🎧", d: "🦋💕" },
  { t: "Si el amor fuera un escenario, tú serías la estrella principal.", e: "⭐", d: "🌟🎀" },
  { t: "Eres mi bias en la vida real.", e: "💖", d: "📸🦋" },
];

export function Eyekon() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (viewport.current && track.current) setLimit(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return (
    <div className="bg-dream relative flex h-full w-full flex-col justify-center overflow-hidden py-16">
      <h2 className="font-display text-chrome px-16 text-center text-3xl sm:text-5xl">Sofía — EYEKON Edition 💫</h2>
      <div ref={viewport} className="mt-8 overflow-hidden px-[8vw]">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.12}
          dragTransition={{ power: 0.3, timeConstant: 220 }}
          className="gpu flex w-max cursor-grab gap-5 pb-6 active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
        >
          {CARDS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="chrome-border relative flex h-[23rem] w-[72vw] max-w-xs shrink-0 select-none flex-col items-center justify-between overflow-hidden rounded-[2rem] p-6 text-center"
              style={{ boxShadow: "var(--glow-pink)" }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[2rem]" style={{ background: "linear-gradient(180deg, oklch(1 0 0 / 0.55), transparent)" }} />
              <div className="pointer-events-none absolute -top-10 h-[150%] w-12" style={{ background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.6), transparent)", animation: `shine 4s ease-in-out ${i * 0.6}s infinite` }} />
              <span className="pointer-events-none absolute top-3 right-4 text-xl">🦋</span>
              <span className="pointer-events-none absolute bottom-16 left-3 text-sm">✦</span>
              <span className="pointer-events-none absolute top-1/2 right-3 text-sm">⭐</span>
              <div className="absolute -top-3 -left-6 rotate-[-20deg] px-10 py-1 text-xs font-bold text-ink" style={{ background: "var(--gradient-chrome)" }}>
                KATSEYE ✦ Y2K
              </div>
              <div className="gpu relative mt-6 flex h-32 w-32 items-center justify-center rounded-full border-2 border-chrome text-6xl" style={{ background: "radial-gradient(circle at 35% 30%, oklch(1 0 0), oklch(0.85 0.12 350 / 0.6))", boxShadow: "inset 0 -6px 14px oklch(0.6 0.2 340 / 0.35), 0 0 20px oklch(1 0 0 / 0.7)", animation: `bob ${3 + i * 0.4}s ease-in-out infinite` }}>
                {c.e}
              </div>
              <p className="relative text-lg font-bold leading-snug text-ink">"{c.t}"</p>
              <span className="relative text-2xl">{c.d}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="font-display fixed top-4 right-20 z-30 rotate-12 rounded-full border-2 border-chrome px-4 py-2 text-sm text-ink" style={{ background: "var(--gradient-chrome)", animation: "stickerGlow 2s ease-in-out infinite" }}>
        DANIELA 💫
      </div>
      <p className="text-center text-sm font-semibold text-ink/70">← Arrastra o desliza → 🦋</p>
    </div>
  );
}

/* ---------- P5 ---------- */
const FINAL =
  "Sofía, no sé cómo explicar lo que siento sin quedarme corto. Te amo con todo, te adoro con cada parte de mí y te deseo con cada latido. Eres mi principio, mi final y todo lo que hay en medio. Gracias por existir. Gracias por ser mía.";

export function Finale({ onRestart }: { onRestart: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= FINAL.length ? v : v + 1)), 45);
    return () => clearInterval(id);
  }, []);
  const burst = useMemo(
    () => Array.from({ length: 30 }, () => ({ a: Math.random() * Math.PI * 2, d: 150 + Math.random() * 300, e: ["💗", "💖", "💕", "✨"][Math.floor(Math.random() * 4)] })),
    [],
  );
  const done = n >= FINAL.length;
  return (
    <div className="bg-dream relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      {burst.map((b, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute top-1/2 left-1/2 text-3xl"
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
          animate={{ x: Math.cos(b.a) * b.d, y: Math.sin(b.a) * b.d, opacity: 0, scale: 1.4 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          {b.e}
        </motion.span>
      ))}
      <div className="glass relative z-10 w-full max-w-lg rounded-[2rem] p-8 text-center sm:p-10">
        <p className="min-h-[12rem] text-lg font-semibold leading-relaxed text-ink sm:text-xl">
          {FINAL.slice(0, n)}
          {!done && <span className="animate-pulse">|</span>}
        </p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: done ? 1 : 0 }} className="mt-6">
          <p className="font-script text-4xl text-ink">
            Con todo mi amor, Julier <span className="inline-block" style={{ animation: "beat 1.2s infinite" }}>💗</span>
          </p>
          <button onClick={onRestart} className="glow-btn mt-6 rounded-full px-8 py-3 font-bold">
            Volver a empezar 🔁
          </button>
        </motion.div>
      </div>
    </div>
  );
}
