// src/lib/a11y.js

export function onEnterOrSpace(handler) {
  return (e) => {
    const key = e?.key;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      handler?.(e);
    }
  };
}

export function ariaDisabledProps(disabled) {
  return disabled
    ? { "aria-disabled": true, tabIndex: -1 }
    : {};
}
