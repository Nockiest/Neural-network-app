
import React from 'react';
import { WorkspaceContext } from '../workspace';
import { useState, createContext, useContext } from 'react';

function Line({ startCoords, endCoords = { x: window.mouseX+window.scrollX, y: window.mouseY+window.scrollY+ 100},startNeuronId }) {
  const { neurons, setNeurons } = useContext(WorkspaceContext)
  const dx = endCoords.x - startCoords.x;
  const dy = endCoords.y - startCoords.y;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);
  const neuron = neurons.find((n) => n.id === startNeuronId);
  //console.log()
  if(startNeuronId){
    console.log(startNeuronId ,"xyz",neuron)
  }
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
            backgroundColor: startNeuronId && neuron.weight > 0 ? "green" : "purple",
            transform: `rotate(${angle}rad)`,
            transformOrigin: '0 0',
            pointerEvents: 'none',
            zIndex: 3,
          }}
      />
  );
}
export default Line;  