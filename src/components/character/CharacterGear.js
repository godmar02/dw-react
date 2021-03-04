import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {classDetails} from 'data/classDetails';
import {Add,Delete} from '@material-ui/icons';
import {Chip,IconButton,FormControl,Paper,Select, MenuItem,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

export default function CharacterGear() {

  const classes = useStyles();
  const {character, setCharacter}= useContext(CharacterState);
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
  const handleCharacterChange = (event, index) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newItems = [...character.items]; // copying the old array
    newItems[index] = {...character.items[index], [name]: value}; // replace value
    setCharacter(character => ({...character, items: newItems})); // set array back
  };

  //Delete Item Tags
  const deleteTag = (index, key) => () => {
    console.log("index:", index)
    console.log("key:", key)
    let newItems = [...character.items]; // copying the old items array
    console.log("newItems",newItems)
    let newItem = newItems[index]; // copying the specific item
    console.log("newItem",newItem)
    let newItemTags = [...newItem.tags]; // copying the old item tags
    console.log("newItemTags",newItemTags)
    newItemTags.filter((tags) => tags.key !== key); // filtering the old item tags to remove tag
    console.log("newItemTags", newItemTags)
    newItem = {...newItem, tags: newItemTags}; // re-setting Item Tags for Item
    console.log("newItem",newItem)
    newItems[index] = newItem; // re-setting Item
    console.log("newItems",newItems)
    //setCharacter(character => ({...character, items: newItems})); // set array back
  };

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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">NAME</TableCell>
            <TableCell align="center">TYPE</TableCell>
            <TableCell align="center" colSpan="4">DESCRIPTION</TableCell>
            <TableCell align="center">RANGE</TableCell>
            <TableCell align="center">COST</TableCell>
            <TableCell align="center">USES</TableCell>
            <TableCell align="center">TAGS</TableCell>
            <TableCell align="center" colSpan="2">WEIGHT</TableCell>
            <TableCell>
              <IconButton aria-label="add" onClick={() => addItemRow()}>
                <Add/>
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
           character.items && character.items.map((items,index) => {
           return (
             <TableRow key={index}>
                 <TableCell>
                   <TextField
                     fullWidth
                     variant="outlined"
                     aria-label="empty textarea"
                     placeholder="Item name"
                     value={items.name}
                     name="name"
                     onChange={ (event) => handleCharacterChange(event,index)}/>
                 </TableCell>
                 <TableCell align="center">
                   <FormControl variant="outlined" className={classes.formControl}>
                   <Select tabIndex={-1} value={items.type} name="type" onChange={ (event) => handleCharacterChange(event,index)}>
                     <MenuItem disabled="true" value="null" hidden="hidden"/>
                     <MenuItem value="Item">Item</MenuItem>
                     <MenuItem value="Poison">Poison</MenuItem>
                     <MenuItem value="Weapon">Weapon</MenuItem>
                   </Select>
                   </FormControl>
                 </TableCell>
                 <TableCell colSpan="4">
                   <TextField
                     multiline
                     fullWidth
                     variant="outlined"
                     aria-label="empty textarea"
                     placeholder="Item description"
                     value={items.description}
                     name="description"
                     onChange={(event) => handleCharacterChange(event,index)}/>
                 </TableCell>
                 <TableCell align="center">
                   <FormControl variant="outlined" className={classes.formControl}>
                   <Select tabIndex={-1} value={items.range} name="range" onChange={(event) => handleCharacterChange(event,index)}>
                     <MenuItem value="null" hidden="hidden"/>
                     <MenuItem value="Close">Close</MenuItem>
                     <MenuItem value="Hand">Hand</MenuItem>
                     <MenuItem value="Far">Far</MenuItem>
                     <MenuItem value="Near">Near</MenuItem>
                     <MenuItem value="Near & Far">Near & Far</MenuItem>
                     <MenuItem value="Reach">Reach</MenuItem>
                     <MenuItem value="Reach & Near">Reach & Near</MenuItem>
                   </Select>
                   </FormControl>
               </TableCell>
                <TableCell align="center">
                  <TextField
                   type="number"
                   fullWidth
                   variant="outlined"
                   min={0}
                   name="cost"
                   value={items.cost}
                   onChange={(event) => handleCharacterChange(event,index)}/>
               </TableCell>
                 <TableCell align="center">
                   <TextField
                   type="number"
                   fullWidth
                   variant="outlined"
                   min={0}
                   name="uses"
                   value={items.uses}
                   onChange={(event) => handleCharacterChange(event,index)}/>
               </TableCell>
                 <TableCell align="center">
                   <div className={classes.root}>
                       {items.tags.map((data) => {
                         return (
                           <li key={data.key}>
                             <Chip
                               size="small"
                               color="primary"
                               label={data.tag}
                               onDelete={deleteTag(index,data.key)}
                               className={classes.chip}
                             />
                           </li>
                         );
                       })}
                     </div>
                   </TableCell>
                 <TableCell colSpan="2">
                   <TextField
                     type="number"
                     fullWidth
                     variant="outlined"
                     min={0}
                     value={items.weight}
                     name="weight"
                     onChange={(event) => handleCharacterChange(event,index)}/>
                 </TableCell>
                 <TableCell>
                   <IconButton aria-label="delete" onClick={() => deleteItemRow(index)}>
                       <Delete/>
                    </IconButton>
                 </TableCell>
             </TableRow>)
          })}
          <TableRow>
            <TableCell align="right" colSpan="10">LOAD</TableCell>
            <TableCell>
              <TextField
                type="number"
                fullWidth
                variant="outlined"
                name="totalLoad"
                InputProps={{
                  readOnly: true,
                }}
                value={totalLoad()} />
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                variant="outlined"
                name="maxLoad"
                InputProps={{
                  readOnly: true,
                }}
                value={maxLoad()} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>);
}
