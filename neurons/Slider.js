import * as React from 'react';
import { useState } from 'react';

import * as React from 'react';
import { useState } from 'react';

function Slider({ name, x, y, value, setValue, color, size, sendValue }) {
  const styles = {
    sliderContainer: {
      position: 'absolute',
      top: `${y + 60}px`,
      left: `${x+10}px`,
      width: `${ 1 * size}px`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex:3,
    },
    slider: {
      width: '80%',
      backgroundColor: color,
    },
    label: {
      color: value === 0 ? 'black' : value > 0 ? 'green' : 'violet',
      marginTop: '5px',
    },
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
    sendValue(name, event.target.value);
  };

  return (
    <div style={styles.sliderContainer}>
      <div style={styles.label}>{name}: {value}</div>
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        value={value}
        style={styles.slider}
        onChange={handleValueChange}
      />
    </div>
  );
}



 

export default Slider;
