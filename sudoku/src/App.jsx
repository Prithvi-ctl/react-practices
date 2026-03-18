import {useState,useEffect} from 'react';



function arraysEqual(a,b){
return a.length === b.length && a.every((v,i) => v == b[i]);
}
function randomizer(){
  const nums = [1,2,3,4,5,6,7,8,9];
  for(let i= nums.length-1;i>  0;i--){
  const j = Math.floor(Math.random() * (i+1));
  [nums[i],nums[j]] = [nums[j],nums[i]];
}
return nums;

}



function BoxLocator(j){
  const hA = [0,1,2];
  const hB = [3,4,5];
  const hC = [6,7,8];

  const VA = [0,3,6];
  const VB = [1,4,7];
  const VC = [2,5,8];
  const arrA = [hA,hB,hC,VA,VB,VC];
  const result = [];
  for(let i=0;i<arrA.length;i++){
    if(arrA[i].includes(j)){
      result.push(arrA[i]);
    }
  }
  return result;
}

function repeater(arr,mainArr){ 
    
  const arrT = [1,2,3,4,5,6,7,8,9];
  let arrE =[];
  let arrG = [];
    for(let i=0;i<arr.length;i++){
        arrE = [];
      for(let j= 0;j<arr[i].length;j++){
          const n = arr[i][j];
          
          console.log(n);
        for(let z = 0;z<3;z++){
             arrE.push(mainArr[n][z]);
            
        }
        

    
      }
        console.log(arrE)
       let arrC = arrE.sort((a,b) => (a-b));
       console.log("helo")
       console.log(arrC)
       
    if(arraysEqual(arrT,arrC)){
      arrG.push('true')
    }
      else{
          arrG.push('false');
      }
  }
  return arrG;
}

function Boxes({numeros,rowIndex,board,setBoard}){
    return(
      <div className="grid grid-cols-3 w-fit">
       {numeros.map((num,i) =>(
        <div key={i} index={i}
        className="w-24 h-24 border-2 border-black flex justify-center items-center text-4xl cursor-pointer " onClick={() =>{
          const newBoard = board.map(r => r.map(c =>({...c})));
          newBoard[rowIndex][i].isRevealed = true;
          setBoard(newBoard);
        }}>
         {num.isRevealed? num.value : " "}
          </div>
          
       ))}
       
      </div>
      


    )
}
function numberGenerator(E){
for(let i =0; i<9;i++){
for(let j = 0;j<9;j++){
  let attempts = 0;
  let placed = false;
  while(attempts < 20){
let d =Math.floor(Math.random()*9)+1;
if(Placer({i:i ,j:j ,value:d ,mainArr:E})){
		E[i][j].value = d;
    placed = true;
    break;
	}
  attempts++;
}
  if(!placed){
    return numberGenerator(Array.from({length:9},()=>
    Array.from({length:9},() => ({
      value:0, isRevealed:false
    }))
  )
);
  }
}
}
return E;
}
function reveal(i,j,board){
  const newBoard = board.map(row => row.map(cell=>({...cell})));
  newBoard[i][j].isRevealed = true;
  setBoard(newBoard);
};  
function Board(){
  
  const EBoard = Array.from({length:9},()=>
Array.from({length:9},()=>({
  value :0,
  isRevealed:false
})
));
  
  const [board,setBoard] = useState(() => {
    const EBoard = Array.from({length:9},()=>
Array.from({length:9},()=>({
  value :0,
  isRevealed:false
})
));
 return numberGenerator(EBoard) });
  return(
    <>
    <div className="flex justify-center items-center h-screen">
  <div className="grid grid-cols-3 gap-0 w-fit">
      {board.map((numeros,i) =>(
        <Boxes key={i} index={i} rowIndex = {i} numeros={numeros} board = {board} setBoard={setBoard}/>
      ))}
    
  </div>
  
        
      </div>
  </>
  )
}
function Placer({i,j,value,mainArr}){ //basically converts box coords to global rows and cols
  const row = Math.floor(i/3)*3 + Math.floor(j/3); //so basically which row it locates to and which col it's in, that's it,  
  const col = Math.floor(i%3)*3+(j%3);  // same dividing or should i say converting the box coords to global coords,
  
  for(let c = 0;c< 9;c++){ // here we are doing the same thing, keeping the row the same , we are , going from 0 - 9 and collecting things 
    const r = row;
    const c2 = c;

    const box = Math.floor(r/3)*3 + Math.floor(c2/3); 
    const cell = (r%3) * 3  + (c2%3);
    if(mainArr[box][cell].value === value && c2 !== col){
      return false;
    }
  }
  for(let d = 0;d<9;d++){
    const r = d;
    const c2 = col;

    const box = Math.floor(r/3)*3+Math.floor(c2/3);
    const cell = (r%3)*3+(c2%3);
    if(mainArr[box][cell].value === value && d !== row){
      return false;
    }
  }
const startRow = Math.floor(row/3)*3;
const startCol = Math.floor(col/3)*3;
  for(let r = 0; r<3;r++){
    for(let c= 0;c<3;c++){
      const rr =startRow+r;
      const cc =startCol+c;

      const box = Math.floor(rr/3)*3 + Math.floor(cc/3);
      const cell = rr%3*3 + cc%3;

      if(mainArr[box][cell].value === value){
        return false;
      }
    }
  }
  
  return true;
}
  
  
		

export default Board;

