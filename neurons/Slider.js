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
    //  border: "solid 2px black"
    },
    slider: {
      width: '80%',
      margin: '0px',
      marginLeft: "10%",
      backgroundColor: color,
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
      //margin: "-5px"
       },
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={styles.sliderContainer}>
      {/*name === 'Bias' &&*/ <div style={styles.label}>{name}</div>}
      <input
        type="range"
        min="-1"
        max="1"
        step="0.2"
        value={value}
        style={styles.slider}
        onChange={handleValueChange}
      />
      
    </div>
  );
}

// {name === 'Weight' && <div style={styles.label}>{name}</div>}


 

export default Slider;
