/**
 * Section entrance staging.
 *
 * The gate has to exist before the first paint, otherwise staged content shows
 * in its final state and then jumps back to animate. It is only ever set by
 * script, so a no-JS visit renders every section in full, and it clears itself
 * if the app never takes over.
 */
export const revealInitScript = `(function(){try{var d=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.setAttribute("data-reveal","pending");setTimeout(function(){if(d.getAttribute("data-reveal")==="pending")d.removeAttribute("data-reveal")},3000)}catch(e){}})();`;
