import { useState, useContext } from 'react';
import * as React from 'react';
import Slider from './Slider';
import Node from './ConnectionNode.js';
import { WorkspaceContext } from '../workspace';

function Neuron({size,firedUp,bias, weight, x, y,toggleNeuronActivation,onRightClick,onMouseDown,onMouseUp,renderNewLine,id, input, output}) {
  const { neurons, setNeurons } = useContext(WorkspaceContext);
  const nodeSize = size * 0.2;
  const [nodes, setNodes] = useState([
    { x: size / 2 - size * 0.12, y: -nodeSize, type: 'output', parentKey: id },
    { x: size / 2 - size * 0.12, y: size, type: 'input', parentKey: id },
  ]);
  const handleSliderValueChange = (name, value) => {
    const updatedNeurons = neurons.map((n) => {   
      if (n.id === id) {
        if (name === "bias"){
          return { ...n, bias: value };
        } else if (name === "weight") {
          return { ...n, weight: value };
        }
      } else {
        return n;
      } 
    });
    setNeurons(updatedNeurons);
  };
   
  const styles = {
    neuron: {
      width: `${size}px`,
      height: `${size}px`,
      border: '1px solid black',
      backgroundColor: firedUp !== 0 ? 'gray' : 'white',
     // color: firedUp ? 'white' : 'black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      cursor: 'pointer',
      top: y,
      left: x,
      position: 'absolute',
      zIndex: 1,
    },
    slider: {
      position: 'absolute',
      zIndex: 3,
    },
  };
  console.log(id,toggleNeuronActivation(event,id))
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={styles.neuron}
        onClick={(event,id) => toggleNeuronActivation(event, id)}
        onContextMenu={onRightClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {nodes.map((node, index) => {
          return (
            <Node
              key={index}
              parentIndex={id}
              size={nodeSize}
              x={node.x}
              y={node.y}
              parentCoords={{ x: x, y: y }}
              active={node.type === 'input' ? input : output}
              strength={node.type === 'input' ? bias : weight}
              onClick={renderNewLine}
              type={node.type}
            />
          );
        })}
      </div>
      <Slider
        name={'weight'}
        x={x}
        y={y}
        value={weight}
        size={size}
        updateValue={(name, value) => handleSliderValueChange(name, value)}
      />
      <Slider
        name={'bias'}
        x={x}
        y={y + size * 0.7}
        value={bias}
        size={size}
        updateValue={(name, value) => handleSliderValueChange(name, value)}
      />
    </div>
  );
}

export default Neuron;

/*isGreen={node.type === "input"? styles.input.isGreen:styles.output.isGreen}*/
/*const handleNeuronClick = (event) => {
    if (event.button === 0) { // left mouse button
      setIsBlack(!isBlack);
    } else if (event.button === 2) { // right mouse button
      setIsBlack(!isBlack);
    }
  };*/

/*(event) => {
    if (event.button === 0) {
      setIsDragging(true);
      setInitialMousePos({ x: event.clientX, y: event.clientY });
      mouseDown(event); // call the onMouseDown function passed as a prop
    }
  };*/

/*const handleMouseMove = (event) => {
    if (isDragging) {
      const newX = x + event.clientX - initialMousePos.x;
      const newY = y + event.clientY - initialMousePos.y;
      setInitialMousePos({ x: event.clientX, y: event.clientY });
      setNeurons(
        neurons.map((neuron) =>
          neuron.x === x && neuron.y === y ? { ...neuron, x: newX, y: newY } : neuron
        )
      );
    }
  };*/

/*const handleClick = () => {
    setNeurons(
      neurons.map((neuron) => {
        if (neuron === { x, y }) {
          return { ...neuron, isBlack: !neuron.isBlack };
        } else {
          return neuron;
        }
      })
    );
  };*/

/*const handleNeuronClick = (event) => {
    if (event.button === 0) { // left mouse button
      setIsBlack(!isBlack);
    } else if (event.button === 2) { // right mouse button
      setIsBlack(!isBlack);
    }
  };*/

/*(event) => {
    if (event.button === 0) {
      setIsDragging(true);
      setInitialMousePos({ x: event.clientX, y: event.clientY });
      mouseDown(event); // call the onMouseDown function passed as a prop
    }
  };*/

/*const handleMouseMove = (event) => {
    if (isDragging) {
      const newX = x + event.clientX - initialMousePos.x;
      const newY = y + event.clientY - initialMousePos.y;
      setInitialMousePos({ x: event.clientX, y: event.clientY });
      setNeurons(
        neurons.map((neuron) =>
          neuron.x === x && neuron.y === y ? { ...neuron, x: newX, y: newY } : neuron
        )
      );
    }
  };*/

/*const handleClick = () => {
    setNeurons(
      neurons.map((neuron) => {
        if (neuron === { x, y }) {
          return { ...neuron, isBlack: !neuron.isBlack };
        } else {
          return neuron;
        }
      })
    );
  };*/
