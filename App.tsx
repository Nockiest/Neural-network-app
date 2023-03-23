import * as React from 'react';
import './style.css';
import Toolbar from "./Toolbar.js"
import Workspace from "./workspace.js"
import { useState } from 'react';

import { useState } from 'react';

function App() {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const toggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {isToolbarVisible && (
        <div style={{ width: '200px', backgroundColor: 'lightgray', position:"fixed", zIndex: 1 }}>
          <Toolbar toggleVisible={toggleToolbar} />
        </div>
      )}
      <div style={{ flex: 1, position: 'relative', zIndex: 0 }}>
        <Workspace />
      </div>
      {!isToolbarVisible && (
        <div style={{ position: 'fixed', top: 0, right: 0 }}>
          <button onClick={toggleToolbar}>Show Toolbar</button>
        </div>
      )}
    </div>
  );
}



export default App;


//nastav pozici sliderů rovnou v return statement neuronu
// zobraz lištu nastavení nalevé straně, 
//oprace problém s toggle tlačítkem
// zamez zobrazování neuronu na druhém neuronu
// vytvoř dva různé slidery, jeden na bias a druhý na váhu