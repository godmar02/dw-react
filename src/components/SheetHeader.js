import React from 'react';

function SheetHeader() {

  return (
    <table style={{
        "width" : "75%"
      }} id="sheetHeaderTable">
      <tbody>
        <tr>
          <th style={{
              "width" : "33%"
            }}>
            <label htmlFor="player">PLAYER</label>
          </th>
          <td>
            <select tabIndex={-1} id="player"/>
          </td>
        </tr>
        <tr>
          <th style={{
              "width" : "25%"
            }}>
            <label htmlFor="adventure">ADVENTURE</label>
          </th>
          <td>
            <select tabIndex={-1} id="adventure"/>
          </td>
        </tr>
      </tbody>
    </table>
    );
}

export default SheetHeader;
