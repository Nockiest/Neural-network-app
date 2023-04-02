import { useState } from 'react';
import * as React from 'react';
import Slider from './Slider';


export default function Node({ size, x, y, isGreen, onClick }) {
  const handleClick = (e) => {
    e.stopPropagation(); 
    onClick(); 
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