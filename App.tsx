import * as React from 'react';
import './style.css';
import Toolbar from "./Toolbar.js"
import Workspace from "./workspace.js"
import { useState } from 'react';

function App() {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const toggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      e.preventDefault();
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "row", height: "100vh" }}
      onMouseDown={handleMouseDown}
    >
      {
        <div style={{backgroundColor: 'lightgray', position:"fixed", zIndex: 1 }}>
          <Toolbar toggleVisible={toggleToolbar}
                   isVisible={isToolbarVisible}
                    />
        </div>
      }
      <div style={{ flex: 1, position: 'relative' }}>
        <Workspace />
      </div>
    </div>
  );
}



export default App;
 
// měň tuto barvu na základě pravidle tvé simulace
// stylizuj ji podle hodnoty
//oprav, že se po dragnutí zobrazí nový neuron
// změň koordináty posunutého neuronu