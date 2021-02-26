import React from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

function AppHeader() {

  // custom hook to get the current pathname in React
  const location = useLocation().pathname;

  return (<div>
    <h2>Dungeon World Character Sheet</h2>
    <p>
      <i>v1.0.0-alpha by Godmar02</i>
    </p>
    <Link to="/dw-react">Home > </Link>
    <Link to={"/dw-react"}>Campaign > </Link>
    <Link to={"/dw-react"}>Character</Link>
  </div>
  );
}

export default AppHeader;
