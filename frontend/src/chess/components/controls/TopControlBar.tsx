/* This is the top control bar component */
// ---------------- Imports ---------------- //
import './TopControlBar.css'

/**
 * TopControlBar component - Displays the top control bar.
 * @returns {JSX.Element} - The rendered component.
 */
export default function TopControlBar() {
  return (
    <>
      <div className="top-control-bar">
        <button>Restart</button>
        <button>Undo</button>
        <button>Redo</button>
      </div>
    </>
  );
}
