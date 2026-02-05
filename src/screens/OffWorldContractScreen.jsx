import React, { useRef, useState } from 'react';
import useGovernance from '../hooks/useGovernance';

export default function OffWorldContractScreen({ onBack }) {
  const { acknowledgeContract } = useGovernance();
  const contentRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  const onScroll = () => {
    const el = contentRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
      setReady(true);
    }
  };

  const confirm = () => {
    acknowledgeContract();
    setDone(true);
    setTimeout(onBack, 1200);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: 16, textAlign: 'center' }}>
        <h2>Off-World Contract</h2>
        <p style={{ opacity: 0.6 }}>Immutable. Unchangeable.</p>
      </header>

      <div
        ref={contentRef}
        onScroll={onScroll}
        style={{ flex: 1, overflowY: 'auto', padding: 20 }}
      >
        <h3>Immutable Guarantees</h3>
        <p>User funds can never be seized.</p>
        <p>AI has no access to funds.</p>
        <p>Governance cannot override this contract.</p>
        <p>Usernames are permanent.</p>
        <p>Exit is always available.</p>
        <p style={{ marginTop: 40 }}>
          This contract exists beyond any system.
        </p>
      </div>

      <div style={{ padding: 16 }}>
        <button
          disabled={!ready || done}
          onClick={confirm}
          style={{
            width: '100%',
            padding: 16,
            fontSize: 16,
            background: done ? '#10b981' : '#2563eb',
            color: '#fff',
            borderRadius: 12,
            opacity: ready ? 1 : 0.4
          }}
        >
          {done ? 'Acknowledged ✓' : 'Acknowledge Contract'}
        </button>
      </div>
    </div>
  );
}