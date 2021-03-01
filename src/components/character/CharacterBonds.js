import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {Add,Delete} from '@material-ui/icons';
import {IconButton,TextField} from '@material-ui/core';

function CharacterBonds() {

  // State Variables
  const [character, setCharacter] = useContext(CharacterState);

  // State manipulation
  const updateBond = index => e => {
    let newBonds = [...character.bonds]; // copying the old array
    newBonds[index] = {...character.bonds[index], bond: e.target.value}; // replace value
    setCharacter(character => ({...character, bonds: newBonds})); // set array back
  }

  // Delete rows in the table
  const deleteBondRow = index => {
    const newBonds = [...character.bonds]; // copying the old array
    if (character.bonds.length !== 1) { //don't delete last row
      newBonds.splice(index, 1); // remove item from array
      setCharacter(character => ({...character, bonds: newBonds})); // set array back
    } else {
      alert('Cannot delete final row');
    }
  }

  // Add rows in the table
  const addBondsRow = () => {
    const newBonds = [...character.bonds, {bond: ""}]; // copying the old array and adding blank item
    setCharacter(character => ({...character, bonds: newBonds})); // set array back
  }

  return (
    <table style={{"width" : "100%"}}>
      <thead>
        <tr>
          <th style={{"width" : "100%"}}>
            <label>BONDS</label>
          </th>
          <td>
            <IconButton aria-label="add">
            <Add onClick={() => addBondsRow()}/>
            </IconButton>
          </td>
        </tr>
      </thead>
      <tbody>
        {
         character.bonds && character.bonds.map((bonds,index) => {
         return (
           <tr key={index}>
               <td>
                 <TextField
                   multiline
                   fullWidth
                   variant="outlined"
                   aria-label="empty textarea"
                   placeholder="Add 2-3 bonds here"
                   value={bonds.bond}
                   name={"bond" + index}
                   onChange={updateBond(index)}
                   />
               </td>
               <td>
                 <IconButton aria-label="delete">
                   <Delete
                   onClick={() => deleteBondRow(index)}/>
                 </IconButton>
               </td>
           </tr>)
        })
      }
      </tbody>
      <tfoot/>
    </table>
    );
}

export default CharacterBonds;
