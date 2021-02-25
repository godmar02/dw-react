import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';
import {classDetails} from '../data/classDetails';

function GearTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);
  const dwc = character.dwClass;

  // Total Load
  const totalLoad = () => {
    if (character.gear) {
      return (character.gear.reduce((totalLoad,data) => totalLoad + parseInt((data.weight || 0),10) ,0));
    } else {
      return ('');
    }
  };

  // Max Load
  const maxLoad = () => {
    let str = character.abilities.find(x => x.category === 'STR');
    if (character.dwClass && str.score && str.affliction) {
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
    let newItems = [...character.gear]; // copying the old array
    newItems[index] = {...character.gear[index], item: e.target.value}; // replace value
    setCharacter(character => ({...character, gear: newItems})); // set array back
  }

  const updateItemWeight = index => e => {
    let newItems = [...character.gear]; // copying the old array
    newItems[index] = {...character.gear[index], weight: e.target.value}; // replace value
    setCharacter(character => ({...character, gear: newItems})); // set array back
  }

  // Delete rows in the table
  const deleteItemRow = index => {
    const newItems = [...character.gear]; // copying the old array
    if (character.gear.length !== 1) { //don't delete last row
      newItems.splice(index, 1); // remove item from array
      setCharacter(character => ({...character, gear: newItems})); // set array back
    } else {
      alert('Cannot delete final row');
    }
  }

  // Add rows in the table
  const addItemRow = () => {
    const newItems = [...character.gear, {item: "", weight: ""}]; // copying the old array and adding blank item
    setCharacter(character => ({...character, gear: newItems})); // set array back
  }
  //,

  return (
    <table style={{"width":"100%"}} id="gearTable">
      <thead>
        <tr>
          <th colSpan={4}><label>GEAR</label></th>
        </tr>
        <tr>
          <th style={{"width":"100%"}}><label>ITEM</label></th>
          <th colSpan={2}><label>WEIGHT</label></th>
          <td>
            <button
              type="button"
              className="addRow"
              onClick={() => addItemRow()}>
              +
            </button>
          </td>
        </tr>
      </thead>
      <tbody>
        {
         character.gear && character.gear.map((gear,index) => {
         return (
           <tr key={index}>
               <td>
                 <textarea
                   placeholder="Add any items and descriptions here"
                   value={gear.item}
                   onChange={updateItem(index)}/>
               </td>
               <td colSpan={2}>
                 <input
                   type="number"
                   min={0}
                   value={gear.weight}
                   onChange={updateItemWeight(index)}/>
               </td>
               <td>
                 <button
                   type="button"
                   className="deleteRow"
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
            <input type="number" className="shortfield grey" readOnly value={totalLoad()} />
          </td>
          <td>
            <input type="text" className="shortfield grey" readOnly="readOnly" value={maxLoad()} />
          </td>
          <td />
        </tr>
      </tfoot>
    </table>
    );
}

export default GearTable;
