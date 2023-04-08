import * as React from 'react';
import { useState } from 'react';

function Slider({ name, x, y, value, updateValue, size }) {
  const [color, setColor] = useState('black');

  React.useEffect(() => {
    if (value === 0) {
      setColor('black');
    } else if (value > 0) {
      setColor(`hsl(105, 100%, 27%, 1`)//green
    } else {
      setColor(`hsl(280, 50%, 50%)`);
    }
  }, [value]);

  const styles = {
    sliderContainer: {
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      width: `${size}px`,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 3,
      borderRadius: '10px',
      padding: "0px 0px",
      fontSize: '13px',
      fontWeight: 900,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textAlign: 'center',
    },
    slider: {
      width: '80%',
      margin: '0px',
      marginLeft: "10%",
      backgroundColor: color,
      opacity:0.5,
    },
    label: {
      position: "absolute",
      color: color, 
      opacity:1,
      zIndex:10,
      pointerEvents: "none",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      textStroke: "1px #111111",
      textFillColor: color,
       },
  };
  return (
    <div style={styles.sliderContainer}>
      <div style={styles.label}>{name}</div>
      <input
        type="range"
        min="-1"
        max="1"
        step="0.2"
        value={value}
        style={styles.slider}
        onChange={(e) => updateValue(name, e.target.value)} // pass name as a string here
        onMouseMove={(e) => {
          if (e.buttons === 1) {
            const rect = e.currentTarget.getBoundingClientRect();
            const normalizedX = (e.clientX - rect.left) / rect.width;
            updateValue(name, (normalizedX * 2 - 1).toFixed(1));
          }
        }}
      />     
    </div>
  );
}

 

export default Slider;
