import * as React from 'react';
import Neuron from "./Neuron.js";
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
        <div style={{ width: '200px', backgroundColor: 'lightgray', position:"absolute" }}>
          <Toolbar toggleVisible={toggleToolbar} />
        </div>
      )}
      <div style={{ flex: 1 }}>
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

 
//zobraz neuron tam, kam klikneš
// nastav toolbaru výšku a šířku
// zajisti aby měli neuron správné odsazení
// dej jim absolutní pozici