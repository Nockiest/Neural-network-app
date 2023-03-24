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

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {
        <div style={{ width: '200px', backgroundColor: 'lightgray', position:"fixed", zIndex: 1 }}>
          <Toolbar toggleVisible={toggleToolbar}
                   isVisible={isToolbarVisible} />
        </div>
      }
      <div style={{ flex: 1, position: 'relative', zIndex: 0 }}>
        <Workspace />
      </div>
    </div>
  );
}



export default App;

// vytvoř dva různé slidery, jeden na bias a druhý na váhu
// nastylizuj slidery
// zprovozni ničení neuronů
// zprovozni pohyb neuronů
//nech neurony se objevit blíž k sobě