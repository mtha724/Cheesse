// THIS IS AN AWFUL BOARD IMPLEMENTATION. 
// MADE IN 30 seconds with CHATGPT
// REMOVE ENTIRELY FOR NEW BOARD COMPONENT
// only for isslustration purposes.

import "./board.css";

const files = ["a","b","c","d","e","f","g","h"];
const ranks = [8,7,6,5,4,3,2,1]; // top -> bottom

export default function Board() {
  return (
    <div className="board-wrapper">
      <div className="board">
        {ranks.map((rank, rIdx) =>
          files.map((file, fIdx) => {
            const isDark = (rIdx + fIdx) % 2 === 1;
            return (
              <div
                key={`${file}${rank}`}
                className={`square ${isDark ? "dark" : "light"} ${
                  fIdx === 0 ? "first-col" : ""
                } ${rIdx === ranks.length - 1 ? "last-row" : ""}`}
                data-rank={rank}
                data-file={file}
                aria-label={`square ${file}${rank}`}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
