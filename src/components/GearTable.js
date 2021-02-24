import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';
import {classDetails} from '../data/classDetails';

function GearTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  const dwc = character.dwClass;

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
          <td><input type="text" className="grey" readOnly id="load" /></td>
          <td>
            { (character.dwClass && character.abilities)
            ? <input type="text" className="shortfield grey" readOnly="readOnly" value={"/ " + (classDetails.[dwc].baseLoad + parseInt(character.abilities.find(x => x.category === 'STR').score ,10)) || ''} />
            : <input type="text" className="shortfield grey" readOnly="readOnly" value="" />
            }
          </td>
          <td />
        </tr>
      </tfoot>
    </table>
    );
}

export default GearTable;
