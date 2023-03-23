import * as React from 'react';

import { useState } from 'react';

function Toolbar(props) {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const toggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible);
    props.toggleVisible();
  };

  return (
    <div id="toolbar" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
        {isToolbarVisible && (
          <button onClick={toggleToolbar}>Hide Toolbar</button>
        )}
        {!isToolbarVisible && (
          <button onClick={toggleToolbar}>Hide</button>
        )}
      </div>
      <div style={{ display: isToolbarVisible ? 'block' : 'none' }}>
        <p>Save</p>
        <p>Delete</p>
        <p>New</p>
        <p>Load a network</p>
        <p>scale</p>
      </div>
     
    </div>
  );
}

export default Toolbar;
