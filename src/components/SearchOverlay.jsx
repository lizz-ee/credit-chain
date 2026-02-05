import React, { useState } from 'react';

export default function SearchOverlay({ onClose, onSearch }) {
  const [q, setQ] = useState('');
  return (
    <div className="search-overlay">
      <input
        autoFocus
        placeholder="Search ticker or address"
        value={q}
        onChange={e => setQ(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSearch(q)}
      />
      <button onClick={() => onSearch(q)}>Search</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
