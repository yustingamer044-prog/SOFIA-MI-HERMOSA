import { useRef, useState } from "react";

/** Drag-to-pan camera. Taps (< 10px movement) are let through as clicks. */
export function usePan(limit = 400) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const start = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const moved = useRef(0);
  const clamp = (v: number) => Math.max(-limit, Math.min(limit, v));

  const handlers = {
    onPointerDown: (e: React.PointerEvent) => {
      start.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
      moved.current = 0;
    },
    onPointerMove: (e: React.PointerEvent) => {
      const s = start.current;
      if (!s) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      moved.current = Math.max(moved.current, Math.hypot(dx, dy));
      if (moved.current >= 10) setOffset({ x: clamp(s.ox + dx), y: clamp(s.oy + dy) });
    },
    onPointerUp: () => (start.current = null),
    onPointerLeave: () => (start.current = null),
  };
  const isTap = () => moved.current < 10;
  return { offset, handlers, isTap };
}
