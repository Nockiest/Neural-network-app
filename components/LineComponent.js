import React from 'react';

function Line({ startCoords, endCoords = { x: window.mouseX+window.scrollX, y: window.mouseY+window.scrollY+ 100}, color }) {
  const dx = endCoords.x - startCoords.x;
  const dy = endCoords.y - startCoords.y;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);

  if (startCoords.x === null || window.mouseX === null) {
      return null; // return null if coordinates are invalid
  }

  return (
      <div
          style={{
            position: 'absolute',
            top: startCoords.y,
            left: startCoords.x,
            width: length,
            height: '2px',
            backgroundColor: color,
            transform: `rotate(${angle}rad)`,
            transformOrigin: '0 0',
            pointerEvents: 'none',
            zIndex: 3,
          }}
      />
  );
}

export default Line;  