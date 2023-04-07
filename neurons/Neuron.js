import { useState } from 'react';
import * as React from 'react';
import Slider from './Slider';
import Node from "./ConnectionNode.js"

function Neuron({ size, isBlack, bias, weight, x, y, reverseColor, onRightClick, onMouseDown, onMouseUp, renderNewLine, id,reverseNodeColor }) {
  const [biasValue, setBiasValue] = useState(bias);
  const [weightValue, setWeightValue] = useState(weight);
  const nodeSize = size*0.2
  const [nodes, setNodes] = useState([
    { x: size/2-size*0.12, y: -nodeSize, isGreen: false,type:"output",parentKey:id},
    { x: size/2-size*0.12, y: size, isGreen: false,type:"input", parentKey:id},
  ]);
  const handleSliderValueChange = (name, value) => {
    if (name === "Bias") {
      setBiasValue(value);
      // do something with the bias value
    } else if (name === "Weight") {
      setWeightValue(value);
      // do something with the weight value
    }
  };
  conosle.log(id)
  const styles = {
    neuron: {
      width: `${size}px`,
      height: `${size}px`,
      border: '1px solid black',
      backgroundColor: isBlack ? 'gray' : 'white',
      color: isBlack ? 'white' : 'black',
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

  return (
    <div style={{ position: 'relative' }}>
      <div
       style={styles.neuron}
       onClick={reverseColor} 
       onContextMenu={onRightClick} 
       onMouseDown={onMouseDown} 
       onMouseUp={onMouseUp}>
        {nodes.map((node, index) => (
          <Node
            key={index}
            parentIndex = {key}
            size={nodeSize}
            x={node.x}
            y={node.y}
            parrentCoors={{x:x,y:y}}
            isGreen={node.isGreen}
            onClick={reverseNodeColor}
            renderNewLine={renderNewLine}
            strength={node.value}
            type = {node.type}
            parentInformation = {}
          />
        ))}
       </div>
      <Slider
        name="Weight"
        x={x}
        y={y}
        value={biasValue}
        setValue={setBiasValue}
        size={size}
        sendValue={(name, value) => handleSliderValueChange(name, value)}
        
        
      />
      <Slider
        name="Bias"
        x={x}
        y={y+size*0.7}
        value={weightValue}
        setValue={setWeightValue}
        size={size}
        sendValue={(name, value) => handleSliderValueChange(name, value)}
      />
    </div>
  )
}


export default Neuron




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

