import { useState,useEffect } from "react";

import bombs from "../src/assets/bombs.png"
import flags from "../src/assets/flag.png"



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
  const newBoard = board.map(row => row.map(cell=> ({...cell}))
);

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

return newBoard;
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

function Board({rows,cols,mineCount}) {


  const [board, setBoard] = useState(() => {
    let newBoard = createBoard(rows, cols);
    newBoard = PlaceMines(newBoard, rows, cols, mineCount);
    newBoard = countNeighbours(newBoard,rows,cols);
    
    return newBoard ;
  });

  useEffect(() =>{
    let newBoard = createBoard(rows,cols);
    newBoard=PlaceMines(newBoard,rows,cols,mineCount);
    newBoard=countNeighbours(newBoard,rows,cols);
    setBoard(newBoard);

  },[rows,cols,mineCount]);
  function placeFlags(r,c){
  const newBoard = board.map(row =>
    row.map(cell => 
    ({...cell})
    )
  );
  if(newBoard[r][c].isRevealed) return;
  newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;

  setBoard(newBoard);
}
  function HandleClicking(r, c) {
    const newBoard = board.map(row =>
      row.map(cell => ({ ...cell }))
    );

    const cell = newBoard[r][c];
    if(cell.isFlagged) return;
    if(cell.isMine){
      cell.isRevealed =true;
      newBoard.forEach(row => row.forEach(c=>{
        if(c.isMine) c.isRevealed = true;
      })
    );}
    if(newBoard[r][c].neighbourMines===0){
      setBoard(RevealEmptyCells(newBoard,r,c,rows,cols))
    }else{
    newBoard[r][c].isRevealed = true;
    setBoard(newBoard);
  }
}
function renderContent(cell){
  if(cell.isRevealed){
    if(cell.isMine) return <img src={bombs} alt="bomb"/>;
    return cell.neighbourMines || "";
  }
  if(cell.isFlagged){
    return <img src={flags} alt="flag"/>
  }
  return null;
}

  return (

    <div className="flex justify-center items-center min-h-screen">
    <div className="inline-block border-4 border-gray-600">
    <div className="grid divide-x divide-y divide-black font-black text-6xl"
      style={{gridTemplateColumns: `repeat(${cols},1fr)`}}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            onClick={() => HandleClicking(r, c)}
            onContextMenu={(e)=>{
  e.preventDefault();
   placeFlags(r,c);
}}
            className={`w-20 h-20 cursor-pointer
              ${cell.isRevealed ? "bg-gray-400" : "bg-red-200"}`}
          >
        
         {renderContent(cell)}
                   </div>
        ))
      )}
    </div>
    </div>
    </div>
  );
}

function GenerateBoard(){
  const [difficulty,setDifficulty] = useState({
    rows:8,
    cols:8,
    mines:10
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      {/*difficulty buttons */}
      <div className="flex gap-4">
        <button
        className="px-4 py-2 bg-green-400"
        onClick={()=>{
          setDifficulty({rows:10,cols:10,mines:20})
        }}>
          Beginner
        </button>
        
        <button
        className="px-4 py-2 bg-yellow-400"
        onClick={()=>{
          setDifficulty({rows:15,cols:15,mines:50})
        }}>
          Intermediate
        </button>

        <button className="px-4 py-2 bg-red-400"
        onClick={()=>{
          setDifficulty({rows:20,cols:20,mines:100})
        }}>Expert</button>
      </div>

      <Board
        rows={difficulty.rows}
        cols={difficulty.cols}
        mineCount={difficulty.mines}/>

    </div>
  )
}

export default GenerateBoard;