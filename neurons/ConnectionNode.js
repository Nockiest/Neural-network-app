import { useState } from 'react';
import * as React from 'react';

export default function Node({ size, x, y,parrentCoors, isGreen, onClick, createLineStart }) {
  const handleClick = (e) => {
    e.stopPropagation(); 
    onClick(); 
    createLineStart({x:parrentCoors.x+x,y:parrentCoors.y+y,size:size})
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