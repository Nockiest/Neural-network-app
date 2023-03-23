 
import * as React from 'react';
import { useState } from "react";
import Slider from "./Slider.js"

function Neuron({ size, filled, bias, weight, x, y }) {
  const [biasValue, setBiasValue] = useState(bias);
  const [weightValue, setWeightValue] = useState(weight);
  const [isBlack, setIsBlack] = useState(false);

  const handleBiasChange = (event) => {
    setBiasValue(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeightValue(event.target.value);
  };

  const handleNeuronClick = () => {
    setIsBlack(!isBlack);
  };

  const styles = {
    neuron: {
      width: `${size}px`,
      height: `${size}px`,
      border: '1px solid black',
      backgroundColor: isBlack ? 'black' : filled ? 'black' : 'white',
      color: filled || isBlack ? 'white' : 'black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '10px',
      cursor: 'pointer',
      top: y,
      left: x,
      position: 'absolute',
    },
  };

  return (
    <div>
      <Slider
        x={x}
        y={y-size*2+25}
        value={biasValue}
        setValue={setBiasValue}
        color={biasValue === 0 ? 'black' : biasValue > 0 ? 'green' : 'violet'}
        size = {size} 
      />
      <div style={styles.neuron} onClick={handleNeuronClick}></div>
      <Slider
        x={x}
        y={y-15}
        value={weightValue}
        setValue={setWeightValue}
        color={weightValue === 0 ? 'black' : weightValue > 0 ? 'green' : 'violet'}
        size = {size} 
/>
    </div>
  );
}

export default Neuron;





