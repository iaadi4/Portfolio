"use client";

import { useEffect, useRef } from "react";

export default function PixelJungleBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PX = 5;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Colour palette
    const LEAVES = ["#1a3a0f","#2d5a1b","#3d7028","#52922f","#6aaa3d","#85c24e","#a0d660"];
    const BARK   = ["#18100a","#2a1c0e","#3a2814","#4a3418"];
    const GROUND = "#0d1a08";

    const W = () => Math.floor(canvas.width / PX);
    const H = () => Math.floor(canvas.height / PX);

    const px = (x: number, y: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(x * PX, y * PX, PX, PX);
    };

    // Seeded pseudo-random so tree shapes are stable across frames
    const rng = (seed: number) => {
      const x = Math.sin(seed + 1) * 43758.5453123;
      return x - Math.floor(x);
    };

    function drawScene(frame: number) {
      if (!ctx || !canvas) return;
      const w = W(), h = H();

      // --- Sky ---
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#080e08");
      grad.addColorStop(0.6, "#0d1a0d");
      grad.addColorStop(1, "#111f11");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle scanlines
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.04)";
        ctx.fillRect(0, y, canvas.width, 2);
      }

      // --- Stars (stable, seeded positions) ---
      for (let i = 0; i < 18; i++) {
        const sx = Math.floor(rng(i * 7.3) * w);
        const sy = Math.floor(rng(i * 3.1) * (h * 0.45));
        const bright = (Math.sin(frame * 0.03 + i) + 1) / 2;
        ctx.fillStyle = `rgba(180,220,180,${0.15 + bright * 0.25})`;
        ctx.fillRect(sx * PX, sy * PX, PX, PX);
      }

      // --- Ground layers ---
      for (let x = 0; x < w; x++) {
        px(x, h - 1, BARK[0]);
        px(x, h - 2, LEAVES[0]);
        if (x % 2 === 0) px(x, h - 3, LEAVES[1]);
        if (x % 3 === 0) px(x, h - 4, LEAVES[2]);
        if (x % 5 === 0) px(x, h - 5, LEAVES[1]);
      }

      // --- Background trees (dark, silhouette) ---
      const bgTrees = [3, 9, 16, 24, 31, 38, 45, 52, w - 9, w - 16];
      bgTrees.forEach((tx, i) => {
        if (tx < 0 || tx >= w) return;
        const th = 5 + Math.floor(rng(i * 11) * 3);
        for (let y = h - 2 - th; y < h - 2; y++) px(tx, y, BARK[0]);
        for (let lx = tx - 2; lx <= tx + 2; lx++) {
          for (let ly = h - 2 - th - 2; ly < h - 2 - th + 1; ly++) {
            if (lx < 0 || lx >= w) continue;
            px(lx, ly, LEAVES[0]);
          }
        }
      });

      // --- Foreground trees (stable, detailed) ---
      const fgTrees = [
        { tx: 6,      th: 10 },
        { tx: 18,     th: 13 },
        { tx: 30,     th: 11 },
        { tx: 43,     th: 14 },
        { tx: w - 7,  th: 10 },
        { tx: w - 18, th: 12 },
      ];
      fgTrees.forEach(({ tx, th }, i) => {
        if (tx < 0 || tx >= w) return;
        // Trunk
        for (let y = h - 2 - th; y < h - 2; y++) {
          px(tx, y, BARK[1 + (y % 2)]);
          if (y > h - 5) px(tx + 1, y, BARK[0]);
        }
        // Canopy — layered pyramid
        const canopyLayers = [
          { dy: 0, r: 2 },
          { dy: -2, r: 4 },
          { dy: -4, r: 5 },
          { dy: -6, r: 4 },
          { dy: -8, r: 3 },
        ];
        canopyLayers.forEach(({ dy, r }) => {
          const cy = h - 2 - th + dy;
          for (let lx = tx - r; lx <= tx + r; lx++) {
            if (lx < 0 || lx >= w) continue;
            const leafIdx = (lx + cy + i) % (LEAVES.length - 1) + 1;
            px(lx, cy, LEAVES[leafIdx]);
            px(lx, cy + 1, LEAVES[Math.max(0, leafIdx - 1)]);
          }
        });
      });

      // --- Hanging vines from top ---
      [10, 25, 38, w - 10].forEach((vx, i) => {
        if (vx < 0 || vx >= w) return;
        const len = 4 + (i % 3);
        for (let y = 0; y < len; y++) {
          px(vx, y, LEAVES[1 + (y % 2)]);
          if (y % 2 === 0) px(vx + 1, y, LEAVES[2]);
        }
      });

      // --- Animated fish ---
      const fy = h - 7;
      const fx1 = Math.floor((frame * 0.35) % (w + 10));
      [[0,0],[1,0],[2,0],[3,0],[0,1],[1,1]].forEach(([dx, dy]) => {
        if (fx1 + dx >= 0 && fx1 + dx < w) px(fx1 + dx, fy + dy, "#e8742a");
      });
      if (fx1 + 3 < w) px(fx1 + 3, fy, "#fde68a");

      const fx2 = Math.floor(w - (frame * 0.22) % (w + 8));
      [[0,0],[1,0],[2,0],[3,0],[0,1],[1,1]].forEach(([dx, dy]) => {
        const x = fx2 + dx;
        if (x >= 0 && x < w) px(x, fy - 2 + dy, "#c026d3");
      });
      if (fx2 + 3 >= 0 && fx2 + 3 < w) px(fx2 + 3, fy - 2, "#fde68a");

      // --- Fireflies (blinking dots) ---
      for (let i = 0; i < 5; i++) {
        const ffx = Math.floor(rng(i * 5.5) * w);
        const ffy = Math.floor(rng(i * 2.3) * (h - 8)) + 2;
        const on  = Math.sin(frame * 0.07 + i * 2.1) > 0.5;
        if (on) {
          ctx.fillStyle = `rgba(180,255,100,${0.3 + Math.sin(frame * 0.07 + i) * 0.2})`;
          ctx.fillRect(ffx * PX, ffy * PX, PX, PX);
        }
      }
    }

    let frame = 0;
    const loop = () => {
      drawScene(frame++);
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="w-full overflow-hidden"
      style={{ height: 160, background: "#080e08", borderBottom: "1px solid hsl(var(--border))" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block", imageRendering: "pixelated" }}
      />
    </div>
  );
}