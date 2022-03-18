const Discord = require('discord.js');
const localDB = require('quick.db');

module.exports.run = async (client, message, args, prefix, color, config) => {
  var field = ['❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '❌ |', '💍']

  let kldgDB = localDB.get(`AI_knowledge_${message.author.id}`)
  let kldgNumber = localDB.get(`AI_knowledgeNumber_${message.author.id}`)
  
  let player = 1
  let place = 1
  let emoji = "0"

  //Função do Jogo
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
    }

    if(place >= 8) {
      if(player === 2) {
        player = "A.I"

        localDB.set(`AI_knowledge_${message.author.id}`, true)
      }
      if(player === 1) {
        player = message.author

        localDB.set(`AI_knowledge_${message.author.id}`, false)
      }
      
      field = `O Jogador ${player} ganhou` 
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

  //Botões e Embeds
  const b1 = new Discord.MessageButton()
  .setCustomId(`botao1_${message.id}`)
  .setLabel('1')
  .setStyle("PRIMARY");

  const b2 = new Discord.MessageButton()
  .setCustomId(`botao2_${message.id}`)
  .setLabel('2')
  .setStyle("SUCCESS");

  const embed = new Discord.MessageEmbed()
  .setTitle(":robot: | AI Game ")
  .setDescription("> Clique nos botões abaixo para andar: 1 ou 2 passos. \n Objetivo, ganhar da `AI` pegando o :ring:")
  .addField("Jogo:", ":x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :ring:")
  .setColor(color)

  const messageRow = new Discord.MessageActionRow()
  .addComponents(b1, b2);

  const filter = i => i.user.id === message.author.id

  const collector = message.channel.createMessageComponentCollector({ filter, time: 150000 });

  //Enviando a mensagem
  message.reply({ embeds: [embed], components: [messageRow] }).then(m => {
    collector.on('collect', async b => {
      if(b.customId === `botao1_${message.id}`){
        if(player === 2) {
          var aiNumber = RandomNumber()
          
          const embedInGame = new Discord.MessageEmbed()
           .setTitle(":robot: | Jogo Iniciado!")
           .setDescription("> Clique nos botões abaixo para andar: 1 ou 2 passos.")
           .setColor(color)
           .addField("Jogo", `${Walk(aiNumber)}`);
          b.update({ embeds: [embedInGame], components: [messageRow] })

          player = 1
          place += aiNumber
        } else {
          const embedInGame = new Discord.MessageEmbed()
           .setTitle(":robot: | Jogo Iniciado!")
           .setDescription("> Clique nos botões abaixo para andar: 1 ou 2 passos.")
           .setColor(color)
           .addField("Jogo", `${Walk(1)}`);
          b.update({ embeds: [embedInGame], components: [messageRow] })

          player = 2
          place += 1 
        }
      }
      if(b.customId === `botao2_${message.id}`){
        if(player === 2) {
          var aiNumber = RandomNumber()
          
          const embedInGame = new Discord.MessageEmbed()
           .setTitle(":robot: | Jogo Iniciado!")
           .setDescription("> Clique nos botões abaixo para andar: 1 ou 2 passos.")
           .setColor(color)
           .addField("Jogo", `${Walk(aiNumber)}`);
          b.update({ embeds: [embedInGame], components: [messageRow] })

          player = 1
          place += aiNumber
        } else {
          const embedInGame = new Discord.MessageEmbed()
           .setTitle(":robot: | Jogo Iniciado!")
           .setDescription("> Clique nos botões abaixo para andar: 1 ou 2 passos.")
           .setColor(color)
           .addField("Jogo", `${Walk(2)}`);
          b.update({ embeds: [embedInGame], components: [messageRow] })

          player = 2
          place += 2
        }
      }
    })
  })
}

function RandomNumber() {
  let randomNumber = Math.floor(Math.random() * (2 - 1 + 1)) + 1
  console.log(randomNumber)
  /*
  if(kldgDB === true) {
    let a = randomNumber * 100 / kldgNumber 

    let b = a / 10

    if(b > 10) b = 2

    randomNumber = b
  }

  if(kldgDB === false) {
    let a = randomNumber * 100 / kldgNumber

    let b = a / 10

    if(b < 10) b = 1

    randomNumber = b
  }
  */


  return randomNumber;
}