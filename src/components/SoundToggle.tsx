"use client";

import { useEffect, useRef, useState } from "react";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

const KEY = "sanish-sound"; // "off" once a visitor has switched the sound off
const readOff = () => { try { return localStorage.getItem(KEY) === "off"; } catch { return false; } };
const saveChoice = (off: boolean) => { try { localStorage.setItem(KEY, off ? "off" : "on"); } catch { /* private mode: choice just isn't remembered */ } };

/**
 * Site-wide background sound + floating "Sound On / Sound Off" button, all controlled from
 * CMS > Site Settings > Sound. Browsers block audio until the visitor interacts, so playback
 * starts on their first click / tap / key press (unless they previously chose Off).
 */
export default function SoundToggle() {
  const { sound } = useSiteSettings();
  const enabled = !!sound?.enabled && !!sound?.url;
  const showButton = sound?.show_button !== false;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false); // real playback state (browsers keep audio blocked until the first tap)

  useEffect(() => {
    if (!enabled || !sound) return;
    const a = new Audio(sound.url);
    a.loop = true;
    a.volume = Math.min(1, Math.max(0, (sound.volume ?? 35) / 100));
    audioRef.current = a;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    const wantOn = !showButton || !readOff(); // with the button hidden there is no way to say Off

    const events = ["pointerdown", "keydown", "touchend"] as const;
    const stop = () => events.forEach((ev) => window.removeEventListener(ev, start, true));
    function start(e: Event) {
      if ((e.target as HTMLElement | null)?.closest?.("[data-sound-toggle]")) return; // the button handles itself
      if (!wantOn) { stop(); return; }
      a.play().then(stop).catch(() => { /* still blocked: try again on the next gesture */ });
    }
    events.forEach((ev) => window.addEventListener(ev, start, true));
    return () => { stop(); a.removeEventListener("play", onPlay); a.removeEventListener("pause", onPause); a.pause(); audioRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, sound?.url, sound?.volume, showButton]);

  const flip = () => {
    const a = audioRef.current;
    if (!a) return;
    if (!a.paused) { a.pause(); saveChoice(true); }
    else { a.play().then(() => saveChoice(false)).catch(() => { /* still blocked */ }); }
  };
  const flipRef = useRef(flip);
  flipRef.current = flip;

  // Share the state with the phone/tablet contact menu (WhatsAppButton), which hosts the sound switch there
  useEffect(() => {
    const w = window as unknown as { __sanishSound?: { available: boolean; playing: boolean } };
    w.__sanishSound = { available: enabled && showButton, playing };
    window.dispatchEvent(new Event("sanish-sound-state"));
  }, [enabled, showButton, playing]);
  useEffect(() => {
    const onToggle = () => flipRef.current();
    window.addEventListener("sanish-sound-toggle", onToggle);
    return () => window.removeEventListener("sanish-sound-toggle", onToggle);
  }, []);

  if (!enabled || !showButton || !sound) return null;

  const size = Math.min(72, Math.max(28, sound.size || 40));
  const right = sound.position === "right";

  return (
    <button
      type="button"
      data-sound-toggle
      onClick={flip}
      aria-pressed={playing}
      aria-label={playing ? "Turn website sound off" : "Turn website sound on"}
      className="snd-btn fixed z-[890] inline-flex items-center text-white backdrop-blur-md transition-opacity hover:opacity-90"
      style={{
        height: size,
        gap: Math.round(size * 0.22),
        padding: `0 ${Math.round(size * 0.45)}px`,
        borderRadius: 999,
        background: "rgba(30,30,46,0.88)",
        border: "1px solid rgba(255,255,255,0.18)",
        fontSize: Math.round(size * 0.32),
        fontWeight: 500,
        letterSpacing: "0.01em",
        bottom: right ? 112 : 92, // left: sits above the hero's slide dots / counter bar instead of covering them
        [right ? "right" : "left"]: 24,
      }}
    >
      <style>{"@keyframes snd-bar{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}} @media (max-width:1023px){.snd-btn{display:none!important}}"}</style>
      <span aria-hidden="true" className="inline-flex items-end" style={{ height: Math.round(size * 0.4), gap: Math.max(2, Math.round(size * 0.06)) }}>
        {[0, 0.25, 0.5].map((d) => (
          <span key={d} style={{
            width: Math.max(2, Math.round(size * 0.07)), height: "100%", background: "currentColor", borderRadius: 2,
            transformOrigin: "bottom", transform: playing ? undefined : "scaleY(.3)",
            animation: playing ? `snd-bar 1s ease-in-out ${d}s infinite` : "none",
          }} />
        ))}
      </span>
      <span className="snd-label">{playing ? "Sound On" : "Sound Off"}</span>
    </button>
  );
}
