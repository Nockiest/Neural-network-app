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


//nastav pozici sliderů rovnou v return statement neuronu
 
//oprace problém s toggle tlačítkem
// zamez zobrazování neuronu na druhém neuronu
// vytvoř dva různé slidery, jeden na bias a druhý na váhu