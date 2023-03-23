import * as React from 'react';
import Neuron from "./Neuron.js";

import { useState } from 'react';

export default function Workspace() {
  const [neurons, setNeurons] = useState([]);

  const handleWorkspaceClick = (event) => {
    console.log(event)
    const x = event.clientX;
    const y = event.clientY;
    setNeurons([...neurons, { x, y }]);
  };

  return (
    <div style={{ position: 'relative', backgroundColor: 'pink' }} onClick={handleWorkspaceClick}>
      {neurons.map((neuron, index) => (
        <Neuron key={index} size="60" style={{ position: 'absolute', top: neuron.y, left: neuron.x }} />
      ))}
      <Neuron size="60"/>
    </div>
  );
}


