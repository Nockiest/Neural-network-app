import * as React from 'react';
import Neuron from "./neurons/Neuron.js";
import { useState, createContext } from 'react';
import Line from "./components/LineComponent"
import { v4 as uuidv4 } from 'uuid';
 
export const WorkspaceContext = createContext(null);

export default function Workspace() {  
  const [neurons, setNeurons] = useState([]);
  const [connectionLineStart, setConnectionLineStart] = useState({x:null,y:null});
  const [renderedLines, setRenderedLines] = useState([]);
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);
  const neuronSize =60;

  const handleClick = (event) => {    
    console.log("click")
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
        const newNeurons = [...prevNeurons, { x, y, firedUp: 0,  id: uuidv4(), bias: 0, weight: 0, input:[], output: []}];
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

  const toggleNeuronActivation = (event, id) => {
 //   if (event.button !== 0) return; // Only handle left mouse button
    console.log(id)
    const updatedNeurons = neurons.map((n) => {
      if (n.id === id) {
        return { ...n, firedUp: n.firedUp === 0 ? 1 : 0 };
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
    if(node === undefined){return}
    
    const neuron = neurons.find((n) => n.id === node.parentIndex);
  if(node.type === "input"&& connectionLineStart.x === null){return}

    if (connectionLineStart.x !== null) {   

      const newLine = {
        startPosition: { x: connectionLineStart.x, y: connectionLineStart.y },
        endPosition: { x: node.parentCoords.x + node.x + node.size / 2, y: node.parentCoords.y + node.y+ node.size / 2 },
        endNeuronId: neuron.id,
        startNeuronId: connectionLineStart.startNeuronId,
        id: uuidv4()
      };
      
      // Add new line to renderedLines array
      if(node.type === "input"){
        setRenderedLines([...renderedLines, newLine]);      
         
              const updateNeuronConections = function(){
                const endNeuron = neurons.find(n => n.id === newLine.endNeuronId);
                endNeuron.input.push(newLine.id);
                
                const startNeuron = neurons.find(n => n.id === newLine.startNeuronId);
                 
                startNeuron.output.push(newLine.id);
              }
                updateNeuronConections()
              }
              
                
                // Reset connectionLineStart
                setConnectionLineStart({ x: null, y: null });
              } else {
                console.log({ x: node.parentCoords.x + node.size / 2+node.x, y: node.parentCoords.y + node.size / 2 +node.y, startNeuronId:neuron.id})
                setConnectionLineStart({ x: node.parentCoords.x + node.size / 2+node.x, y: node.parentCoords.y + node.size / 2 +node.y, startNeuronId:neuron.id});
            
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
              <div style={styles.workspace} onClick={handleClick} onContextMenu={preventContextMenu}>
                  
                {neurons.map((neuron) => {
                  return (
                    <WorkspaceContext.Provider value={{ neurons, setNeurons }} key={neuron.id}>
                      <Neuron
                        id={neuron.id}
                        size={neuronSize}
                        x={neuron.x}
                        y={neuron.y}
                        isFired={neuron.isFired}
                        output={neuron.output}
                        input={neuron.input}
                        bias={neuron.bias}
                        weight={neuron.weight} 
                        toggleNeuronActivation={toggleNeuronActivation}
                        onRightClick={(event) => deleteNeuron(event, neuron)}
                        renderNewLine={(node) => renderNewLine(node)}                     
                      />
                    </WorkspaceContext.Provider>
                  );
                })}
              {renderedLines.map((line, index) => {
                return (
                  <WorkspaceContext.Provider value={{ neurons, setNeurons }}>
                    <Line
                      startCoords={line.startPosition}
                      endCoords={line.endPosition}
                      color={"green"}
                      startNeuronId={line.startNeuronId}
                    
                    />
                  </WorkspaceContext.Provider>
                );
              })}

        <WorkspaceContext.Provider value={{ neurons, setNeurons }}>
         <Line startCoords={connectionLineStart} endCoords={{ x: mouseX + window.scrollX, y: mouseY + window.scrollY + 15 }} color={"lightGreen"} startNeuronId={connectionLineStart.startNeuronId} />
         </WorkspaceContext.Provider>
    </div>
  );
} 
/*style={{
                          position: 'absolute',
                          top: neuron.y,
                          left: neuron.x,
                          border: '0.05rem solid black',
                          backgroundColor: neuron.firedUp ? 'black' : 'white',
                        }}*/
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