export default function VideoTrimmer({ file, onDone }) {
  return (
    <div className="trimmer">
      <video src={URL.createObjectURL(file)} controls />

      <p>Trim your clip (5–30s)</p>

      {/* Placeholder trim UI */}
      <input type="range" min="0" max="100" />

      <button onClick={onDone}>Continue</button>
    </div>
  )
}