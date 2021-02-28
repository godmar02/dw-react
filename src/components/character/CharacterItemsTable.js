import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {classDetails} from 'data/classDetails';
import { Add, Delete } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';

function CharacterItemsTable() {

  // State Variables
  const [character, setCharacter] = useContext(CharacterState);
  const dwc = character.dwClass;

  // Total Load
  const totalLoad = () => {
    if (character.items) {
      return (character.items.reduce((totalLoad,data) => totalLoad + parseInt((data.weight || 0),10) ,0));
    } else {
      return ('');
    }
  };

  // Max Load
  const maxLoad = () => {

    if (character.dwClass && character.abilities.find(x => x.category === 'STR').score && character.abilities.find(x => x.category === 'STR').affliction) {
      let str = character.abilities.find(x => x.category === 'STR');
      let baseModifier;
      let abilityAffliction = str.affliction;
      let abilityScore = parseInt(str.score,10);
      let afflicted;

      if ([1, 2, 3].indexOf(abilityScore) > -1) {
        baseModifier = -3;
      } else if ([4, 5].indexOf(abilityScore) > -1) {
        baseModifier = -2;
      } else if ([6, 7, 8].indexOf(abilityScore) > -1) {
        baseModifier = -1;
      } else if ([9, 10, 11, 12].indexOf(abilityScore) > -1) {
        baseModifier = 0;
      } else if ([13, 14, 15].indexOf(abilityScore) > -1) {
        baseModifier = 1;
      } else if ([16, 17].indexOf(abilityScore) > -1) {
        baseModifier = 2;
      } else if (abilityScore === 18) {
        baseModifier = 3;
      }

      /*-1 if afflicted*/
      if (abilityAffliction === "Unafflicted") {
        afflicted = 0;
      } else {
        afflicted = 1;
      }

      let modifier = (baseModifier - afflicted);

      return ("/ " + (classDetails.[dwc].baseLoad + modifier));
    } else {
      return ('');
    }
  };

  // State manipulation
  const updateItem = index => e => {
    let newItems = [...character.items]; // copying the old array
    newItems[index] = {...character.items[index], item: e.target.value}; // replace value
    setCharacter(character => ({...character, items: newItems})); // set array back
  }

  const updateItemWeight = index => e => {
    let newItems = [...character.items]; // copying the old array
    newItems[index] = {...character.items[index], weight: e.target.value}; // replace value
    setCharacter(character => ({...character, items: newItems})); // set array back
  }

  // Delete rows in the table
  const deleteItemRow = index => {
    const newItems = [...character.items]; // copying the old array
    if (character.items.length !== 1) { //don't delete last row
      newItems.splice(index, 1); // remove item from array
      setCharacter(character => ({...character, items: newItems})); // set array back
    } else {
      alert('Cannot delete final row');
    }
  }

  // Add rows in the table
  const addItemRow = () => {
    const newItems = [...character.items, {item: "", weight: ""}]; // copying the old array and adding blank item
    setCharacter(character => ({...character, items: newItems})); // set array back
  }
  //,

  return (
    <table style={{"width":"100%"}} id="itemsTable">
      <thead>
        <tr>
          <th colSpan={4}><label>GEAR</label></th>
        </tr>
        <tr>
          <th style={{"width":"100%"}}><label>ITEM</label></th>
          <th colSpan={2}><label>WEIGHT</label></th>
          <td>
            <Add
              onClick={() => addItemRow()}
            />
          </td>
        </tr>
      </thead>
      <tbody>
        {
         character.items && character.items.map((items,index) => {
         return (
           <tr key={index}>
               <td>
                 <TextField
                   multiline
                   fullWidth
                   variant="outlined"
                   aria-label="empty textarea"
                   placeholder="Add any items and descriptions here"
                   value={items.item}
                   name={"item" + index}
                   onChange={updateItem(index)}/>
               </td>
               <td colSpan={2}>
                 <TextField
                   type="number"
                   variant="outlined"
                   min={0}
                   value={items.weight}
                   name={"itemWeight" + index}
                   onChange={updateItemWeight(index)}/>
               </td>
               <td>
                 <Delete
                   onClick={() => deleteItemRow(index)}/>
               </td>
           </tr>)
        })
      }
      </tbody>
      <tfoot>
        <tr>
          <th><label htmlFor="load">LOAD</label></th>
          <td>
            <TextField
              type="number"
              variant="outlined"
              className="shortfield grey"
              name="totalLoad"
              InputProps={{
                readOnly: true,
              }}
              value={totalLoad()} />
          </td>
          <td>
            <TextField
              variant="outlined"
              className="shortfield grey"
              name="maxLoad"
              InputProps={{
                readOnly: true,
              }}
              value={maxLoad()} />
          </td>
          <td />
        </tr>
      </tfoot>
    </table>
    );
}

export default CharacterItemsTable;
