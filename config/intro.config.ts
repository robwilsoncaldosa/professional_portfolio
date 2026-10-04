/**
 * Optional: path to an audio file in /public (e.g. "/intro.mp3") that you
 * have the rights to use. When set it plays instead of the synthesized
 * sting. Leave null to keep the original synth sound.
 */
export const INTRO_AUDIO_SRC: string | null = null;

export const INTRO_STORAGE_KEY = "portfolio-intro-seen-v1";

/**
 * Runs in <head> before first paint. Marks <html> with `data-intro`:
 *  - "skip"   → returning in the same session, reduced motion, or `?skipintro`
 *               (`?intro` forces a replay even if it was already seen)
 *  - "active" → the intro will play (hero entrance and scrolling wait for it)
 * IntroOverlay flips it to "done" when it finishes.
 */
export const INTRO_INIT_SCRIPT = `(function(){try{var d=document.documentElement;var q=location.search;var force=/[?&]intro(=|&|$)/.test(q);var skip=window.matchMedia('(prefers-reduced-motion: reduce)').matches||q.indexOf('skipintro')>-1||(!force&&sessionStorage.getItem(${JSON.stringify(
  INTRO_STORAGE_KEY
)})==='1');d.dataset.intro=skip?'skip':'active';}catch(e){document.documentElement.dataset.intro='skip';}})();`;
