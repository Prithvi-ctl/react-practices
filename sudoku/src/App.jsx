import {useState,useEffect} from 'react';


function Boxes(){
    return(
      <div className="grid grid-cols-3 w-fit">
        {Array.from({length:9}).map((_,i) =>(
          <div key={i} className="w-24 h-24 border-2 border-black"></div>
        ))}
      </div>


    )
}

function Board(){
  

  return(
  <div className="grid grid-cols-3 gap-0 w-fit flex">
    {Array.from({length:9}).map((_,i)=>(
      <Boxes key={i}/>
    ))}
  </div>
  )}


export default Board;