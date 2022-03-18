//⚙️| AntiCrash
process.on("unhandledRejection", (error) => console.error(error));

process.on("uncaughtException", (error) => console.error(error));

//?monaco=1

//⚙️| Packages
const express = require('express');
const localDB = require('quick.db');
const fs = require('fs');

//⚙️| Archives
const config = require('./config.json')

const TOKEN = process.env.TOKEN
const PORT = process.env.PORT

//npm i express quick.db mongoose moment discord.js@13.2.0 @discordjs/rest discord-api-types/v9 @discordjs/builders

//⚙️| Discord
const Discord = require('discord.js');
const { Intents } = require('discord.js');
const { Permissions } = require('discord.js');
const { Routes } = require('discord-api-types/v9');

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//⚙️| Variables
const botconfig = config;
const app = express();

/* Debug */

client.on('debug', console.log)

client.on('messageCreate', async msg => {
  let message = msg
  //🔧 -> MultiPrefix
  let prefixes = JSON.parse(fs.readFileSync("./database/prefixes.json", "utf8"));
  if(msg.channel.type == 'dm') return;
  if(!prefixes[msg.guild.id]) {
    prefixes[msg.guild.id] = {
      prefix: config.def.prefix
    }
  }
  let prefix = prefixes[msg.guild.id].prefix;

  //🔧 -> MultiColor
  let colors = JSON.parse(fs.readFileSync("./database/colors.json", "utf8"));
  if(!colors[msg.guild.id]) {
    colors[msg.guild.id] = {
      color: config.def.color
    }
  }
  let color = colors[msg.guild.id].color;

  //🔧 -> Command Executing System & Message Reader
  if(msg.channel.type == "dm") return;
  if(msg.author.bot) return;

  if(msg.content.startsWith(`<@!${client.user.id}>`||`@${client.username}`)) {
    message.reply(`Olá, tudo bem? Quer Saber Mais Sobre Mim?  Use \`${prefix}help\` e veja meus comandos!`)
  }
  if(!message.content.toLowerCase().startsWith(prefix)) return;

  //🔧 -> Args & Command
  const args = message.content
   .trim().slice(prefix.length)
   .split(/ +/g);
  let command = args.shift().toLowerCase();

  //🔧 -> Aliases
  if(command === "warn") command = "aviso"
  if(command === "warns") command = "avisos"
  if(command === "rwarns") command = "clearwarns"
  if(command === "e") command = "eval"
  if(command === "ajuda") command = "help"
  if(command === "limpar") command = "clear"
  if(command === "bal") command = "atm"
  if(command === "weather") command = "tempo"
  if(command === "profile") command = "perfil"
  if(command === "send") command = "chat"
  if(command === "pontos") command = "points"
  if(command === "xp") command = "points"
  if(command === "servermode") command = "setservermode"
  if(command === "setbotmode") command = "setservermode"
  if(command === "hornyjail") command = "jail"

  //✅ -> Error Message
  const embederror = new Discord.MessageEmbed()
  .setTitle(":x: | Erro! ")
  .setDescription(`> Não achei o comando: \`${command}\``)
  .setTimestamp()
  .setColor('RED')
  .setFooter("© HypedGroupCode");

  try {
    const commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, message, args, prefix, color, config);
    console.log(`${message.guild.name}: ${message.author.tag} Usou ${command} no #${message.channel.name}`)
    //Registrando o usuário ao usar o comando!
    
    let userIsRegistered = localDB.get(`uuid_${message.author.id}`)
    
    if(!userIsRegistered) {
      localDB.add(`uuidNumber`, 1)
      let uuid = localDB.get(`uuidNumber`)

      localDB.set(`uuid_${message.author.id}`, uuid)

      console.log(`USER REGISTERED - ID: ${uuid}`)
    } 
  } catch (err) {
    console.error('❌| Erro:' + err)
    message.reply({ embeds: [embederror] })
  }
})

//✅》Console Físico
client.on("ready", () => {
  console.log("✅| Its all OK");
})

//✅》Porta do express
app.get("/", (request, response) => {
  const ping = new Date();
  response.send(`<html><head><style>
    body {
        background-color: #2C2F33;
        font-family: 'Roboto', sans-serif;
    }
    .outer-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #23272A;
        box-shadow: 0px 0px 10px #1B1E21;
        border-radius: 50px;
        width: 45%;
    }
    .plasma {
        color: #ffffff;
        font-size: 70px;
        margin: 0;
        font-weight: 400;
        text-align: center;
    }
    .ends {
        color: #ffffff;
        font-size: 35px;
        margin: 0;
        text-align: center;
    }
    .date {
        color: #99AAB5;
        font-size: 25px;
        margin: 0;
        padding-bottom: 50px;
        text-align: center;
    }
    .logo {
        max-width: 100%;
        height: auto;
        width: auto;
        margin: 0;
    }
</style>
<link href="https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap" rel="stylesheet">
<link rel="shortcut icon" type="image/x-icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png">
<title>Status Do Hyped</title>
</head><body><div class="outer-container" wfd-id="0">
    <div class="container" wfd-id="1">
        <img src="https://botlist.hypeds.com/img/logo.png" class="logo">
        <p class="plasma">Status Do Hyped</p>
        <p class="ends" id="ends">Status Da Host: Online</p>
        <p class="date" id="date">Status Do Site: Online</p>
    </div>
</div>
</body></html>`)
  ping.setHours(ping.getHours() -3 );
  console.log(`⚠️ | Ping recived at ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
});
app.listen(PORT)

//Código de ! Diogo06🐾#1337 Não Disturbe
client.login(TOKEN)