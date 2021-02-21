import React, { useContext, useEffect } from 'react';
import GlobalState from './contexts/GlobalState';
import '../index.css';

function CharacterSheet() {
  const [state, setState] = useContext(GlobalState);
  useEffect(() => {
    setState(state => ({...state, address: "dsfsdfsdfsdf"}))
  }, []);

  console.log(state);

  return (
     <table style={{"width":"100%"}} id="abilitiesTable">
       <thead>
         <tr>
           <th><label htmlFor="str">STR</label></th>
           <th><label htmlFor="dex">DEX</label></th>
           <th><label htmlFor="con">CON</label></th>
           <th><label htmlFor="int">INT</label></th>
           <th><label htmlFor="wis">WIS</label></th>
           <th><label htmlFor="cha">CHA</label></th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>
             <input type="number" min={1} max={18} className="ability" id="str" /></td>
           <td>
             <input type="number" min={1} max={18} className="ability" id="dex" /></td>
           <td>
             <input type="number" min={1} max={18} className="ability" id="con" /></td>
           <td>
             <input type="number" min={1} max={18} className="ability" id="int" /></td>
           <td>
             <input type="number" min={1} max={18} className="ability" id="wis" /></td>
           <td>
             <input type="number" min={1} max={18} className="ability" id="cha" />
           </td>
         </tr>
         <tr>
           <td>
             <input type="text" className="grey tallfield" readOnly id="strModifier" />
           </td>
           <td>
             <input type="text" className="grey tallfield" readOnly id="dexModifier" />
           </td>
           <td>
             <input type="text" className="grey tallfield" readOnly id="conModifier" />
           </td>
           <td>
             <input type="text" className="grey tallfield" readOnly id="intModifier" />
           </td>
           <td>
             <input type="text" className="grey tallfield" readOnly id="wisModifier" />
           </td>
           <td>
             <input type="text" className="grey tallfield" readOnly id="chaModifier" />
           </td>
         </tr>
         <tr>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="strAffliction">
             </select>
           </td>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="dexAffliction">
             </select>
           </td>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="conAffliction">
             </select>
           </td>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="intAffliction">
             </select>
           </td>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="wisAffliction">
             </select>
           </td>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="chaAffliction">
             </select>
           </td>
         </tr>
       </tbody>
     </table>
    );
}

export default CharacterSheet;
