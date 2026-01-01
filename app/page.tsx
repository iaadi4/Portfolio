"use client";

import React, { useEffect, useRef, useState } from 'react';

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
    
    const speed = startX ? 2 : 0.5; 
    this.vx = (Math.random() - 0.5) * speed;
    this.vy = (Math.random() - 0.5) * speed;
    
    this.hue = Math.random() * 360;
    this.binaryChar = Math.random() > 0.5 ? '1' : '0';
  }

  update(
    partyMode: boolean, 
    timeWarp: boolean,
    isFrozen: boolean, 
    mouseX: number | null, 
    mouseY: number | null, 
    isMouseDown: boolean,
    enableTrails: boolean
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
    } 

    if (timeWarp) {
      this.x -= this.vx * speedMult * 3;
      this.y -= this.vy * speedMult * 3;
    } else {
      this.x += this.vx * speedMult;
      this.y += this.vy * speedMult;
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

  draw(ctx: CanvasRenderingContext2D, isMatrix: boolean, isParty: boolean, isBinary: boolean, isTrails: boolean) {
    let color = '';
    if (isParty) {
      color = `hsl(${this.hue}, 100%, 50%)`;
      this.hue += 2; 
    } else {
      color = isMatrix ? '#00ff41' : '#000000';
    }
    
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

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
      ctx.font = '14px Courier New';
      ctx.fillText(this.binaryChar, this.x, this.y);
      if (Math.random() < 0.05) this.binaryChar = this.binaryChar === '1' ? '0' : '1';
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, isParty ? 3 : 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

const Portfolio = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [age, setAge] = useState('');
  
  const [isMatrix, setIsMatrix] = useState(false);
  const [isParty, setIsParty] = useState(false);
  const [showDebug, setShowDebug] = useState(false); 
  const [statusText, setStatusText] = useState("> system_ready");
  
  const [showLogoHint, setShowLogoHint] = useState(false);

  const [fps, setFps] = useState(0);
  const [particleCount, setParticleCount] = useState(45);
  
  const mouseRef = useRef({ x: null as number | null, y: null as number | null, isDown: false });
  const gravityRef = useRef(false);
  const pointsRef = useRef<Point[]>([]); 
  const isMatrixRef = useRef(false);
  const isPartyRef = useRef(false);
  const isTimeWarpRef = useRef(false); 
  const isBinaryRef = useRef(false);   
  const isFrozenRef = useRef(false);   
  const isTrailsRef = useRef(false);
  const lastFrameTime = useRef(performance.now());
  const frameCount = useRef(0);

  const spawnParticles = (count: number, x: number, y: number) => {
    if (!canvasRef.current) return;
    for (let i = 0; i < count; i++) {
      pointsRef.current.push(new Point(
        canvasRef.current.width, 
        canvasRef.current.height, 
        gravityRef,
        x,
        y
      ));
    }
    if (pointsRef.current.length > 200) {
      pointsRef.current = pointsRef.current.slice(pointsRef.current.length - 200);
    }
    setParticleCount(pointsRef.current.length);
  };

  const toggleMatrix = () => {
    setIsMatrix(prev => !prev);
    isMatrixRef.current = !isMatrixRef.current;
    setStatusText(isMatrixRef.current ? "> matrix_loaded" : "> system_restored");
  };

  // Timer to show the "Click Me" bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoHint(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateAge = () => {
      const birthDate = new Date('2004-10-08');
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
    const styleTitle = "font-family: monospace; font-size: 16px; font-weight: bold; color: #000; background: #eee; padding: 5px; border-left: 4px solid #000;";
    console.clear();
    console.log("%c // SYSTEM ACCESS GRANTED // ", styleTitle);
    console.log(`
       ════════════════════════════════════════════
                 INTERACTIVE COMMANDS              
       ════════════════════════════════════════════
      
      Press Keys to Control the Animation:
      
      [G] - Toggle Gravity ON/OFF
      [F] - Freeze/Unfreeze the Animation
      [T] - Toggle Particle Trails (Ghost Mode)
      [E] - EXPLOSION! (Launch all particles outward)
      [D] - Show/Hide Debug Information Overlay
      [B] - Binary Mode (Hold to display 1s and 0s)
      [SPACE] - Time Warp Mode (Hold to reverse direction)
      
       ════════════════════════════════════════════
                HIDDEN EASTER EGGS                 
       ════════════════════════════════════════════

      1. Konami Code: Press UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A
      2. Click on the "years_runtime" text
      3. Click the Logo to Spawn New Particles
      4. Click & Drag with Mouse to Push Particles Away
    `);
  }, []);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      
      if (k === 'g') {
        gravityRef.current = !gravityRef.current;
        setStatusText(gravityRef.current ? "> gravity: ON" : "> gravity: OFF");
      }
      if (k === 'f') {
        isFrozenRef.current = !isFrozenRef.current;
        setStatusText(isFrozenRef.current ? "> system_frozen" : "> system_resumed");
      }
      if (k === 't') {
        isTrailsRef.current = !isTrailsRef.current;
        setStatusText(isTrailsRef.current ? "> trails: ON" : "> trails: OFF");
      }
      if (k === 'd') {
        setShowDebug(prev => !prev);
      }
      
      if (k === 'e') { 
        setStatusText("> BOOM !");
        pointsRef.current.forEach(p => {
           p.vx = (Math.random() - 0.5) * 50; 
           p.vy = (Math.random() - 0.5) * 50;
        });
      }

      if (e.code === 'Space') {
        isTimeWarpRef.current = true;
        setStatusText("> time_warp: ACTIVE");
      }
      if (k === 'b') {
        isBinaryRef.current = true;
      }

      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          isPartyRef.current = !isPartyRef.current;
          setIsParty(isPartyRef.current);
          setStatusText(isPartyRef.current ? "> PARTY_MODE !!!" : "> party_over");
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isTimeWarpRef.current = false;
        setStatusText("> time_warp: OFF");
      }
      if (e.key.toLowerCase() === 'b') {
        isBinaryRef.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
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
      if (!txt.includes("ON") && !txt.includes("OFF") && !txt.includes("!") && !txt.includes("ACTIVE") && !txt.includes("frozen")) {
        setStatusText(hints[i]);
        i = (i + 1) % hints.length;
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [statusText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (pointsRef.current.length === 0) {
        spawnParticles(45, 0, 0);
      } else {
        pointsRef.current.forEach(p => {
          p.canvasWidth = canvas.width;
          p.canvasHeight = canvas.height;
        });
      }
    };
    resizeCanvas();

    const drawConnections = () => {
      const isM = isMatrixRef.current;
      const isP = isPartyRef.current;
      const points = pointsRef.current;
      const connectionDist = 160;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            if (isP) {
               ctx.strokeStyle = `hsla(${points[i].hue}, 100%, 50%, ${0.8 - dist / connectionDist})`;
            } else if (isM) {
               ctx.strokeStyle = `rgba(0, 255, 65, ${0.8 - dist / connectionDist})`;
            } else {
               ctx.strokeStyle = `rgba(0, 0, 0, ${0.8 - dist / connectionDist})`;
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
      const isW = isTimeWarpRef.current;
      const isB = isBinaryRef.current;
      const isF = isFrozenRef.current;
      const isT = isTrailsRef.current;
      
      drawConnections();
      
      pointsRef.current.forEach(point => {
        point.update(isP, isW, isF, mouseRef.current.x, mouseRef.current.y, mouseRef.current.isDown, isT);
        point.draw(ctx, isM, isP, isB, isT);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    const handleResize = () => resizeCanvas();
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseDown = () => { mouseRef.current.isDown = true; };
    const handleMouseUp = () => { mouseRef.current.isDown = false; };
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
      mouseRef.current.isDown = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const links = [
    { href: 'https://github.com/iaadi4', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/aditya-singh-3274101b4/', label: 'LinkedIn' },
    { href: 'https://x.com/iaadi8', label: 'Twitter' },
    { href: 'https://drive.google.com/file/d/1v74jr7welGTFPPtJICAfzkeb9Kz71HGG/view?usp=sharing', label: 'Resume' },
  ];

  return (
    <div className={`relative min-h-screen w-full font-['Courier_Prime',Courier,monospace] selection:bg-black selection:text-white overflow-hidden transition-colors duration-700 ${isMatrix ? 'bg-black text-[#00ff41]' : 'bg-white text-black'}`}>
      
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${isMatrix ? 'opacity-40' : 'opacity-60'}`}
      />

      <main className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <div className="flex flex-col gap-8 text-left">
            <div className="relative w-max group">
              <svg
                className={`w-16 h-16 transition-all duration-300 ease-in-out cursor-pointer hover:scale-110 active:scale-95 active:rotate-12 ${isMatrix ? 'stroke-[#00ff41]' : 'stroke-black'}`}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(e) => {
                  setShowLogoHint(false);
                  const rect = e.currentTarget.getBoundingClientRect();
                  spawnParticles(10, rect.left + 32, rect.top + 32);
                }}
              >
                <circle cx="50" cy="30" r="15" fill="none" strokeWidth="2" />
                <path d="M 35 30 Q 35 25 40 25 Q 45 25 45 30" fill="none" strokeWidth="1.5" />
                <path d="M 55 30 Q 55 25 60 25 Q 65 25 65 30" fill="none" strokeWidth="1.5" />
                <line x1="45" y1="35" x2="55" y2="35" strokeWidth="1.5" />
                <path d="M 50 45 L 50 70" strokeWidth="2" />
                <path d="M 50 55 L 35 65" strokeWidth="2" />
                <path d="M 50 55 L 65 65" strokeWidth="2" />
                <path d="M 50 70 L 35 85" strokeWidth="2" />
                <path d="M 50 70 L 65 85" strokeWidth="2" />
                <rect x="30" y="45" width="8" height="12" fill={isMatrix ? '#00ff41' : '#000'} />
              </svg>

              <div 
                className={`
                  absolute left-full top-0 ml-4 px-3 py-2 w-max
                  border rounded-xl text-xs font-bold font-mono
                  transition-all duration-500 ease-out pointer-events-none select-none
                  animate-bounce
                  ${showLogoHint ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                  ${isMatrix ? 'bg-black border-[#00ff41] text-[#00ff41]' : 'bg-white border-black text-black'}
                  
                  /* Arrow pointing to logo */
                  before:content-[''] before:absolute before:top-1/2 before:right-full before:-translate-y-1/2
                  before:border-[6px] before:border-transparent
                  ${isMatrix ? 'before:border-r-[#00ff41]' : 'before:border-r-black'}
                `}
              >
                &lt; click_me /&gt;
              </div>
            </div>

            <div>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-3">
                Aditya Singh
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
                  className={`hover:underline decoration-2 underline-offset-4 ${isMatrix ? 'hover:text-white' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 text-left pt-2">
            <p className="text-lg sm:text-xl leading-relaxed opacity-90">
              Full Stack Developer & DevOps Engineer exploring the frontier of Web3. 
              Building scalable systems with modern infrastructure, smart contracts, 
              and decentralized architectures.
            </p>

            <div className={`border-l-4 pl-6 py-1 ${isMatrix ? 'border-[#00ff41]' : 'border-black'}`}>
              <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">
                Currently Building
              </div>
              <a
                href="https://draviya.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold hover:opacity-70 transition-opacity block mb-2"
              >
                draviya.com
              </a>
              <p className="text-sm sm:text-base opacity-70 leading-relaxed">
                A compliance-first regulated platform transforming creators into investable businesses using Token Bonding Curves.
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className={`fixed bottom-4 left-6 max-w-[80%] sm:max-w-none truncate text-xs font-mono opacity-50 select-none pointer-events-none transition-all duration-300 ${isParty ? 'animate-pulse text-red-500 font-bold' : ''}`}>
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
        <div className="fixed top-4 right-4 bg-black/80 text-[#00ff41] p-4 font-mono text-xs rounded border border-[#00ff41] z-50 pointer-events-none">
          <div>FPS: {fps}</div>
          <div>PARTICLES: {particleCount}</div>
          <div>MOUSE: {mouseRef.current.x?.toFixed(0) || 'N/A'}, {mouseRef.current.y?.toFixed(0) || 'N/A'}</div>
          <div>GRAVITY: {gravityRef.current ? 'ON' : 'OFF'}</div>
          <div>TRAILS: {isTrailsRef.current ? 'ON' : 'OFF'}</div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;