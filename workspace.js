import * as React from 'react';
import Neuron from "./neurons/Neuron.js";

import { useState } from 'react';

export default function Workspace() {
  const [neurons, setNeurons] = useState([]);

  const handleWorkspaceClick = (event) => {
    const x = event.clientX - 30; // 30 is half the neuron size
    const y = event.clientY - 30;
    setNeurons([...neurons, { x, y }]);
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
        <Neuron key={index} size="60" x={neuron.x} y={neuron.y} style={{ position: 'absolute', top: neuron.y, left: neuron.x , border: "2px"}} />
      ))}
    </div>
  );
}

// <Neuron size="60"/>
