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
      className="fixed bottom-5 right-5 z-50 rounded-lg overflow-hidden border border-white/10 shadow-2xl"
      style={{ minWidth: 230 }}
    >
      <div
        className="bg-[#0a0a0a]/90 backdrop-blur-md"
      >
        {/* Always-visible strip */}
        <div
          className="flex items-center gap-4 px-4 py-3 cursor-pointer select-none hover:bg-white/5 transition-colors"
          onClick={() => setExpanded(e => !e)}
        >
          {/* Vinyl */}
          <svg
            width="28" height="28" viewBox="0 0 26 26"
            style={{ transform: `rotate(${angle}deg)`, flexShrink: 0 }}
          >
            <circle cx="13" cy="13" r="12" fill="#111" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <circle cx="13" cy="13" r="9"  fill="#050505" />
            {[7, 9, 11].map(r => (
              <circle key={r} cx="13" cy="13" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            ))}
            <circle cx="13" cy="13" r="3" fill="var(--color-primary)" />
            <circle cx="13" cy="13" r="1.2" fill="#000" />
          </svg>

          <div className="flex-1 min-w-0">
            <div
              className={`text-xs font-semibold leading-tight truncate tracking-wider uppercase ${playing ? "text-primary" : "text-white"}`}
            >
              {loading ? "▶ loading..." : playing ? `▶ ${track.title}` : "♪ lofi player"}
            </div>
            <div className="text-[10px] text-gray-500 leading-tight uppercase tracking-widest mt-0.5">
              {playing ? track.bpm : "click to expand"}
            </div>
          </div>

          <ChevronUp
            size={14}
            className="text-gray-400 flex-shrink-0 transition-transform duration-200"
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
              className="overflow-hidden border-t border-white/10"
            >
              <div className="px-4 py-4">
                {/* Track list */}
                <div className="space-y-1.5 mb-4">
                  {TRACKS.map((t, i) => (
                    <button
                      key={i}
                      onClick={e => { e.stopPropagation(); selectTrack(i); }}
                      className={`w-full text-left px-3 py-2 text-[10px] uppercase tracking-widest font-semibold rounded-md transition-all ${trackIdx === i ? "bg-primary/10 text-primary border border-primary/30" : "text-gray-500 border border-transparent hover:text-white"}`}
                    >
                      {trackIdx === i && playing ? "▶ " : "○ "}{t.title}
                      <span className="ml-1 opacity-50">· {t.bpm}</span>
                    </button>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 mb-4">
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
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${active ? "border-primary text-primary" : "border-white/20 text-gray-400 hover:border-white/50 hover:text-white"} ${loading && i === 0 ? "opacity-50" : "opacity-100"}`}
                    >
                      {loading && i === 0
                        ? <span className="text-[8px] animate-pulse">...</span>
                        : Icon && <Icon size={14} />}
                    </button>
                  ))}

                  <input
                    type="range" min={0} max={1} step={0.05}
                    value={muted ? 0 : volume}
                    onChange={e => { e.stopPropagation(); setVolume(Number(e.target.value)); setMuted(false); }}
                    onClick={e => e.stopPropagation()}
                    className="flex-1 h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                </div>

                {/* Waveform */}
                <div className="flex items-end gap-1 h-6 px-1">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{ background: "var(--color-primary)", opacity: 0.6 }}
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