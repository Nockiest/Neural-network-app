import * as React from 'react';
import Neuron from "./neurons/Neuron.js";
import { useState } from 'react';

export default function Workspace() {
  const [neurons, setNeurons] = useState([]);
  const [dragedFromPosition, setDragedFromPosition] = useState(null);
  const [connectionLineStart, setConnectionLineStart] = useState({x: null,y:null});
  const [renderedLines, setRenderedLines] = useState([]);
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);
  const neuronSize =60;

  const handleClick = (event) => {    
    if (dragedFromPosition) {
      return;
    }

    if (event.button !== 0) return; // Only handle left mouse click

    const x = event.clientX - neuronSize / 2;
    const y = event.clientY - neuronSize / 2;

    const isOccupied = neurons.some((neuron) => {
      const distance = Math.sqrt(
        Math.pow(neuron.x - x, 2) + Math.pow(neuron.y - y, 2)
      );
      const minDistance = 1.5 * neuronSize;
      return distance < minDistance;
    });

    if (!isOccupied) {
      setNeurons([...neurons, { x, y, isBlack: false }]);
    } else {
      // Do something else
    }
  };


  React.useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
 
    };
  
    window.addEventListener('mousemove', handleMouseMove);
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const reverseColor = (event, neuron) => {
    if (event.button !== 0) return; // Only handle left mouse button
  
    const updatedNeurons = neurons.map((n) => {
      if (n === neuron) {
        return { ...n, isBlack: !n.isBlack };
      } else {
        return n;
      }
    });
  
    setNeurons(updatedNeurons);
  };

   const deleteNeuron = (event,neuron) => {  
     const newNeurons = neurons.filter((n) => { 
        if (n !== neuron) {
          return true;
        } else {
          return false;
        }
    });  
    setNeurons(newNeurons);
  };

  const preventContextMenu = function(event){
    event.preventDefault()
  }

  const createLineStart = (node) => {
    if (connectionLineStart.x !== null) {
      // Create new line object
      const newLine = {
        start: { x: connectionLineStart.x, y: connectionLineStart.y },
        end: { x: node.x + node.size / 2, y: node.y + node.size / 2 }
      };
      // Add new line to renderedLines array
      setRenderedLines([...renderedLines, newLine]);
      // Reset connectionLineStart
      setConnectionLineStart({ x: null, y: null });
      console.log(renderedLines)
    } else {
      setConnectionLineStart({ x: node.x + node.size / 2, y: node.y + node.size / 2 });
    }
  };

  function Line({ startCoords, endCoords = { x: mouseX, y: mouseY }, color}) {
    const dx = endCoords.x - startCoords.x;
    const dy = endCoords.y - startCoords.y;
    const angle = Math.atan2(dy, dx);
    const length = Math.sqrt(dx * dx + dy * dy);
  
    if (startCoords.x === null || mouseX.x === null) {
      return null; // return null if coordinates are invalid
    }
  
    return (
      <div
        style={{
          position: 'absolute',
          top: startCoords.y,
          left: startCoords.x,
          width: length,
          height: '2px',
          backgroundColor: color,
          transform: `rotate(${angle}rad)`,
          transformOrigin: '0 0',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
    );
  }
  
  
  const styles = {
    workspace: {
      position: 'absolute',
      top: -20,
      left: 0,
      bottom: -20,
      right: -20,
      height: 'window.innerWidth',
      width: 'window.inneHeight',
      backgroundColor: 'pink',
     // position: 'relative',
     // height:"100vh",
    //  width:"100vw"
    },
  };

  return (
    <div style={styles.workspace} onClick={handleClick} onContextMenu={preventContextMenu}  >
       <Line startCoords={connectionLineStart} endCoords={{ x: mouseX+window.scrollX, y: mouseY +window.scrollY }} color={"lightGreen"}  />
      {neurons.map((neuron, index) => (
        <Neuron
          key={index}
          size={neuronSize}
          x={neuron.x}
          y={neuron.y}
          isBlack={neuron.isBlack}
          style={{
            position: 'absolute',
            top: neuron.y,
            left: neuron.x,
            border: '0.05rem solid black',
            backgroundColor: neuron.isBlack ? 'black' : 'white',
          }}
          setNeurons={setNeurons}
          neurons={neurons}
          reverseColor={() => reverseColor(event, neuron)}  
          onRightClick={() => deleteNeuron(event,neuron)}
          createLineStart={(node) => createLineStart(node)}          
        />
      ))}
        {renderedLines.map((renderedLines, index) => (
  <Line
    startCoords={renderedLines.start}
    endCoords={renderedLines.end}
    color={"green"}
    key={index}
  />
))}
    </div>
  );
}

  
      /*if (
        mouseX < 0 ||
        mouseX > window.innerWidth ||
        mouseY < 0 ||
        mouseY > window.innerHeight
      ) {
        console.log('Cursor is outside',mouseX,mouseY,window.innerHeight,window.innerWidth, mouseX < 0 ||
        mouseX > window.innerWidth ||
        mouseY < 0 ||
        mouseY > window.innerHeight);
        
        
      } else {
        console.log('Cursor is inside',mouseX,mouseY,window.innerWidth,window.innerHeight, mouseX < 0 ||
        mouseX > window.innerWidth ||
        mouseY < 0 ||
        mouseY > window.innerHeight);
      }*/


/*const dragNeuron = (event, neuron) => {
  if (dragedFromPosition) {
    return;
  } else {
    setDragedFromPosition({ x: event.clientX, y: event.clientY, neuron });
  }

  console.log(dragedFromPosition);
};

const releaseNeuron = (event, neuron) => {
  if (dragedFromPosition) {
    setDragedFromPosition(null);
  }
}*/
// onMouseDown = {() => dragNeuron(event, neuron)}
//onMouseUp={releaseNeuron}

//mouseDown={handleMouseDown}
//onMouseDown={(event) => handleMouseDown(event, neuron)}
// mouseDown={handleMouseDown} 
//onMouseDown={handleMouseDown} 
// onContextMenu={handleContextMenu}
// top: neuron.y,
//left: neuron.x,
// <Neuron size="60"/>

//onMouseMove={handleMouseMove}
//onMouseUp={handleMouseUp}
// top: neuron.y,
//left: neuron.x,
// <Neuron size="60"/>
  /*const handleMouseMove = (event) => {
    if (!draggedNeuron) return;

    const x = event.clientX - neuronSize / 2;
    const y = event.clientY - neuronSize / 2;

    setDraggedNeuron({ ...draggedNeuron, x, y });
  };

  const handleMouseUp = () => {
    setDraggedNeuron(null);
  };*/

  
  // const [draggedNeuron, setDraggedNeuron] = useState(null);

     /* const distance = Math.sqrt(
        Math.pow(neuron.x + neuronSize / 2 - offsetX, 2) + Math.pow(neuron.y + neuronSize / 2 - offsetY, 2)
      );
      const maxDistance = neuronSize / 2;
      return distance > maxDistance;*/