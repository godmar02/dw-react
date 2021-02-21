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
    <div id="attvalues">
     <table style={{"width":"75%"}} id="sheetHeaderTable">
       <tbody><tr>
           <th style={{"width":"33%"}}>
             <label htmlFor="player">PLAYER</label>
           </th>
           <td>
             <select tabIndex={-1} id="player" />
           </td>
         </tr>
         <tr>
           <th style={{"width":"25%"}}>
             <label htmlFor="adventure">ADVENTURE</label>
           </th>
           <td>
             <select tabIndex={-1} id="adventure" />
           </td>
         </tr>
         <tr>
           <th style={{"width":"25%"}}><label htmlFor="charaName">CHARACTER</label></th>
           <td><input type="text" className="charaName" id="charaName" /></td>
         </tr>
       </tbody></table>
     <br />
     <table style={{"width":"100%"}} id="basicInfoTable">
       <tbody><tr>
           <th style={{"width":"25%"}}><label htmlFor="backstory">BACKSTORY</label></th>
           <td><textarea placeholder="Describe your character's backstory and anything else about your characters identity here" id="backstory" defaultValue={""} /></td>
         </tr>
         <tr>
           <th style={{"width":"25%"}}><label htmlFor="look">LOOK</label></th>
           <td><textarea placeholder="Describe your character's appearance here" id="look" defaultValue={""} /></td>
         </tr>
       </tbody></table>
     <br />
     <table style={{"width":"100%"}} id="additionalInfoTable">
       <tbody><tr>
           <th>
             <label style={{"width":"25%"}} htmlFor="dwClass">CLASS</label>
           </th>
           <td style={{"width":"25%"}}>
             <select tabIndex={-1} id="dwClass" />
           </td>
           <td style={{"width":"50%"}} />
         </tr>
         <tr>
           <th>
             <label htmlFor="race">RACE</label>
           </th>
           <td>
             <select tabIndex={-1} id="race" />
           </td>
           <td>
             <textarea className="grey" readOnly id="raceAttribute" defaultValue={""} />
           </td>
         </tr>
         <tr>
           <th>
             <label htmlFor="alignment">ALIGNMENT</label>
           </th>
           <td>
             <select tabIndex={-1} id="alignment" />
           </td>
           <td>
             <textarea className="grey" readOnly id="alignmentAttribute" defaultValue={""} />
           </td>
         </tr>
       </tbody></table>
     <br />
     <table id="basicAttributes">
       <tbody><tr>
           <th>
             <label htmlFor="level">LEVEL</label>
           </th>
           <td>
             <input type="number" min={1} className="shortfield" defaultValue={1} id="level" />
           </td>
           <th>
             <label htmlFor="xp">XP</label>
           </th>
           <td>
             <input type="number" min={0} className="shortfield" defaultValue={0} id="xp" />
           </td>
           <td>
             <input type="text" className="shortfield grey" readOnly id="maxXp" />
           </td>
         </tr>
       </tbody></table>
     <br />
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
               <option>Unafflicted</option>
               <option>Weak</option>
             </select>
           </td>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="dexAffliction">
               <option>Unafflicted</option>
               <option>Shaky</option>
             </select>
           </td>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="conAffliction">
               <option>Unafflicted</option>
               <option>Sick</option>
             </select>
           </td>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="intAffliction">
               <option>Unafflicted</option>
               <option>Stunned</option>
             </select>
           </td>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="wisAffliction">
               <option>Unafflicted</option>
               <option>Confused</option>
             </select>
           </td>
           <td>
             <select tabIndex={-1} className="abilityAffliction" id="chaAffliction">
               <option>Unafflicted</option>
               <option>Scarred</option>
             </select>
           </td>
         </tr>
       </tbody>
     </table>
     <br />
     <table id="damageArmourFundsTable">
       <thead>
         <tr>
           <th><label htmlFor="damage">DAMAGE</label></th>
           <th><label htmlFor="armour">ARMOUR</label></th>
           <th colSpan={2}><label htmlFor="hp">HP</label></th>
           <th><label htmlFor="funds">FUNDS</label></th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>
             <input type="text" className="shortfield grey" readOnly id="damage" />
           </td>
           <td>
             <input type="number" min={0} className="shortfield" defaultValue={0} id="armour" />
           </td>
           <td>
             <input type="number" min={0} className="shortfield" id="hp" />
           </td>
           <td>
             <input type="text" className="shortfield grey" readOnly id="maxHp" />
           </td>
           <td><input type="number" className="shortfield" min={0} defaultValue={0} id="funds" /></td>
         </tr>
       </tbody>
     </table>
     <br />
     <table style={{"width":"100%"}} id="bondsTable">
       <thead>
         <tr>
           <th style={{"width":"100%"}}><label>BONDS</label></th>
           <td>
             <button type="button" className="addRow" id="addBond">+</button>
           </td>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td><textarea placeholder="Add 2-3 bonds here" id="bond0" defaultValue={""} /></td>
           <td><button type="button" className="deleteRow" id="deleteBond0" /></td>
         </tr>
       </tbody>
       <tfoot />
     </table>
     <br />
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
         <tr>
           <td>
             <textarea placeholder="Add any items and descriptions here" id="item0" defaultValue={""} />
           </td>
           <td colSpan={2}><input type="number" min={0} id="itemWeight0" /></td>
           <td><button type="button" className="deleteRow" id="deleteItem0" /></td>
         </tr>
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
     <br />
     <table style={{"width":"100%"}} id="classFeaturesTable">
       <thead>
         <tr>
           <th colSpan={2} style={{"width":"100%"}}><label>CLASS FEATURES</label></th>
           <td>
             <button type="button" className="addRow" id="addClassFeature">+</button>
           </td>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>
             <input type="checkbox" className="checkbox" id="classFeatureCheckbox0" />
           </td>
           <td>
             <textarea placeholder="Add any Class Features here (e.g. Spell Lists, Poison Recipes, Druid Balance, Paladin Quests or anything else!)" id="classFeature0" defaultValue={""} />
           </td>
           <td>
             <button type="button" className="deleteRow" id="deleteClassFeature0" />
           </td>
         </tr>
       </tbody>
       <tfoot />
     </table>
     <br />
   </div>
    );
}

export default CharacterSheet;
