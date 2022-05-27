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
  field[place-1] = emoji

  if(value === 2) {
    field[place] = emoji
  }

  if(place === 12 || place === 11) {
    field = player === 1 ? "Você ganhou o jogo!"  : "O Jogador A.I ganhou"
  }
  if(place >= 13) {
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

function movAI() {
  var aiNumber = RandomNumber()
    
  document.getElementById('a').value = Walk(aiNumber)

  player = 1
  place += aiNumber
}

//Botões e textbox
function mov1() {
  if(player === 1) {
    document.getElementById('a').value = Walk(1)

    player = 2
    place += 1
  }
  movAI()
}

function mov2() {
  if(player === 1) {
    document.getElementById('a').value = Walk(2)
    
    player = 2
    place += 2
  }
  movAI()
}

function RandomNumber() {
  let randomNumber = Math.ceil(Math.random() * 2);
  console.log(randomNumber)

  return randomNumber;
}
