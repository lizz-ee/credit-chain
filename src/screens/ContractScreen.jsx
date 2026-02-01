export default function ContractScreen({ navigate }) {
  return (
    <Center>
      <h2>📜 Off-World Contract</h2>

      <p>
        This protocol is governed by immutable rules.
        AI may propose. Humans approve.
      </p>

      <button onClick={() => navigate("home")}>
        I Agree
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