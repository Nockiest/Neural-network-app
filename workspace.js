import * as React from 'react';
import Neuron from "./neurons/Neuron.js";
import { useState } from 'react';

export default function Workspace() {
  const [neurons, setNeurons] = useState([]);
  const neuronSize = 60;
  const [draggedNeuron, setDraggedNeuron] = useState(null);

  const handleClick = (event) => {
    if (event.button !== 0) return; // Only handle left mouse click

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

  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent default context menu behavior
  
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
  
    const newNeurons = neurons.filter((neuron) => {
      const distance = Math.sqrt(
        Math.pow(neuron.x - offsetX, 2) + Math.pow(neuron.y - offsetY, 2)
      );
      const maxDistance = neuronSize / 2;
      return distance > maxDistance;
    });
  
    setNeurons(newNeurons);
  };

  const handleMouseDown = (event, neuron) => {
    if (event.button !== 0) return; // Only handle left mouse button

    setDraggedNeuron(neuron);
  };

  const handleMouseMove = (event) => {
    if (!draggedNeuron) return;

    const x = event.clientX - neuronSize / 2;
    const y = event.clientY - neuronSize / 2;

    setDraggedNeuron({ ...draggedNeuron, x, y });
  };

  const handleMouseUp = () => {
    setDraggedNeuron(null);
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
    <div
      style={styles.workspace}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {neurons.map((neuron, index) => (
        <Neuron
          key={index}
          size={neuronSize}
          x={neuron.x}
          y={neuron.y}
          style={{
            position: 'absolute',
            top: neuron.y,
            left: neuron.x,
            border: '0.05rem solid black',
            borderRadius: '50%',
          }}
          onMouseDown={(event) => handleMouseDown(event, neuron)}
        />
      ))}
    </div>
  );
}


// top: neuron.y,
//left: neuron.x,
// <Neuron size="60"/>
