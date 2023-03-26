import * as React from 'react';
import { useState } from 'react';

function Slider({ name, x, y, value, setValue, size }) {
  const [color, setColor] = useState('black');

  React.useEffect(() => {
    if (value === 0) {
      setColor('black');
    } else if (value > 0) {
      setColor('lightgreen');
    } else {
      setColor(`hsl(280, 50%, 75%)`);
    }
  }, [value]);

  const styles = {
    sliderContainer: {
      position: 'absolute',
      top: `${y + size*1.1}px`,
      left: `${x + size * 0.1}px`,
      width: `${size}px`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 3,
      borderRadius: '10px',
      padding: '5px',
      fontSize: '15px',
      fontWeight: 900,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textAlign: 'center',
    },
    slider: {
      width: '80%',
      margin: '-5px',
      backgroundColor: color,
    },
    label: {
      color: color, 
       },
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={styles.sliderContainer}>
      {name === 'Bias' && <div style={styles.label}>{name}</div>}
      <input
        type="range"
        min="-1"
        max="1"
        step="0.2"
        value={value}
        style={styles.slider}
        onChange={handleValueChange}
      />
      {name === 'Weight' && <div style={styles.label}>{name}</div>}
    </div>
  );
}




 

export default Slider;
