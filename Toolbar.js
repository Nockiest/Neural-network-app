import * as React from 'react';
import { useState } from 'react';

function Toolbar(props) {
  const { isVisible, toggleVisible } = props;

  const toggleToolbar = () => {
    toggleVisible();
  };

  return (
    <div
      id="toolbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isVisible ? '20%' : '5%', // smaller when retracted
        bottom:  0 , // fixed the typo here
        backgroundColor: 'darkgrey',
        padding: isVisible ? '20px' : '0 20px', // no padding when retracted
        transition: 'width 0.3s, padding 0.3s', // animate the transition
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <button onClick={toggleToolbar}>
          {isVisible ? 'Hide Toolbar' : 'Show Toolbar'}
        </button>
      </div>
      {isVisible && (
        <div>
          <p style={{ marginBottom: '1.5rem' }}>Save</p>
          <p style={{ marginBottom: '1.5rem' }}>Delete</p>
          <p style={{ marginBottom: '1.5rem' }}>New</p>
          <p style={{ marginBottom: '1.5rem' }}>Load a network</p>
          <p style={{ marginBottom: '1.5rem' }}>scale</p>
        </div>
      )}
    </div>
  );
}



export default Toolbar;
