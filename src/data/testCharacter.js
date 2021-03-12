// Setting state for character manually
useEffect(() => {
  setCharacter({
    abilities: [
      { category: 'STR', score: 1, affliction: 'Weak' },
      { category: 'DEX', score: 1, affliction: 'Unafflicted' },
      { category: 'CON', score: 1, affliction: 'Unafflicted' },
      { category: 'INT', score: 1, affliction: 'Unafflicted' },
      { category: 'WIS', score: 1, affliction: 'Unafflicted' },
      { category: 'CHA', score: 1, affliction: 'Unafflicted' },
    ],
    alignment: 'Good',
    armour: 3,
    backstory: 'sad backstory',
    bonds: [{ bond: 'bond0' }, { bond: 'bond1' }],
    class_features: [
      { feature: 'classFeature0', checkbox: true },
      { feature: 'classFeature1', checkbox: false },
    ],
    dw_class: 'Paladin',
    full_name: 'Lanethe the Elder',
    funds: 10,
    hp: 2,
    items: [
      {
        name: 'Adventuring Gear',
        description:
          'Adventuring gear is a collection of useful mundane items such as chalk, poles, spikes, ropes, etc. When you rummage through your adventuring gear for some useful mundane item, you find what you need and mark off a use.',
        type: 'Item',
        range: 'Near',
        cost: '20',
        weight: '1',
        uses: '5',
        tags: [{ key: '1', tag: 'tag1' }],
      },
    ],
    level: 2,
    look: 'scraggly',
    owner: 'markwgodden@gmail.com',
    race: 'Elf',
    race_attribute: 'test',
    xp: 2,
  });
}, [setCharacter]);
