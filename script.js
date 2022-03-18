//Jogo em si
var field = ['❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '💍']

let player = 1
let place = 1
let emoji = "0"

function Walk(value) {
  if(player === 2) {
    emoji = "🤖"
  } else {
    emoji = "😃"
  }

  if(value === 1) {
    if(place === 1) {
      field[0] = emoji
    }
    if(place === 2) {
      field[1] = emoji
    }
    if(place === 3) {
      field[2] = emoji
    }
    if(place === 4) {
      field[3] = emoji
    }
    if(place === 5) {
      field[4] = emoji
    }
    if(place === 6) {
      field[5] = emoji
    }
    if(place === 7) {
      field[6] = emoji
    }
    if(place === 8) {
      field[7] = emoji
    }
    if(place === 9) {
      field[8] = emoji
    }
    if(place === 10) {
      field[9] = emoji
    }
    if(place === 11) {
      field[10] = emoji
    }
    if(place === 12) {
      field[11] = emoji
    }
  }

  if(value === 2) {
    if(place === 1) {
      field[0] = emoji
      field[1] = emoji
    }
    if(place === 2) {
      field[1] = emoji
      field[2] = emoji
    }
    if(place === 3) {
      field[2] = emoji
      field[3] = emoji
    }
    if(place === 4) {
      field[3] = emoji
      field[4] = emoji
    }
    if(place === 5) {
      field[4] = emoji
      field[5] = emoji
    }
    if(place === 6) {
      field[5] = emoji
      field[6] = emoji
    }
    if(place === 7) {
      field[6] = emoji
      field[7] = emoji
    }
    if(place === 8) {
      field[7] = emoji
      field[8] = emoji
    }
    if(place === 9) {
      field[8] = emoji
      field[9] = emoji
    }
    if(place === 10) {
      field[9] = emoji
      field[10] = emoji
    }
    if(place === 11) {
      field[10] = emoji
      field[11] = emoji
    }
    if(place === 12) {
      field[11] = emoji
      field[12] = emoji
    }
  }

  if(place === 12 || place === 11) {
    if(player === 2) {
      player = "A.I"
    }

    field = `O Jogador ${player} ganhou` 
    
    if(player === 1) {
      field = "Você ganhou o jogo!" 
    }
  }
  if(place > 13) {
    document.location.reload()
  }
    
  this.getField = function() {
    return field.toString();
  }
  this.toArray = function() {
    return field;
  }

  console.log(field.toString())
  return field.toString()
}

//Obtendo os IDs dos botões
document.getElementById('Mova_1').addEventListener("click", mov1)
document.getElementById('Mova_2').addEventListener("click", mov2)
document.getElementById('github').addEventListener("click", redirect)

function redirect() {
  window.location.replace("https://github.com/DiogoNSPI06/INT-A.I");
}

//Botões e textbox
function mov1() {
  if(player === 1) {
    document.getElementById('a').value = Walk(1)

    player = 2
    place += 1
  }
  if(player === 2) {
    var aiNumber = RandomNumber()
    
    document.getElementById('a').value = Walk(aiNumber)

    player = 1
    place += aiNumber
  }
}

function mov2() {
  if(player === 1) {
    document.getElementById('a').value = Walk(2)
    
    player = 2
    place += 2
  }
  if(player === 2) {
    var aiNumber = RandomNumber()
    
    document.getElementById('a').value = Walk(aiNumber)

    player = 1
    place += aiNumber
  }
}

function RandomNumber() {
  let randomNumber = Math.floor(Math.random() * (2 - 1 + 1)) + 1
  console.log(randomNumber)

  return randomNumber;
}