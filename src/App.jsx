import { useState } from "react";

function createBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighbourMines: 0,
    }))
  );
}
function RevealEmptyCells(board,r,c,rows,cols){
  const newBoard = board;

   const directions = [
  [-1,-1], [-1,0], [-1,1],
  [0,-1],          [0,1],
  [1,-1],  [1,0],  [1,1]
];
function dfs(x,y){
  if(x<0||
    y<0||
    x>=rows||
    y >= cols
  ) return;

  const cell = newBoard[x][y];

  if(cell.isRevealed || cell.isMine) return;
  cell.isRevealed = true;
  
  if(cell.neighbourMines >0) return;

  directions.forEach(([dx,dy])=>{
    dfs(x+dx,y+dy);
  });
}
dfs(r,c);

return[...newBoard];
}
function countNeighbours(board,rows,cols){
  const directions = [
  [-1,-1], [-1,0], [-1,1],
  [0,-1],          [0,1],
  [1,-1],  [1,0],  [1,1]
];
  const newBoard = [...board];
  
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){

      if(newBoard[r][c].isMine) continue;

      let mineCount =0;

      directions.forEach(([dx,dy]) =>{
        const nr = r+dx;
        const nc = c+dy;
      

      if(nr >=0 &&
        nr <rows &&
        nc >=0 && nc <cols && newBoard[nr][nc].isMine
      ){
        mineCount++;
      }
    });
    newBoard[r][c].neighbourMines = mineCount;
  }
  }
  return newBoard;
}
function PlaceMines(board, rows, cols, mineCount) {
  const newBoard = [...board];
  let minesPlaced = 0;

  while (minesPlaced < mineCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);

    if (!newBoard[r][c].isMine) {
      newBoard[r][c].isMine = true;
      minesPlaced++;
    }
  
  }

  return newBoard;
}

function Board({ mineCount = 10 }) {
  const rows = 8;
  const cols = 8;

  const [board, setBoard] = useState(() => {
    let newBoard = createBoard(rows, cols);
    newBoard = PlaceMines(newBoard, rows, cols, mineCount);
    newBoard = countNeighbours(newBoard,rows,cols);
    return newBoard ;
  });

  function HandleClicking(r, c) {
    const newBoard = board.map(row =>
      row.map(cell => ({ ...cell }))
    );
    if(newBoard[r][c].neighbourMines===0){
      setBoard(RevealEmptyCells(newBoard,r,c,rows,cols))
    }else{
    newBoard[r][c].isRevealed = true;
    setBoard(newBoard);
  }
}

  return (
    <div className="grid grid-cols-8 gap-1">
      {board.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            onClick={() => HandleClicking(r, c)}
            className={`w-10 h-10 border border-black cursor-pointer
              ${cell.isRevealed ? "bg-gray-400" : "bg-red-200"}`}
          >
            {cell.neighbourMines}          </div>
        ))
      )}
      
    </div>
  );
}

export default Board;