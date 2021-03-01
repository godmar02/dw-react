  function singleRoll(sides) {
    var roll = Math.floor(Math.random() * sides) + 1;
    return roll;
  }

  function rollDice(sides, number) {
    var total = 0;
    for (var i = 1; i == number; i++) {
      total = total + singleRoll(sides);
    }
    return total;
  }

  function validateLoad() {
    var load = parseInt($("#load").val(), 10);
    var maxLoad = parseInt($("#maxLoad").val().replace("/ ", ""), 10);
    if (load && maxLoad && load > maxLoad) {
      alert("validateLoad() - " + load + " weight exceeds maximum permitted value of " + maxLoad);
      loadErrors = true;
    } else {
      loadErrors = false;
    }
    if (debug == true) {
      console.info("validateLoad() - loadErrors:", loadErrors);
    }
  }

  function validateAbilityScore() {
    var str = parseInt($("#str").val(), 10);
    var dex = parseInt($("#dex").val(), 10);
    var con = parseInt($("#con").val(), 10);
    var int = parseInt($("#int").val(), 10);
    var wis = parseInt($("#wis").val(), 10);
    var cha = parseInt($("#cha").val(), 10);
    var maxAbility = 73; //16, 15, 13, 12, 9, 8
    var totalAbility = str + dex + con + int + wis + cha;

    if (debug == true) {
      console.info("validateAbilityScore() - str:", str);
      console.info("validateAbilityScore() - dex:", dex);
      console.info("validateAbilityScore() - con:", con);
      console.info("validateAbilityScore() - int:", int);
      console.info("validateAbilityScore() - wis:", wis);
      console.info("validateAbilityScore() - cha:", cha);
      console.info("validateAbilityScore() - maxAbility:", maxAbility);
      console.info("validateAbilityScore() - totalAbility:", totalAbility);
    }

    if (str && dex && con && int && wis && cha && totalAbility != maxAbility) {
      alert("validateAbilityScore() - " + totalAbility + " Ability Score does not match total permitted value of " + maxAbility + "\n" + "Suggested values are 16, 15, 13, 12, 9, 8");
      abilityErrors = true;
    } else {
      abilityErrors = false;
    }

    if (debug == true) {
      console.info("validateAbilityScore() - abilityErrors:", abilityErrors);
    }
  }

  function validateXp() {
    var xp = $("#xp").val();
    var maxXp = parseInt($("#maxXp").val().replace("/ ", ""), 10);
    if (xp && maxXp && xp > maxXp) {
      alert("validateXp() - " + xp + "xp exceeds maximum permitted value of " + maxXp);
      $("#xp").val(maxXp);
    }
  }

  function validateHp() {
    var hp = $("#hp").val();
    var maxHp = parseInt($("#maxHp").val().replace("/ ", ""), 10);
    if (hp && maxHp && hp > maxHp) {
      alert("validateHp() - " + hp + "hp exceeds maximum permitted value of " + maxHp);
      $("#hp").val(maxHp);
    }
  }

  function clearRows(tableID) {
    // delete all rows but last in a table
    var tableBody = $("#" + tableID + " tbody");
    var bodyRows = tableBody.children("tr");
    var bodyRowsCount = bodyRows.length;
    var templateRow = bodyRows.get(0);
    var newRowColCount = templateRow.cells.length;
    var newRowID = bodyRowsCount;

    for (var i = 0; i < bodyRowsCount - 1; i++) {
      deleteRow(tableID, 0);
    }
  }
