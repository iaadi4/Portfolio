"use client";

import React, { useEffect, useRef, useState } from "react";

// --- Magnetic Component for Cool Buttons ---
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
      className="inline-block"
    >
      {children}
    </div>
  );
};

class Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  canvasWidth: number;
  canvasHeight: number;
  gravityRef: React.MutableRefObject<boolean>;
  hue: number;
  binaryChar: string;
  history: { x: number; y: number }[];

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    gravityRef: React.MutableRefObject<boolean>,
    startX?: number,
    startY?: number
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.gravityRef = gravityRef;

    this.x = startX || Math.random() * canvasWidth;
    this.y = startY || Math.random() * canvasHeight;
    this.history = [];

    const speed = startX ? 4 : 1.5; // Increased speed
    this.vx = (Math.random() - 0.5) * speed;
    this.vy = (Math.random() - 0.5) * speed;

    this.hue = Math.random() * 360;
    this.binaryChar = Math.random() > 0.5 ? "1" : "0";
  }

  update(
    partyMode: boolean,
    timeWarp: boolean,
    isFrozen: boolean,
    mouseX: number | null,
    mouseY: number | null,
    isMouseDown: boolean,
    enableTrails: boolean,
    isBlackHole: boolean
  ) {
    if (isFrozen) return;

    if (!this.history) this.history = [];
    if (enableTrails) {
      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > 60) this.history.shift();
    } else {
      if (this.history.length > 0) this.history = [];
    }

    const isGravity = this.gravityRef.current;
    const speedMult = partyMode ? 2 : 1;

    if (isGravity && !timeWarp) {
      this.vy += 0.2 * speedMult;
      this.vx *= 0.99;
      this.vy *= 0.99;
    } else {
      // Dampen velocity if not moving to prevent infinite speed accumulation
      // Dampen velocity if not moving to prevent infinite speed accumulation
      this.vx *= 0.99; // Less damping for more movement
      this.vy *= 0.99;
      // Fix: Ensure constant organic motion (never full stop)
      if (Math.abs(this.vx) < 0.2 && Math.abs(this.vy) < 0.2) {
        this.vx += (Math.random() - 0.5) * 0.5;
        this.vy += (Math.random() - 0.5) * 0.5;
      }
    }

    if (timeWarp) {
      this.x -= this.vx * speedMult * 3;
      this.y -= this.vy * speedMult * 3;
    } else {
      this.x += this.vx * speedMult;
      this.y += this.vy * speedMult;
    }

    if (isBlackHole && mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const blackHoleRadius = 400; // Increased Radius
      const blackHoleStrength = 1.5; // Stronger Black Hole

      if (dist < blackHoleRadius && dist > 5) {
        // Avoid division by zero and extreme forces at center
        this.vx += (dx / dist) * blackHoleStrength;
        this.vy += (dy / dist) * blackHoleStrength;
      }
      // Add some friction/damping inside the black hole to prevent particles from escaping easily
      if (dist < blackHoleRadius) {
        this.vx *= 0.95;
        this.vy *= 0.95;
      }
    }

    if (this.x < 0 || this.x > this.canvasWidth) {
      this.vx *= -1;
      if (this.x < 0) this.x = 0;
      if (this.x > this.canvasWidth) this.x = this.canvasWidth;
    }

    if (this.y < 0) {
      this.vy *= -1;
      this.y = 0;
    }

    if (this.y > this.canvasHeight) {
      if (isGravity) {
        this.y = this.canvasHeight;
        this.vy *= -0.6;
      } else {
        this.vy *= -1;
      }
    }

    if (mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseRadius = isMouseDown ? 300 : 200;

      if (dist < mouseRadius) {
        const force = (mouseRadius - dist) / mouseRadius;
        const pushStrength = isGravity || isMouseDown ? 5 : 2;
        const dir = timeWarp ? 1 : -1;

        this.x += (dx / dist) * force * pushStrength * dir;
        this.y += (dy / dist) * force * pushStrength * dir;
      }
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    isMatrix: boolean,
    isParty: boolean,
    isBinary: boolean,
    isTrails: boolean,
    isDarkMode: boolean
  ) {
    let color = "";
    if (isParty) {
      color = `hsl(${this.hue}, 100%, 50%)`;
      this.hue += 2;
    } else {
      if (isMatrix) {
        color = "#00ff41";
      } else {
        color = isDarkMode ? "#ffffff" : "#000000";
      }
    }

    // Map speed to color warmth
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (!isParty && !isMatrix && isDarkMode) {
      if (speed > 5) {
        ctx.fillStyle = "#ff4d4d"; // Red Hot
        ctx.shadowColor = "#ff4d4d";
        ctx.shadowBlur = 10;
      } else if (speed > 2) {
        ctx.fillStyle = "#ffaa00"; // Warm Orange
      }
    }

    ctx.fillStyle = ctx.fillStyle || color; // Fallback
    ctx.strokeStyle = ctx.fillStyle;

    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    // Optimized: Removed heavy shadowBlur. The cursor light will provide the "glow" atmosphere.
    // But for light mode, let's add a subtle dark glow/shadow to make white bg interesting
    if (!isDarkMode && !isMatrix && !isParty) {
      ctx.shadowBlur = 2;
      ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    } else {
      ctx.shadowBlur = 0;
    }

    if (isTrails && this.history && this.history.length > 1) {
      ctx.beginPath();
      ctx.lineWidth = isParty ? 2 : 0.5;

      ctx.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(this.history[i].x, this.history[i].y);
      }
      ctx.lineTo(this.x, this.y);

      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }

    if (isBinary) {
      ctx.font = "14px Courier New";
      ctx.fillText(this.binaryChar, this.x, this.y);
      if (Math.random() < 0.05)
        this.binaryChar = this.binaryChar === "1" ? "0" : "1";
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, isParty ? 3 : 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

const Portfolio = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [age, setAge] = useState("");

  const [isMatrix, setIsMatrix] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark Mode
  const [isParty, setIsParty] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [revealSecrets, setRevealSecrets] = useState(false);
  const [statusText, setStatusText] = useState("> system_ready");

  const [showLogoHint, setShowLogoHint] = useState(false);

  // Scramble Text State
  const [nameText, setNameText] = useState("Aditya Singh");
  const originalName = "Aditya Singh";

  // Secrets Persistence
  const [unlockedSecrets, setUnlockedSecrets] = useState<string[]>([]);
  const unlockSecret = (code: string) => {
    setUnlockedSecrets((prev) => {
      if (prev.includes(code)) return prev;
      return [...prev, code];
    });
  };

  const [bootStep, setBootStep] = useState(0);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [fps, setFps] = useState(0);
  const [particleCount, setParticleCount] = useState(45);

  const mouseRef = useRef({
    x: null as number | null,
    y: null as number | null,
    isDown: false,
  });
  const gravityRef = useRef(false);
  const pointsRef = useRef<Point[]>([]);
  const isMatrixRef = useRef(false);
  const isDarkModeRef = useRef(true); // Ref for dark mode to access in animation loop
  const isPartyRef = useRef(false);
  const isTimeWarpRef = useRef(false);
  const isBinaryRef = useRef(false);
  const isFrozenRef = useRef(false);
  const isTrailsRef = useRef(false);
  const isBlackHoleRef = useRef(false);
  const isExplodedRef = useRef(false);

  const lastFrameTime = useRef(performance.now());
  const frameCount = useRef(0);
  const lastMouseTime = useRef(Date.now());

  const spawnParticles = (count: number, x: number, y: number) => {
    if (!canvasRef.current) return;
    for (let i = 0; i < count; i++) {
      pointsRef.current.push(
        new Point(
          canvasRef.current.width,
          canvasRef.current.height,
          gravityRef,
          x,
          y
        )
      );
    }
    // Cap Max Particles
    if (pointsRef.current.length > 150) {
      // Increased max particles
      pointsRef.current = pointsRef.current.slice(
        pointsRef.current.length - 150
      );
    }
    setParticleCount(pointsRef.current.length);
  };

  const toggleMatrix = () => {
    setIsMatrix((prev) => !prev);
    isMatrixRef.current = !isMatrixRef.current;
    setStatusText(
      isMatrixRef.current ? "> matrix_loaded" : "> system_restored"
    );
    if (isMatrixRef.current) unlockSecret("HACK");
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    isDarkModeRef.current = !isDarkModeRef.current;
  };

  const scrambleName = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setNameText(() =>
        originalName
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalName[index];
            }
            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
          })
          .join("")
      );

      if (iteration >= originalName.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    // Cybernetic Boot Loader steps
    const steps = [
      () => setStatusText("> initializing_kernel... [OK]"),
      () => setStatusText("> mounting_volumes... [OK]"),
      () => setStatusText("> deciphering_identity..."),
      () => setStatusText("> loading_neural_net..."),
      () => setStatusText("> establishing_uplink... [CONNECTED]"),
      () => setBootStep(1),
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        steps[i]();
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400); // Faster boot
    return () => clearInterval(interval);
  }, []);

  // Timer to show the "Click Me" bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoHint(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateAge = () => {
      const birthDate = new Date("2004-10-08");
      const now = new Date();
      const diff = now.getTime() - birthDate.getTime();
      const ageYears = diff / (1000 * 60 * 60 * 24 * 365.25);
      setAge(`${ageYears.toFixed(9)}`);
    };
    updateAge();
    const interval = setInterval(updateAge, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.clear();
    console.log(`
       ════════════════════════════════════════════
                 INTERACTIVE COMMANDS              
       ════════════════════════════════════════════
      
      [G] - Toggle Gravity
      [F] - Freeze System
      [T] - Toggle Trails
      [E] - EXPLOSION!
      [D] - Debug Stats
      [B] - Binary Mode
      [SPACE] - Time Warp
      [H] - Hold for Gravity Well
      
       ════════════════════════════════════════════
                SECRETS ACCESS                 
       ════════════════════════════════════════════

      > Open the Help Menu (?) and click "Reveal Secrets" 
      > to unlock all hidden achievements logic.
      >
      > Try the Konami Code...
    `);
  }, []);

  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();

      if (k === "g") {
        gravityRef.current = !gravityRef.current;
        setStatusText(gravityRef.current ? "> gravity: ON" : "> gravity: OFF");
      }
      if (k === "f") {
        isFrozenRef.current = !isFrozenRef.current;
        setStatusText(
          isFrozenRef.current ? "> system_frozen" : "> system_resumed"
        );
      }
      if (k === "t") {
        isTrailsRef.current = !isTrailsRef.current;
        setStatusText(isTrailsRef.current ? "> trails: ON" : "> trails: OFF");
        if (isTrailsRef.current) unlockSecret("GHOST");
      }
      if (k === "d") {
        setShowDebug((prev) => !prev);
      }

      if (k === "e") {
        isExplodedRef.current = !isExplodedRef.current;
        if (isExplodedRef.current) {
          setStatusText("> BOOM !");
          unlockSecret("BOOM");
          pointsRef.current.forEach((p) => {
            p.vx = (Math.random() - 0.5) * 50;
            p.vy = (Math.random() - 0.5) * 50;
          });
        } else {
          setStatusText("> stabilizing...");
          pointsRef.current.forEach((p) => {
            p.vx *= 0.1;
            p.vy *= 0.1;
          });
        }
      }

      if (k === "h") {
        isBlackHoleRef.current = true;
        setStatusText("> GRAVITY_WELL_ACTIVE");
        unlockSecret("VOID");
      }

      if (e.code === "Space") {
        isTimeWarpRef.current = true;
        setStatusText("> time_warp: ACTIVE");
      }
      if (k === "b") {
        isBinaryRef.current = true;
      }

      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          isPartyRef.current = !isPartyRef.current;
          setIsParty(isPartyRef.current);
          setStatusText(
            isPartyRef.current ? "> PARTY_MODE !!!" : "> party_over"
          );
          unlockSecret("PARTY");
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        isTimeWarpRef.current = false;
        setStatusText("> time_warp: OFF");
      }
      if (e.key.toLowerCase() === "b") {
        isBinaryRef.current = false;
      }
      if (e.key.toLowerCase() === "h") {
        isBlackHoleRef.current = false;
        setStatusText("> gravity_well: OFF");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const hints = [
      "> press 'g' for gravity",
      "> press 't' for trails",
      "> hold 'space' to rewind",
      "> try: ↑ ↑ ↓ ↓ ← → ← → b a",
    ];
    let i = 0;
    const interval = setInterval(() => {
      const txt = statusText;
      if (
        !txt.includes("ON") &&
        !txt.includes("OFF") &&
        !txt.includes("!") &&
        !txt.includes("ACTIVE") &&
        !txt.includes("frozen")
      ) {
        setStatusText(hints[i]);
        i = (i + 1) % hints.length;
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [statusText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (pointsRef.current.length === 0) {
        spawnParticles(45, 0, 0);
      } else {
        pointsRef.current.forEach((p) => {
          p.canvasWidth = canvas.width;
          p.canvasHeight = canvas.height;
        });
      }
    };
    resizeCanvas();

    const drawConnections = () => {
      const isM = isMatrixRef.current;
      const isP = isPartyRef.current;
      const isDark = isDarkModeRef.current;
      const points = pointsRef.current;
      // Dynamic Connection Distance
      // If many particles, reduce connection distance to save cycles
      const connectionDist = points.length > 80 ? 100 : 160;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            if (isP) {
              ctx.strokeStyle = `hsla(${points[i].hue}, 100%, 50%, ${
                0.8 - dist / connectionDist
              })`;
            } else if (isM) {
              ctx.strokeStyle = `rgba(0, 255, 65, ${
                0.8 - dist / connectionDist
              })`;
            } else {
              // Adjust connection color based on mode
              const colorVal = isDark ? 255 : 0;
              ctx.strokeStyle = `rgba(${colorVal}, ${colorVal}, ${colorVal}, ${
                0.8 - dist / connectionDist
              })`;
            }

            ctx.lineWidth = 0.5;
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationId: number;

    const animate = (time: number) => {
      frameCount.current++;
      if (time - lastFrameTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastFrameTime.current = time;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isM = isMatrixRef.current;
      const isP = isPartyRef.current;
      const isDark = isDarkModeRef.current;
      const isW = isTimeWarpRef.current;
      const isB = isBinaryRef.current;
      const isF = isFrozenRef.current;
      const isT = isTrailsRef.current;
      const isBH = isBlackHoleRef.current; // Fix: Use Ref check inside loope

      // Draw Cursor Light Effect
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx !== null && my !== null) {
        ctx.save();
        const gradient = ctx.createRadialGradient(
          mx,
          my,
          0,
          mx,
          my,
          isBH ? 50 : 400
        ); // Shrink on Black Hole

        if (isM) {
          gradient.addColorStop(0, "rgba(0, 255, 65, 0.15)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else if (isP) {
          const timeHue = (performance.now() / 20) % 360;
          gradient.addColorStop(0, `hsla(${timeHue}, 100%, 50%, 0.15)`);
          gradient.addColorStop(1, "transparent");
        } else if (isDark) {
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.12)");
          gradient.addColorStop(1, "transparent");
        } else {
          // Light Mode Enhancements: Warm Golden/Amber "Sun" effect
          gradient.addColorStop(0, "rgba(255, 170, 0, 0.15)");
          gradient.addColorStop(1, "transparent");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mx, my, 400, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      drawConnections();

      pointsRef.current.forEach((point) => {
        point.update(
          isP,
          isW,
          isF,
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.isDown,
          isTrailsRef.current,
          isBlackHoleRef.current
        );
        point.draw(ctx, isM, isP, isB, isT, isDark);
      });

      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    const handleResize = () => resizeCanvas();
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      lastMouseTime.current = Date.now();

      // Update custom cursor
      setCursorPos({ x: e.clientX, y: e.clientY });

      // 3D Tilt Logic
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setTilt({ x: -y, y: x });
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      setRipples((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);
      setTimeout(() => {
        // Cleanup ripple
        setRipples((prev) => prev.slice(1));
      }, 1000);
    };
    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
      mouseRef.current.isDown = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const links = [
    { href: "https://github.com/iaadi4", label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/aditya-singh-3274101b4/",
      label: "LinkedIn",
    },
    { href: "https://x.com/iaadi8", label: "Twitter" },
    {
      href: "https://drive.google.com/file/d/1NpxFv6u-0WxuK_HD-bzUsEIuEKk8qmwF/view?usp=sharing",
      label: "Resume",
    },
  ];

  return (
    <div
      className={`relative min-h-screen w-full font-['Courier_Prime',Courier,monospace] selection:bg-black selection:text-white overflow-hidden transition-colors duration-700 ${
        isMatrix
          ? "bg-black text-[#00ff41]"
          : isDarkMode
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
          isMatrix ? "opacity-40" : "opacity-60"
        }`}
      />

      {/* Feature 8: Boot Overlay - UI: "Cooler" Matrix Boot Loader */}
      {bootStep === 0 && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono">
          <div className="flex flex-col items-center gap-4 w-64">
            <div className="text-white text-xs tracking-[0.2em] animate-pulse">
              SYSTEM_INITIALIZATION
            </div>
            <div className="w-full h-2 bg-gray-900 border border-gray-800 rounded-sm overflow-hidden relative">
              {/* Glitchy loading bar */}
              <div
                className="h-full bg-white animate-[width_2.4s_steps(10)_forwards]"
                style={{ width: "100%" }}
              ></div>
            </div>
            <div className="text-gray-400 text-[10px] h-4">{statusText}</div>
            <div className="grid grid-cols-5 gap-1 w-full opacity-30 mt-2">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 bg-white ${
                    Math.random() > 0.5 ? "opacity-100" : "opacity-0"
                  } animate-pulse`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className="fixed w-8 h-8 rounded-full border border-current pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:block mix-blend-difference"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: "translate(-50%, -50%)",
          color: isMatrix ? "#00ff41" : isDarkMode ? "white" : "black",
        }}
      />

      {ripples.map((r) => (
        <div
          key={r.id}
          className="fixed rounded-full border border-current pointer-events-none animate-ping z-40"
          style={{
            left: r.x,
            top: r.y,
            width: "50px",
            height: "50px",
            transform: "translate(-50%, -50%)",
            color: isMatrix ? "#00ff41" : isDarkMode ? "white" : "black",
            opacity: 0.5,
          }}
        />
      ))}

      <div className="absolute top-4 right-4 z-50 flex gap-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full border transition-all duration-300 backdrop-blur-sm ${
            isDarkMode
              ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
              : "bg-black/5 text-black border-black/10 hover:bg-black/10"
          }`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? "☀" : "☾"}
        </button>
        <button
          onClick={() => setShowHelp(true)}
          className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-lg transition-all duration-300 backdrop-blur-sm ${
            isDarkMode
              ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
              : "bg-black/5 text-black border-black/10 hover:bg-black/10"
          }`}
          title="System Manual"
        >
          ?
        </button>
      </div>

      <main
        className="relative z-10 min-h-screen flex items-center justify-center p-6 perspective-[1000px]"
        style={{ perspective: "1000px" }}
      >
        <div
          className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: `rotateX(${tilt.x * 0.5}deg) rotateY(${
              tilt.y * 0.5
            }deg)`,
          }}
        >
          <div className="flex flex-col gap-8 text-left">
            <div className="relative w-max group">
              <Magnetic>
                <svg
                  className={`w-16 h-16 transition-all duration-300 ease-in-out cursor-pointer hover:scale-110 active:scale-95 active:rotate-12 ${
                    isMatrix
                      ? "stroke-[#00ff41]"
                      : isDarkMode
                      ? "stroke-white"
                      : "stroke-black"
                  }`}
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={(e) => {
                    if (Date.now() - lastMouseTime.current < 200) return; // Optimize: Debounce spam clicks
                    lastMouseTime.current = Date.now();

                    setShowLogoHint(false);
                    const rect = e.currentTarget.getBoundingClientRect();
                    spawnParticles(5, rect.left + 32, rect.top + 32); // Optimize: Reduce spawn count
                  }}
                >
                  <circle cx="50" cy="30" r="15" fill="none" strokeWidth="2" />
                  <path
                    d="M 35 30 Q 35 25 40 25 Q 45 25 45 30"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 55 30 Q 55 25 60 25 Q 65 25 65 30"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <line x1="45" y1="35" x2="55" y2="35" strokeWidth="1.5" />
                  <path d="M 50 45 L 50 70" strokeWidth="2" />
                  <path d="M 50 55 L 35 65" strokeWidth="2" />
                  <path d="M 50 55 L 65 65" strokeWidth="2" />
                  <path d="M 50 70 L 35 85" strokeWidth="2" />
                  <path d="M 50 70 L 65 85" strokeWidth="2" />
                  <rect
                    x="30"
                    y="45"
                    width="8"
                    height="12"
                    fill={
                      isMatrix ? "#00ff41" : isDarkMode ? "#ffffff" : "#000"
                    }
                  />
                </svg>
              </Magnetic>

              <div
                className={`
                  absolute left-full top-0 ml-4 px-3 py-2 w-max
                  border rounded-xl text-xs font-bold font-mono
                  transition-all duration-500 ease-out pointer-events-none select-none
                  animate-bounce
                  ${
                    showLogoHint
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }
                  ${
                    isMatrix
                      ? "bg-black border-[#00ff41] text-[#00ff41]"
                      : isDarkMode
                      ? "bg-black border-white text-white"
                      : "bg-white border-black text-black"
                  }
                  
                  /* Arrow pointing to logo */
                  before:content-[''] before:absolute before:top-1/2 before:right-full before:-translate-y-1/2
                  before:border-[6px] before:border-transparent
                  ${
                    isMatrix
                      ? "before:border-r-[#00ff41]"
                      : isDarkMode
                      ? "before:border-r-white"
                      : "before:border-r-black"
                  }
                `}
              >
                &lt; click_me /&gt;
              </div>
            </div>

            <div>
              <h1
                className="text-4xl sm:text-6xl font-bold tracking-tight mb-3 cursor-text hover:text-red-500 transition-colors duration-100"
                style={{
                  textShadow:
                    "2px 2px 0px rgba(0,255,255,0.5), -2px -2px 0px rgba(255,0,0,0.5)",
                }}
                onMouseEnter={scrambleName}
              >
                {nameText}
              </h1>
              <div className="text-sm font-bold opacity-60 flex items-center gap-2">
                {age}
                <span
                  onClick={toggleMatrix}
                  className="font-normal opacity-70 cursor-pointer hover:underline hover:opacity-100 select-none transition-colors"
                  title="Toggle Matrix Mode"
                >
                  years_runtime
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base font-bold">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-amber-500 transition-colors duration-300 border-b-2 border-dotted border-current pb-0.5 ${
                    isMatrix ? "hover:text-white" : ""
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 text-left pt-2">
            <p className="text-lg sm:text-xl leading-relaxed opacity-90">
              Full Stack Developer & DevOps Engineer exploring the frontier of
              Web3. Building scalable systems with modern infrastructure, smart
              contracts, and decentralized architectures.
            </p>

            <div
              className={`border-l-4 pl-6 py-1 relative overflow-hidden group/card ${
                isMatrix
                  ? "border-[#00ff41]"
                  : isDarkMode
                  ? "border-white"
                  : "border-black"
              }`}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${tilt.y * 5 + 50}% ${
                    tilt.x * 5 + 50
                  }%, rgba(255,255,255,0.1), transparent 50%)`,
                }}
              />
              <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">
                Currently Building
              </div>
              <Magnetic>
                <a
                  href="https://draviya.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold hover:opacity-70 transition-opacity inline-block mb-2 border-b-2 border-dotted border-current"
                >
                  draviya.com
                </a>
              </Magnetic>
              <p className="text-sm sm:text-base opacity-70 leading-relaxed">
                A compliance-first regulated platform transforming creators into
                investable businesses using Token Bonding Curves.
              </p>
            </div>
          </div>
        </div>
      </main>

      <div
        className={`fixed bottom-4 left-6 max-w-[80%] sm:max-w-none truncate text-xs font-mono opacity-50 select-none pointer-events-none transition-all duration-300 ${
          isParty ? "animate-pulse text-red-500 font-bold" : ""
        }`}
      >
        <span className="mr-2">⚡</span>
        {statusText}
        <span className="animate-pulse ml-1">_</span>
      </div>

      <div
        className={`hidden md:block fixed bottom-4 right-6 text-sm font-mono select-none font-bold
                    text-amber-500 border border-amber-500/50 bg-amber-500/10 px-4 py-2 rounded
                    animate-pulse cursor-help z-50`}
        title="Open Developer Console (F12)"
      >
        ⚠ OPEN CONSOLE TO SEE SECRETS ⚠
      </div>

      {showDebug && (
        <div className="fixed bottom-4 right-4 md:top-4 md:bottom-auto bg-black/80 text-[#00ff41] p-3 md:p-4 font-mono text-xs rounded border border-[#00ff41] z-50 pointer-events-none">
          <div>FPS: {fps}</div>
          <div>PARTICLES: {particleCount}</div>
          <div>
            MOUSE: {mouseRef.current.x?.toFixed(0) || "N/A"},{" "}
            {mouseRef.current.y?.toFixed(0) || "N/A"}
          </div>
          <div>GRAVITY: {gravityRef.current ? "ON" : "OFF"}</div>
          <div>TRAILS: {isTrailsRef.current ? "ON" : "OFF"}</div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div
            className={`relative max-w-lg w-full p-8 rounded-2xl border shadow-2xl overflow-hidden ${
              isDarkMode
                ? "bg-black/90 border-white/20 text-white"
                : "bg-white/90 border-black/10 text-black"
            }`}
          >
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 text-xl opacity-50 hover:opacity-100"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-amber-500">⚠</span> SYSTEM MANUAL
            </h2>

            <div className="grid grid-cols-2 gap-4 text-sm font-mono mb-6">
              <div className="flex flex-col gap-2">
                <div className="font-bold opacity-50 mb-1">CONTROLS</div>
                <div>
                  <span className="bg-gray-500/20 px-1 rounded">G</span> Toggle
                  Gravity
                </div>
                <div>
                  <span className="bg-gray-500/20 px-1 rounded">F</span> Freeze
                  System
                </div>
                <div>
                  <span className="bg-gray-500/20 px-1 rounded">T</span> Toggle
                  Trails
                </div>
                <div>
                  <span className="bg-gray-500/20 px-1 rounded">E</span>{" "}
                  Explosion / Stabilize
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-bold opacity-50 mb-1">ADVANCED</div>
                <div>
                  <span className="bg-gray-500/20 px-1 rounded">SPACE</span>{" "}
                  Time Warp
                </div>
                <div>
                  <span className="bg-gray-500/20 px-1 rounded">B</span> Binary
                  View
                </div>
                <div>
                  <span className="bg-gray-500/20 px-1 rounded">H</span> Gravity
                  Well (Hold)
                </div>
                <div>
                  <span className="bg-gray-500/20 px-1 rounded">D</span> Debug
                  Stats
                </div>
              </div>
            </div>

            {/* Easter Egg Tracker & Reveal */}
            <div className="border-t border-gray-500/20 pt-4">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold opacity-50 text-xs uppercase">
                  Secret Achievements
                </div>
                <button
                  onClick={() => setRevealSecrets((p) => !p)}
                  className="text-[10px] uppercase font-bold tracking-wider opacity-60 hover:opacity-100 hover:text-amber-500 transition-colors"
                >
                  {revealSecrets ? "Hide Secrets" : "Reveal Secrets"}
                </button>
              </div>

              <div className="space-y-2">
                {/* Secret Item Helper */}
                {[
                  { code: "BOOM", desc: "Press 'E' to trigger explosion" },
                  { code: "VOID", desc: "Hold 'H' for Gravity Well" },
                  { code: "PARTY", desc: "Konami Code: UP UP DOWN DOWN..." },
                  { code: "HACK", desc: "Click 'years_runtime' text" },
                  { code: "GHOST", desc: "Press 'T' for trails" },
                ].map((secret) => {
                  const isUnlocked = unlockedSecrets.includes(secret.code);
                  return (
                    <div
                      key={secret.code}
                      className={`flex items-center gap-3 text-xs ${
                        isUnlocked ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      {" "}
                      {/* UI: Visibility Fix */}
                      <span
                        className={`px-2 py-0.5 rounded border min-w-[60px] text-center font-bold ${
                          isUnlocked
                            ? "bg-white/10 border-white text-white"
                            : "bg-black/10 border-black/20"
                        }`}
                      >
                        [{isUnlocked ? secret.code : "LOCKED"}]
                      </span>
                      <span className="font-mono truncate">
                        {isUnlocked || revealSecrets
                          ? secret.desc
                          : "??? (Access Denied)"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
