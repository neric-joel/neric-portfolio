/* Smooth scrolling is driven by the rendering timeline, which is suspended in
   hidden documents (background tabs, embedded previews) — a smooth scroll
   there never moves. Fall back to an instant jump in those contexts and for
   users who prefer reduced motion. */
export const scrollToId = (id) => {
    const behavior =
        document.visibilityState === 'visible' &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'smooth'
            : 'instant';

    if (id === 'hero') window.scrollTo({ top: 0, behavior });
    else document.getElementById(id)?.scrollIntoView({ behavior });
};
