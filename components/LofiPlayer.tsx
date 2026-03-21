"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, SkipForward, ChevronUp } from "lucide-react";

const TRACKS = [
  { title: "Jungle Lofi",  bpm: "78 BPM", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3" },
  { title: "Night Garden", bpm: "75 BPM", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3" },
  { title: "Moss & Code",  bpm: "82 BPM", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Algorithms.mp3" },
];

export default function LofiPlayer() {
  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [volume,   setVolume]   = useState(0.4);
  const [angle,    setAngle]    = useState(0);
  const [loading,  setLoading]  = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef   = useRef<number>(0);

  // Pre-create audio element on mount so it's ready immediately
  useEffect(() => {
    const a = new Audio();
    a.preload = "auto";
    a.volume = volume;
    a.loop   = true;
    a.src    = TRACKS[0].url; // Pre-warm the initially selected track immediately
    audioRef.current = a;
    return () => { a.pause(); a.src = ""; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Spin vinyl
  useEffect(() => {
    if (playing) {
      const spin = () => { setAngle(a => (a + 0.4) % 360); rafRef.current = requestAnimationFrame(spin); };
      rafRef.current = requestAnimationFrame(spin);
    } else cancelAnimationFrame(rafRef.current);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const loadAndPlay = useCallback(async (idx: number) => {
    const a = audioRef.current;
    if (!a) return;
    setLoading(true);
    a.src = TRACKS[idx].url;
    try {
      await a.play();
      setPlaying(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const togglePlay = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      // First play: if src is missing or effectively empty
      if (!a.src || a.src === window.location.href) {
        await loadAndPlay(trackIdx);
      } else {
        try { 
          await a.play(); 
          setPlaying(true); 
        } catch (err) {
          console.error("Play error, trying reload:", err);
          await loadAndPlay(trackIdx);
        }
      }
    }
  }, [playing, trackIdx, loadAndPlay]);

  const nextTrack = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setPlaying(false);
    
    const next = (trackIdx + 1) % TRACKS.length;
    setTrackIdx(next);
    
    // If was playing, auto-play next track
    if (playing) {
      setTimeout(() => loadAndPlay(next), 50);
    } else {
      // Pre-warm the next track if not playing
      a.src = TRACKS[next].url;
    }
  }, [trackIdx, playing, loadAndPlay]);

  const selectTrack = useCallback(async (i: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setPlaying(false);
    setTrackIdx(i);
    setTimeout(() => loadAndPlay(i), 50);
  }, [loadAndPlay]);

  const track = TRACKS[trackIdx];

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-5 right-5 z-50"
      style={{ minWidth: 210 }}
    >
      <div
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        {/* Always-visible strip */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 cursor-pointer select-none"
          onClick={() => setExpanded(e => !e)}
        >
          {/* Vinyl */}
          <svg
            width="26" height="26" viewBox="0 0 26 26"
            style={{ transform: `rotate(${angle}deg)`, flexShrink: 0 }}
          >
            <circle cx="13" cy="13" r="12" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
            <circle cx="13" cy="13" r="9"  fill="hsl(var(--card))" />
            {[7, 9, 11].map(r => (
              <circle key={r} cx="13" cy="13" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
            ))}
            <circle cx="13" cy="13" r="3" fill="hsl(var(--primary))" />
            <circle cx="13" cy="13" r="1.2" fill="hsl(var(--card))" />
          </svg>

          <div className="flex-1 min-w-0">
            <div
              className="text-[11px] font-semibold leading-tight truncate"
              style={{
                fontFamily: "monospace",
                color: playing ? "hsl(var(--primary))" : "hsl(var(--foreground))",
              }}
            >
              {loading ? "▶ loading..." : playing ? `▶ ${track.title}` : "♪ lofi player"}
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight" style={{ fontFamily: "monospace" }}>
              {playing ? track.bpm : "click to expand"}
            </div>
          </div>

          <ChevronUp
            size={13}
            className="text-muted-foreground flex-shrink-0 transition-transform duration-200"
            style={{ transform: expanded ? "rotate(0deg)" : "rotate(180deg)" }}
          />
        </div>

        {/* Expanded panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
              style={{ borderTop: "1px solid hsl(var(--border))" }}
            >
              <div className="px-3 pt-3 pb-3">
                {/* Track list */}
                <div className="space-y-1 mb-3">
                  {TRACKS.map((t, i) => (
                    <button
                      key={i}
                      onClick={e => { e.stopPropagation(); selectTrack(i); }}
                      className="w-full text-left px-2 py-1.5 text-[10px] transition-colors"
                      style={{
                        fontFamily: "monospace",
                        background:   trackIdx === i ? "hsl(var(--primary) / 0.12)" : "transparent",
                        color:        trackIdx === i ? "hsl(var(--primary))"         : "hsl(var(--muted-foreground))",
                        border:       trackIdx === i ? "1px solid hsl(var(--primary) / 0.25)" : "1px solid transparent",
                      }}
                    >
                      {trackIdx === i && playing ? "▶ " : "○ "}{t.title}
                      <span className="ml-1 opacity-50">· {t.bpm}</span>
                    </button>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 mb-3">
                  {[
                    {
                      onClick: (e: React.MouseEvent) => { e.stopPropagation(); togglePlay(); },
                      active: playing,
                      Icon: loading ? null : playing ? Pause : Play,
                    },
                    {
                      onClick: (e: React.MouseEvent) => { e.stopPropagation(); nextTrack(); },
                      active: false,
                      Icon: SkipForward,
                    },
                    {
                      onClick: (e: React.MouseEvent) => { e.stopPropagation(); setMuted(m => !m); },
                      active: false,
                      Icon: muted ? VolumeX : Volume2,
                    },
                  ].map(({ onClick, active, Icon }, i) => (
                    <button
                      key={i}
                      onClick={onClick}
                      disabled={loading && i === 0}
                      className="w-8 h-8 flex items-center justify-center transition-colors hover:text-foreground"
                      style={{
                        border: "1px solid hsl(var(--border))",
                        color: active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                        opacity: loading && i === 0 ? 0.5 : 1,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = "hsl(var(--primary))")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "hsl(var(--border))")}
                    >
                      {loading && i === 0
                        ? <span className="text-[8px]" style={{ fontFamily: "monospace" }}>...</span>
                        : Icon && <Icon size={13} />}
                    </button>
                  ))}

                  <input
                    type="range" min={0} max={1} step={0.05}
                    value={muted ? 0 : volume}
                    onChange={e => { e.stopPropagation(); setVolume(Number(e.target.value)); setMuted(false); }}
                    onClick={e => e.stopPropagation()}
                    className="flex-1 h-1"
                    style={{ accentColor: "hsl(var(--primary))" }}
                  />
                </div>

                {/* Waveform */}
                <div className="flex items-end gap-0.5 h-5">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1"
                      style={{ background: "hsl(var(--primary))", opacity: 0.5 }}
                      animate={
                        playing
                          ? { height: [`${15 + Math.sin(i * 0.9) * 55}%`, `${55 + Math.sin(i * 1.3 + 1) * 35}%`, `${15 + Math.sin(i * 0.9) * 55}%`] }
                          : { height: "15%" }
                      }
                      transition={{ duration: 0.75 + (i % 4) * 0.18, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}