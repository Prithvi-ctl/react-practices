import {useState,useEffect} from 'react';


function randomizer(){
  const nums = [1,2,3,4,5,6,7,8,9];
  for(let i= nums.length-1;i>  0;i--){
  const j = Math.floor(Math.random() * (i+1));
  [nums[i],nums[j]] = [nums[j],nums[i]];
}
return nums;

}
function testCase(){
  const hA = [0,1,2];
  const hB = [3,4,5];
  const hC = [6,7,8];

  const VA = [0,3,6];
  const VB = [1,4,7];
  const VC = [2,5,8];
  for(let i = 0;i>=hA.length;i++){
    for(let j=0;j>=hA.length;j++){
        
    }
  }
}

function rules(){
  const hA = [0,1,2];
  const hB = [3,4,5];
  const hC = [6,7,8];

  const VA = [0,3,6];
  const VB = [1,4,7];
  const VC = [2,5,8];

//from every data i.e data from for each [hA][hA] we collect the row , i.e from every [0] => [1][2] , we collet and collet and then compare i guess, and with that we can loop over everything and loop 
//it and prevent everything from recurring, i guess, but i don't think i can do that, thou, cause it only works for the first one, so i need to identify which box it actually resides in, and which 
//column it's currently residing in, 
//so how do i find it out??  we are already keeping everything neat, i think, so let's imagine for every one we need to do it, we already have it let's say, 
//let's do it no matter what,

}

function Boxes({numeros}){
    return(
      <div className="grid grid-cols-3 w-fit">
       {numeros.map((num,i) =>(
        <div key={i} index={i}
        className="w-24 h-24 border-2 border-black flex justify-center items-center text-4xl">
          {num}
          </div>
          
       ))}
       
      </div>
      


    )
}
function BoxLocator(j,mainArr){
  for(let i = 0;i<mainArr.length;i++){
    if(mainArr[i].includes(j)){
      return i;
    }
  }
}

function Board(){
    const  boxesData = Array.from({length:9},()=>randomizer());

  return(
    <>
    <div className="flex justify-center items-center h-screen">
  <div className="grid grid-cols-3 gap-0 w-fit">
      {boxesData.map((numeros,i) =>(
        <Boxes key={i} index={i} numeros={numeros}/>
      ))}
    
  </div>
     
    </div>
  </>
  )}


export default Board;