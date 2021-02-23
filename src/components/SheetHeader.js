import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function SheetHeader() {
  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <div>
      <div>Adventure: {character.charaName} ({character.owner})</div>
    </div>);
}

export default SheetHeader;
