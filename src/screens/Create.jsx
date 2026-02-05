import "./create.css";

export default function Create() {
  return (
    <div className="screen create-screen">
      <h1 className="create-title">Create Memecoin</h1>

      <div className="create-actions">
        <button className="create-btn primary">
          Upload Video
        </button>

        <button className="create-btn">
          Record Video
        </button>
      </div>

      <div className="create-rules">
        <Rule text="Video only — no images" />
        <Rule text="3–15 seconds" />
        <Rule text="Free launch" />
        <Rule text="1 launch every 5 minutes" />
        <Rule text="Creator cannot buy for 30 seconds" />
      </div>
    </div>
  );
}

function Rule({ text }) {
  return <div className="rule">• {text}</div>;
}

