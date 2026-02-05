
import { useState } from 'react';
import './feedHeader.css';

export default function FeedHeader({ onSearch }) {
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState('');

  return (
    <div className="feed-header">
      <div className="left">New Memes</div>
      <div className="right">
        <button className="icon" onClick={()=>setOpen(!open)}>🔍</button>
      </div>
      {open && (
        <input
          className="search"
          placeholder="Search ticker or address"
          value={q}
          onChange={e=>{setQ(e.target.value); onSearch(e.target.value);}}
        />
      )}
    </div>
  );
}
