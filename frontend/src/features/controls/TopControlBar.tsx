import './TopControlBar.css'

export default function TopControlBar() {
  return (
    <>
      <div className="top-control-bar">
        <button>Restart</button>
        <button>Undo</button>
        <button>Redo</button>
      </div>
      <p>Note: buttons don't work</p>
    </>
  );
}
