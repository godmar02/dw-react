import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumbs} from '@material-ui/core';


function HomepageHeader() {

  return (
  <div>
    <p></p>
    <Breadcrumbs aria-label="breadcrumb">
      <Link to="/dw-react">Home</Link>
    </Breadcrumbs>
    <h1>Campaigns Homepage</h1>
  </div>);
}

export default HomepageHeader;
