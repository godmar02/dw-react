import React from 'react';
import '../index.css';

function AppHeader() {
  return (
      <div>
        <h2>Dungeon World Character Sheet</h2>
        <br />
        <span style={{"display":"inline-block"}}>
          <i>v1.0.0-alpha by Godmar02</i>
        </span>
        <br />
      </div>
    );
}

export default AppHeader;
