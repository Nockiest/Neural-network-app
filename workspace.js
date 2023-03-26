import * as React from 'react';
import Neuron from "./neurons/Neuron.js";
import { useState } from 'react';

export default function Workspace() {
  const [neurons, setNeurons] = useState([]);
  const neuronSize = 60;
  

  const handleClick = (event) => {
    if (event.button !== 0) return; // Only handle left mouse click

    const x = event.clientX - neuronSize / 2;
    const y = event.clientY - neuronSize / 2;

    const isOccupied = neurons.some((neuron) => {
      const distance = Math.sqrt(
        Math.pow(neuron.x - x, 2) + Math.pow(neuron.y - y, 2)
      );
      const minDistance = 1.5 * neuronSize;
      return distance < minDistance;
    });

    if (!isOccupied) {
      setNeurons([...neurons, { x, y, isBlack: false }]);
    } else {
      // Do something else
    }
  };

  const handleNeuronClick = (event, neuron) => {
    if (event.button !== 0) return; // Only handle left mouse button

    const updatedNeurons = neurons.map((n) => {
      if (n === neuron) {
        return { ...n, isBlack: !n.isBlack };
      } else {
        return n;
      }
    });

    setNeurons(updatedNeurons);

   // setDraggedNeuron(neuron);
  };

  const styles = {
    workspace: {
      position: 'absolute',
      top: -20,
      left: 0,
      bottom: 0,
      right: -20,
      height: 'window.innerWidth',
      width: 'window.inneHeight',
      backgroundColor: 'pink',
      padding: 0,
    },
  };

  return (
    <div style={styles.workspace} onClick={handleClick}>
      {neurons.map((neuron, index) => (
        <Neuron
          key={index}
          size={neuronSize}
          x={neuron.x}
          y={neuron.y}
          isBlack={neuron.isBlack}
          style={{
            position: 'absolute',
            top: neuron.y,
            left: neuron.x,
            border: '0.05rem solid black',
            backgroundColor: neuron.isBlack ? 'black' : 'white',
          }}
          setNeurons={setNeurons}
          neurons={neurons}
          onClick={() => handleNeuronClick(event, neuron)}  
        />
      ))}
    </div>
  );
}
//mouseDown={handleMouseDown}
//onMouseDown={(event) => handleMouseDown(event, neuron)}
// mouseDown={handleMouseDown} 
//onMouseDown={handleMouseDown} 
// onContextMenu={handleContextMenu}
// top: neuron.y,
//left: neuron.x,
// <Neuron size="60"/>

//onMouseMove={handleMouseMove}
//onMouseUp={handleMouseUp}
// top: neuron.y,
//left: neuron.x,
// <Neuron size="60"/>
  /*const handleMouseMove = (event) => {
    if (!draggedNeuron) return;

    const x = event.clientX - neuronSize / 2;
    const y = event.clientY - neuronSize / 2;

    setDraggedNeuron({ ...draggedNeuron, x, y });
  };

  const handleMouseUp = () => {
    setDraggedNeuron(null);
  };*/

  
  /*const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent default context menu behavior
  
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
  
    const newNeurons = neurons.filter((neuron) => {
      const distance = Math.sqrt(
        Math.pow(neuron.x + neuronSize / 2 - offsetX, 2) + Math.pow(neuron.y + neuronSize / 2 - offsetY, 2)
      );
      const maxDistance = neuronSize / 2;
      return distance > maxDistance;
    });
  
    setNeurons(newNeurons);
  };*/// const [draggedNeuron, setDraggedNeuron] = useState(null);