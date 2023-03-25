 
import * as React from 'react';
import { useState } from "react";
import Slider from "./Slider.js"

function Neuron({ size, filled, bias, weight, x, y }) {
  const [biasValue, setBiasValue] = useState(bias);
  const [weightValue, setWeightValue] = useState(weight);
  const [isBlack, setIsBlack] = useState(false);

  const handleSliderValueChange = (name, value) => {
    if (name === 'Bias') {
      setBiasValue(value);
      // do something with the bias value
    } else if (name === 'Weight') {
      setWeightValue(value);
      // do something with the weight value
    }
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
      zIndex: 1,
    },
    slider: {
      position: 'absolute',
      zIndex: 3, // add this line
      marginLeft: `-${size/2}px`,
      marginTop: `${size/2}px`,
    },
  };

  return (
    <div>
   
      <div style={styles.neuron} onClick={handleNeuronClick}></div>
      <Slider
  name="Weight"
  x={x}
  y={y - 15}
  value={weightValue}
  setValue={setWeightValue}
  color={weightValue === 0 ? 'black' : weightValue > 0 ? 'green' : 'violet'}
  size={size}
  sendValue={(name, value) => handleSliderValueChange(name, value)}
/>
<Slider
  name="Bias"
  x={x}
  y={y - 15}
  value={weightValue}
  setValue={setWeightValue}
  color={weightValue === 0 ? 'black' : weightValue > 0 ? 'green' : 'violet'}
  size={size}
  sendValue={(name, value) => handleSliderValueChange(name, value)}
/>
    </div>
  );
}

export default Neuron;





