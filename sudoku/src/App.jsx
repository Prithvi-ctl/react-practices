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

const EBoard = Array.from({length:9},()=>
Array.from({length:9},()=>({
  value :0,
  isFilled:false
})
));

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

function Boxes({numeros}){
    return(
      <div className="grid grid-cols-3 w-fit">
       {numeros.map((num,i) =>(
        <div key={i} index={i}
        className="w-24 h-24 border-2 border-black flex justify-center items-center text-4xl">
          {num.value}
          </div>
          
       ))}
       
      </div>
      


    )
}

function Board(){
    
  const result = Placer({i:2, j:4, value:1, mainArr:EBoard});
  const hel = "hello";
    const  boxesData = Array.from({length:9},()=>randomizer());
    
    
    console.log(boxesData);

  return(
    <>
    <div className="flex justify-center items-center h-screen">
  <div className="grid grid-cols-3 gap-0 w-fit">
      {EBoard.map((numeros,i) =>(
        <Boxes key={i} index={i} numeros={numeros}/>
      ))}
    
  </div>
  
        {String(result)}  ; 
      </div>
  </>
  )
}
function Placer({i,j,value,mainArr}){
  const row = Math.floor(i/3)*3 + Math.floor(j/3); //so basically which row it locates to and which col it's in, that's it,  
  const col = Math.floor(i%3)*3+(j%3);  // same dividing or should i say converting the box coords to global coords,
  
  for(let c = 0;c< 9;c++){ // here we are doing the same thing, keeping the row the same , we are , going from 0 - 9 and collecting things 
    const box = Math.floor(row/3)*3 + Math.floor(col/3); 
    const cell = (row%3) * 3  + (c%3);
    if(mainArr[box][cell].value === value && c !=col){
      return false;
    }
  }
  for(let d = 0;d<9;d++){
    const box = Math.floor(row/3)*3+Math.floor(col/3);
    const cell = (d%3)*3+(col%3);
    if(mainArr[box][cell].value === value && d !== row){
      return false;
    }
  }
  return true;
}
  
			
		

export default Board;