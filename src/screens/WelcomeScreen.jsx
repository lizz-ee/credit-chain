export default function WelcomeScreen({ session, navigate }) {
  return (
    <Center>
      <h1>🚀 Credit-Chain</h1>

      <p>
        Mode: <b>{session.isTelegram ? "Telegram" : "Browser (Dev)"}</b>
      </p>

      <p>User: @{session.username}</p>

      {session.inviteCode && (
        <p style={{ color: "#6ee7b7" }}>
          Invited via code: <b>{session.inviteCode}</b>
        </p>
      )}

      <button onClick={() => navigate("contract")}>
        Continue
      </button>
    </Center>
  );
}

function Center({ children }) {
  return (
    <div style={styles.center}>
      {children}
    </div>
  );
}

const styles = {
  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    fontFamily: "system-ui",
  },
};



