// Setting state for character manually
useEffect(() => {
  setCharacter({
    abilities: [
      {category: "STR", score: 1, affliction: "Weak"},
      {category: "DEX", score: 1, affliction: "Unafflicted"},
      {category: "CON", score: 1, affliction: "Unafflicted"},
      {category: "INT", score: 1, affliction: "Unafflicted"},
      {category: "WIS", score: 1, affliction: "Unafflicted"},
      {category: "CHA", score: 1, affliction: "Unafflicted"}
    ],
    alignment: "Good",
    armour: 3,
    backstory: "sad backstory",
    bonds: [
      {bond: "bond0"},
      {bond: "bond1"}
    ],
    charaFullName: "Laneth the Elder",
    classFeatures: [
      {feature: "classFeature0", checkbox: true},
      {feature: "classFeature1", checkbox: false},
    ],
    dwClass: "Paladin",
    funds: 10,
    hp:2,
    items: [
      {item: "item0", weight: 1},
      {item: "item1", weight: 2}
    ],
    level: 2,
    look: "scraggly",
    owner: "markwgodden@gmail.com",
    race: "Elf",
    xp: 2
  })
}, [setCharacter]);
