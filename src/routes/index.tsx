import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { Eyekon, Finale, KawaiiUniverse, SolarSystem, Welcome } from "@/components/gift/Screens";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Para ti, Sofía 💗" },
      { name: "description", content: "Un regalo interactivo de Julier para Sofía, con todo su amor." },
      { property: "og:title", content: "Para ti, Sofía 💗" },
      { property: "og:description", content: "Un regalo interactivo de Julier para Sofía, con todo su amor." },
    ],
  }),
  component: Gift,
});

// Place the song file at public/risk-it-all.mp3
const SONG = "/risk-it-all.mp3";

function Gift() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);

  const go = (p: number) => {
    setDir(p > page ? 1 : -1);
    setPage(Math.max(0, Math.min(4, p)));
  };
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { a.pause(); setPlaying(false); }
  };
  const start = () => {
    setStarted(true);
    audio.current?.play().then(() => setPlaying(true)).catch(() => {});
    go(1);
  };

  const screens = [
    <Welcome key="0" onStart={start} />,
    <SolarSystem key="1" />,
    <KawaiiUniverse key="2" />,
    <Eyekon key="3" />,
    <Finale key="4" onRestart={() => go(0)} />,
  ];
  const navBtn = "glass fixed top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-2xl font-bold text-ink";

  return (
    <main className="fixed inset-0 overflow-hidden bg-space">
      <audio ref={audio} src={SONG} loop preload="none" />
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={page}
          className="absolute inset-0"
          initial={{ opacity: 0, x: dir * 60, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -dir * 60, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          {screens[page]}
        </motion.div>
      </AnimatePresence>

      {page > 0 && <button aria-label="Atrás" onClick={() => go(page - 1)} className={`${navBtn} left-2 sm:left-4`}>←</button>}
      {page < 4 && <button aria-label="Siguiente" onClick={() => go(page + 1)} className={`${navBtn} right-2 sm:right-4`}>→</button>}

      <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            aria-label={`Ir a la pantalla ${i + 1}`}
            onClick={() => go(i)}
            className={`h-3 rounded-full border border-chrome transition-all ${i === page ? "w-8 glow-btn" : "w-3 bg-chrome/40"}`}
          />
        ))}
      </div>

      {started && (
        <button aria-label={playing ? "Pausar música" : "Reanudar música"} onClick={toggle} className="glass fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full text-xl">
          <span style={playing ? { animation: "beat 1.5s infinite" } : undefined}>{playing ? "🎵" : "🔇"}</span>
        </button>
      )}
    </main>
  );
}
