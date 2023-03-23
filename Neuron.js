 
import * as React from 'react';
import { useState } from "react";

import * as React from 'react';
import { useState } from "react";

import * as React from 'react';
import { useState } from "react";

export default function Neuron({ size, filled, bias, weight }) {
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
      border: "1px solid black",
      backgroundColor: isBlack ? "black" : filled ? "black" : "white",
      color: filled || isBlack ? "white" : "black",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "10px",
      cursor: "pointer",
    },
    sliderContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      width: `${size * 0.8}px`,
      marginTop: "10px",
    },
    slider: {
      width: "100%",
      margin: "5px 0",
      backgroundColor: weightValue > 0 ? "green" : weightValue < 0 ? "violet" : "black",
    },
    label: {
      color: biasValue === 0 || weightValue === 0 ? "black" : biasValue > 0 || weightValue > 0 ? "green" : "violet",
      marginTop: "5px",
    },
  };

  return (
    <div>
      <div style={styles.sliderContainer}>
        <div style={styles.label}>Bias: {biasValue}</div>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={biasValue}
          style={styles.slider}
          onChange={handleBiasChange}
        />
        <div
          style={styles.neuron}
          onClick={handleNeuronClick}
        ></div>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={weightValue}
          style={styles.slider}
          onChange={handleWeightChange}
        />
        <div style={styles.label}>Weight: {weightValue}</div>
      </div>
    </div>
  );
}



