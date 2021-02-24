import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function GearTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

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
            <button type="button" className="addRow" id="addItem">+</button>
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
                   className="deleteRow"/>
               </td>
           </tr>)
        })
      }
      </tbody>
      <tfoot>
        <tr>
          <th><label htmlFor="load">LOAD</label></th>
          <td><input type="text" className="grey" readOnly id="load" /></td>
          <td><input type="text" className="grey" readOnly id="maxLoad" /></td>
          <td />
        </tr>
      </tfoot>
    </table>
    );
}

export default GearTable;
