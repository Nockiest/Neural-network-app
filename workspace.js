import * as React from 'react';
import Neuron from "./neurons/Neuron.js";
import { useState } from 'react';
import Line from "./components/LineComponent"

export default function Workspace() {
  const [neurons, setNeurons] = useState([]);
  const [connectionLineStart, setConnectionLineStart] = useState({x:null,y:null});
  const [renderedLines, setRenderedLines] = useState([]);
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);
  const neuronSize =60;
  const handleClick = (event) => {    
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
      setNeurons((prevNeurons) => {
        const newNeurons = [...prevNeurons, { x, y, isBlack: false, connectedTo: [], id: Math.random()*1000, nodes: {input:{isGreen: false}, output:{isGreen: false}}}];
        return newNeurons;
      });
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

  const reverseNeuronColor = (event, neuron) => {
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
  const reverseNodeColor = (node) => {
    console.log( node,"node")
    const updatedNeurons = neurons.map((n) => {
      if (n.index === node.parentIndex) {
        const updatedNodes = {...n.nodes};
        updatedNodes.input.isGreen = !updatedNodes.input.isGreen;
        updatedNodes.output.isGreen = !updatedNodes.output.isGreen;
        return { ...n, nodes: updatedNodes };
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

  const renderNewLine = (node) => {
  if(node.type === "input"&&connectionLineStart.x === null){return}
    if (connectionLineStart.x !== null) {
      // Create new line object
      const newLine = {
        startPosition: { x: connectionLineStart.x, y: connectionLineStart.y },
        endPosition: { x: node.x + node.size / 2, y: node.y + node.size / 2 },
        fromNeuronIndex:null,
        toNeuronIndex: null,
      };
      // Add new line to renderedLines array
      if(node.type === "input"){
        setRenderedLines([...renderedLines, newLine]);
      }
       
      // Reset connectionLineStart
      setConnectionLineStart({ x: null, y: null });
      //console.log(renderedLines)
    } else {
      setConnectionLineStart({ x: node.x + node.size / 2, y: node.y + node.size / 2 });
    }
  };
  
  const styles = {
    workspace: {
      position:'absolute',
      top: -20,
      left: 0,
      bottom: -20,
      right: -20,
      backgroundColor: 'pink',
    },
  };

  return (
    <div style={styles.workspace} onClick={handleClick} onContextMenu={preventContextMenu}  >
       <Line startCoords={connectionLineStart} endCoords={{ x: mouseX+window.scrollX, y: mouseY +window.scrollY+15 }} color={"lightGreen"}  />
       {neurons.map((neuron, id) => {
  return (
    <Neuron
      id={id}
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
      reverseColor={() => reverseNeuronColor(event, neuron)}  
      reverseNodeColor={(node) => reverseNodeColor(node)}
      onRightClick={() => deleteNeuron(event,neuron)}
      renderNewLine={(node) => renderNewLine(node)}          
    />
  );
})}
        {renderedLines.map((renderedLines, index) => (
          <Line
            startCoords={renderedLines.startPosition}
            endCoords={renderedLines.endPosition}
            color={"green"}
            key={index}
          />
        ))}
    </div>
  );
}
     // position: 'relative',
     // height:"100vh",
    //  width:"100vw"
  

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

  
  // const [draggedNeuron, setDraggedNeuron] = useState(null);

     /* const distance = Math.sqrt(
        Math.pow(neuron.x + neuronSize / 2 - offsetX, 2) + Math.pow(neuron.y + neuronSize / 2 - offsetY, 2)
      );
      const maxDistance = neuronSize / 2;
      return distance > maxDistance;*/