// src/lib/clipboard.js

export async function copyToClipboard(text) {
  const val = String(text ?? "");
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(val);
      return true;
    }
  } catch (_) {}

  // Fallback
  try {
    const ta = document.createElement("textarea");
    ta.value = val;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return Boolean(ok);
  } catch (_) {
    return false;
  }
}
