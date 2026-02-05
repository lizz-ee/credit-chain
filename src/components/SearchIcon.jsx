import React from 'react';

export default function SearchIcon({ onClick }) {
  return (
    <button className="search-icon" onClick={onClick} aria-label="Search">
      🔍
    </button>
  );
}
