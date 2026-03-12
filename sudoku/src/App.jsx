import {useState,useEffect} from 'react';


function randomizer(){
  const nums = [1,2,3,4,5,6,7,8,9];
  for(let i= nums.length-1;i>  0;i--){
  const j = Math.floor(Math.random() * (i+1));
  [nums[i],nums[j]] = [nums[j],nums[i]];
}
return nums;

}


function Boxes(){
  const numeros = randomizer();
    return(
      <div className="grid grid-cols-3 w-fit">
       {numeros.map((num,i) =>(
        <div key={i}
        className="w-24 h-24 border-2 border-black flex justify-center items-center text-4xl">
          {num}
          </div>
          
       ))}
       
      </div>
      


    )
}

function Board(){
  

  return(
    <>
    <div className="flex justify-center items-center h-screen">
  <div className="grid grid-cols-3 gap-0 w-fit">
    {Array.from({length:9}).map((_,i)=>(
      <Boxes key={i} />
    ))}
  </div>
  </div>
  </>
  )}


export default Board;