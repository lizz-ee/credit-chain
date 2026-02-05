import { useState } from "react";
import "./feedheader.css";

export default function FeedHeader({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(q);
  };

  return (
    <div className="feed-header">
      {!open && (
        <>
          <div className="wordmark">CREDIT-CHAIN</div>
          <button
            className="icon-btn"
            aria-label="Search"
            onClick={() => setOpen(true)}
          >
            🔍
          </button>
        </>
      )}

      {open && (
        <form className="search-bar" onSubmit={submit}>
          <input
            autoFocus
            placeholder="Search ticker or address"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            type="button"
            className="icon-btn"
            onClick={() => {
              setOpen(false);
              setQ("");
            }}
          >
            ✕
          </button>
        </form>
      )}
    </div>
  );
}