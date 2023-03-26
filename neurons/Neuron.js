
import * as React from 'react';
import { useState } from "react";
import Slider from "./Slider.js"

function Neuron({ size, isBlack, bias, weight, x, y, setNeurons, neurons, onClick }) {
  const [biasValue, setBiasValue] = useState(bias);
  const [weightValue, setWeightValue] = useState(weight);
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
 // console.log({ size, isBlack, bias, weight, x, y, setNeurons, neurons, mouseDown })

  const handleSliderValueChange = (name, value) => {
    if (name === "Bias") {
      setBiasValue(value);
      // do something with the bias value
    } else if (name === "Weight") {
      setWeightValue(value);
      // do something with the weight value
    }
  };

  
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
      padding: '10px',
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
      <div style={styles.neuron} onClick={onClick}></div>
      <Slider
        name="Weight"
        x={x}
        y={y - size*1.1}
        value={biasValue}
        setValue={setBiasValue}
        size={size}
        sendValue={(name, value) => handleSliderValueChange(name, value)}
      />
      <Slider
        name="Bias"
        x={x}
        y={y-size*0.2}
        value={weightValue}
        setValue={setWeightValue}
        size={size}
        sendValue={(name, value) => handleSliderValueChange(name, value)}
      />
    </div>
  )
}
export default Neuron;



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

