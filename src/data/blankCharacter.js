// Setting state for character manually
useEffect(() => {
  setCharacter({
    abilities: [
      {category: "STR", score: "", affliction: "Unafflicted"},
      {category: "DEX", score: "", affliction: "Unafflicted"},
      {category: "CON", score: "", affliction: "Unafflicted"},
      {category: "INT", score: "", affliction: "Unafflicted"},
      {category: "WIS", score: "", affliction: "Unafflicted"},
      {category: "CHA", score: "", affliction: "Unafflicted"}
    ],
    alignment: "null",
    armour: "",
    backstory: "",
    bonds: [
      {bond: ""},
    ],
    classFeatures: [
      {feature: "", checkbox: false}
    ],
    dwClass: "null",
    fullName: "",
    funds: "",
    hp: "",
    items: [
      {item: "", weight: ""},
    ],
    level: "",
    look: "",
    owner: "",
    race: "",
    xp: ""
  })
}, [setCharacter]);
