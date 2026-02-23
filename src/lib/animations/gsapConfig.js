// ============================================
// FILE: lib/animations/gsapConfig.js
// ============================================
// KEY CHANGE: ScrollTrigger is no longer imported and registered at module level
// 
// BEFORE: This file was imported by HeroSection and others, causing ScrollTrigger
// (~30KB) to be parsed and executed BEFORE the hero image could render.
// ScrollTrigger attaches scroll listeners, measures DOM elements, etc — all
// unnecessary work that blocks the main thread during initial load.
//
// AFTER: Only core gsap is exported. Components that need ScrollTrigger
// import and register it themselves (lazily).

'use client';

import gsap from 'gsap';

// ✅ Global config — lightweight, no plugin registration
gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

gsap.defaults({
  ease: 'power2.out',
  duration: 0.6,
});

export { gsap };

// ✅ Lazy ScrollTrigger loader — only call this when you actually need ScrollTrigger
// Usage: const { ScrollTrigger } = await loadScrollTrigger();
export async function loadScrollTrigger() {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}