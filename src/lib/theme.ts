export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "portfolio-theme";

export const DEFAULT_THEME: Theme = "dark";

const THEME_CHANGE_EVENT = "portfolio:theme-change";

/**
 * Runs synchronously in <head> before the first paint, so the stored (or
 * system) theme is applied without a flash of the wrong colors.
 */
export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}",s=localStorage.getItem(k),light=window.matchMedia("(prefers-color-scheme: light)").matches,t=s==="light"||s==="dark"?s:(light?"light":"dark"),r=document.documentElement;r.setAttribute("data-theme",t);r.style.colorScheme=t}catch(e){}})();`;

export function getThemeSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function getDefaultTheme(): Theme {
  return DEFAULT_THEME;
}

export function subscribeToTheme(onStoreChange: () => void): () => void {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function setTheme(theme: Theme): void {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private browsing or blocked storage: the theme still applies for this visit.
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}
