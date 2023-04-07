import { useState } from 'react';
import * as React from 'react';

export default function Node({ size, x, y,parentIndex,parrentCoors, isGreen, onClick, renderNewLine,stregth, type }) {
    console.log({size, x, y,parentIndex,parrentCoors, isGreen, onClick, renderNewLine,stregth, type})
  const handleClick = (e) => {
    e.stopPropagation( ); 
    onClick( size, x, y,parentIndex,parrentCoors, isGreen, onClick, renderNewLine,stregth, type); 
    renderNewLine({x:parrentCoors.x+x,y:parrentCoors.y+y,size:size, type:type})
  };

  const styles = {
    node: {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      backgroundColor: isGreen ? "green" : "white",
      border: "1px solid black",
      position: "absolute",
      top: y,
      left: x,
      zIndex: 4,
      cursor: "pointer",
    },
  };
  
  return  <div style={styles.node} onClick={handleClick} />
}