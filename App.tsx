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
        <div style={{backgroundColor: 'lightgray', position:"fixed", zIndex: 1 }}>
          <Toolbar toggleVisible={toggleToolbar}
                   isVisible={isToolbarVisible}
                    />
        </div>
      }
      <div style={{ flex: 1, position: 'relative', zIndex: 0 }}>
        <Workspace />
      </div>
    </div>
  );
}



export default App;
 
//zabraň propojení příjmu a výstupu stejného neuronu a příjmu a příjmu a výstup a výstupu jiných neuronů
// stylizuj ji podle hodnoty
//oprav, že se po dragnutí zobrazí nový neuron
// změň koordináty posunutého neuronu