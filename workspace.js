import * as React from 'react';
import Neuron from "./neurons/Neuron.js";

import { useState } from 'react';

export default function Workspace() {
  const [neurons, setNeurons] = useState([]);
  const neuronSize = 60;

  const handleWorkspaceClick = (event) => {
    const x = event.clientX - neuronSize / 2;
    const y = event.clientY - neuronSize / 2;
  
    const isOccupied = neurons.some((neuron) => {
      const distance = Math.sqrt(
        Math.pow(neuron.x - x, 2) + Math.pow(neuron.y - y, 2)
      );
      const minDistance = 2 * neuronSize;
      return distance < minDistance;
    });
  
    if (!isOccupied) {
      setNeurons([...neurons, { x, y }]);
    }
  };

  const styles = {
    workspace: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: 'pink',
    
    },
  };

  return (
    <div style={styles.workspace} onClick={handleWorkspaceClick}>
      {neurons.map((neuron, index) => (
        <Neuron
          key={index}
          size={neuronSize}
          x={neuron.x}
          y={neuron.y}
          style={{
            position: 'absolute',          
            border: '0.05rem solid black',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
}

// top: neuron.y,
//left: neuron.x,
// <Neuron size="60"/>
