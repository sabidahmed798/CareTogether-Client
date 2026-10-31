/**
 * Runs synchronously while the HTML is parsed, before the first paint, so the
 * saved theme is applied without a flash of the wrong theme.
 * Kept in a non-client module so it can be inlined from the root layout.
 *
 * @see https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
 */
export const themeInitScript = `(function(){try{
var KEY="caretogether-theme";
var stored=localStorage.getItem(KEY);
var theme=stored==="dark"||stored==="light"
  ? stored
  : (window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
var root=document.documentElement;
root.classList.toggle("dark",theme==="dark");
root.style.colorScheme=theme;
}catch(e){}})();`;
