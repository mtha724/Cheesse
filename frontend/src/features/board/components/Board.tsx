import "./board.css";

// Define files and ranks for the chess board (columns and rows)
const files = ["a","b","c","d","e","f","g","h"]; // left -> right
const ranks = ["1","2","3","4","5","6","7","8"]; // bottom -> top

export default function Board() {
    let boardSquares = []; // Array to hold the board square elements

    // Generate the board squares
    for (let j = ranks.length-1; j >= 0; j-- ) {
      for (let i = 0; i < files.length; i++) {
        // Determine if the square is dark or light
        const isLight = (i + j) % 2 === 1;

        if (isLight) {
          boardSquares.push(
            <div className="tile light-tile">{files[i]}{ranks[j]}</div>
          );
        } else {
          boardSquares.push(
            <div className="tile dark-tile">{files[i]}{ranks[j]}</div>
          );
        }
      }
    }

    // Labels for ranks and files
    const rankLabels = ranks.map(rank => (
      <div className="square first-col" key={rank} data-rank={rank}> {rank} </div>
    ));

    const fileLabels = files.map(file => (
      <div className="square last-row" key={file} data-file={file}> {file} </div>
    ));

    <div className="labels">
      {rankLabels}
      {fileLabels}
    </div>

  return (
  <div className="wrapper">
    <div className="board-container">
      
      <div id="chessboard">
        {boardSquares}
      </div>

      <div className="rank-labels">
        {ranks.map((rank, i) => (
          <div key={rank} style={{ gridRow: 8 - i, gridColumn: 1 }}>
            {rank}
          </div>
        ))}
      </div>

      <div className="file-labels">
        {files.map((file, i) => (
          <div key={file} style={{ gridRow: 9, gridColumn: i + 1 }}>
            {file}
          </div>
        ))}
      </div>
      
    </div>
  </div>
  );
}
