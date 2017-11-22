var enemyTypes = {
  "Monster": {
    "name": "Monster",
    "hp": 10,
    "combatActions": ["Bash", "Roar", "Lazerdazer"],
    "stats": {
      "katt": 1,
      "kdef": 1,
      "eatt": 1,
      "edef": 1,
      "speed": 1,
    }
  }
};

var combatActions = {
  "Bash": {
    "type": "kinetic",
    "pow": 1,
    "acc": 100,
    "effect": ""
  },
  "Roar": {
    "type": "kinetic",
    "pow": 0,
    "acc": 100,
    "effect": ""
  },
  "Lazerdazer": {
    "type": "energy",
    "pow": 2,
    "acc": 100,
    "effect": ""
  },
  "Fireball": {
    "type": "energy",
    "pow": 3,
    "acc": 100,
    "effect": ""
  }
};

var encounters = {
  
};

module.exports = {
  randomEncounter: function(client, data){
    client.gameState = 'combat';
    console.log('lets do something with this randomEncounter');
    var encounter = {
      "encounterId": (new Date()).getTime(),
      "enemies": [{
        "name": enemyTypes["Monster"].name,
        "hp": [enemyTypes["Monster"].hp, enemyTypes["Monster"].hp]
      }],
      "combatActions": ["Bash", "Fireball"]
    }
    
    
    
    encounters[encounter.encounterId] = encounter;
    
    var dataToEmit = {
      "gameState": "combat",
      "encounter": encounter
    };
    console.log(dataToEmit);
    return dataToEmit;
  }
}