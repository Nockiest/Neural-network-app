import { useState } from 'react';
import * as React from 'react';

export default function Node({ size, x, y, parentIndex, parentCoords, active, onClick, strength, type }) {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick({ size, x, y, parentIndex, parentCoords, isGreen: active, onClick, strength, type });
  };

  const styles = {
    node: {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      backgroundColor: active.length === 0 || strength === 0 ? "white": (strength > 0 ? "green" : "purple") ,
      border: "1px solid black",
      position: "absolute",
      top: y,
      left: x,
      zIndex: 4,
      cursor: "pointer",
    },
  };

  return <div style={styles.node} onClick={handleClick} />;
}
