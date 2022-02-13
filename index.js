const axios = require('axios')
const token = process.env['token']
const Discord = require('discord.js');
const keepAlive = require("./server")
// Create a new client instance
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_MEMBERS
  ]
});
const Distube = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const distube = new Distube.default(client, { emitNewSongOnly: true, plugins: [new SpotifyPlugin()] });
const prefix = '&'
client.login(token);
client.on('ready', () => {
  console.log('Ready!');
    });
client.on('reconnecting', () => {
  console.log('Reconnecting!');
});

client.on('disconnect', () => {
  console.log('Disconnect!');
});
client.on('guildMemberAdd', (member) =>{
    member.send("HI, you are member number "+member.guild.memberCount+" at mixer grinder, use commands with & as prefix, type &help to know more about commands.");

});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if(message.content != null) {
    return axios.post("https://mighty-forest-70605.herokuapp.com/predict", {
          text: message.content
        }).then(function (response) {
            //handle response here
             console.log(response['data'])
             if(response['data']=='hate speech'){
               message.reply('hate');
               message.member.kick();
             }
        })
  }})

client.on('message', async (message) => {
  if (message.author.bot) return;
  
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commands = args.shift();
  if(commands == "hi"){
    message.channel.send('hi');
  }
  if (commands == "play") {
    if (!message.member.voice.channel) return message.channel.send('please join voice channel first');
    if (!args[0]) return message.channel.send('please tell song name');
    distube.play(message, args.join(" "));

  }
  if (commands == "pause") {
    distube.pause(message)
    message.channel.send(`{message} song has been paused`);
  }
  if (commands == "resume") {
    distube.resume(message)
    message.channel.send("song has resumed");
  }
  if (commands === 'skip') {
    distube.skip(message)
    message.channel.send("song skipped");
  }
  if (commands == "stop") {
    distube.stop(message);
    message.channel.send('song stopped')
  }

  if (commands === 'queue') {
    const queue = distube.getQueue(message)
    if (!queue) {
      message.channel.send('Nothing playing right now!')
    } else {
      message.channel.send(
        `Current queue: \n${queue.songs
          .map(
            (song, id) =>
              `**${id ? id : 'Playing'}**. ${song.name} - \`${song.formattedDuration
              }\``,
          )
          .slice(0, 10)
          .join('\n')
        }`,
      )
    }

  }
  if(commands ==='kick'){
    const member = message.mentions.members.first()
    if(!member) return message.channel.send('Please mention a user')
    if(member.id === message.author.id) return message.channel.send('You cannot kick yourself')
    if(member.id === client.id) return message.channel.send('You cannot kick me')
    if(member.roles.highest.position >=
        message.member.roles.highest.position) return message.channel.send('You cannot kick this user')
    member.kick()
    message.channel.send(`${member} has been kicked`)
  }
  if(commands ==='mute'){
    const member = message.mentions.members.first()
    if(member){
        const target = message.mentions.members.first();
        if(target){
        let mainRole = message.guild.cache.find(role => role.name === 'member');
        let muteRole = message.guild.cache.find(role => role.name === 'muted');
        let memberTarget = message.guild.cache.find(member => member.id === target.id);
        memberTarget.roles.remove(mainRole);
        memberTarget.roles.add(muteRole);
        message.channel.send(`${member} has been muted`);
      }
  }
  else{
        message.channel.send('Please mention a user')
    }

  }

})
/* unfinished 
client.on('messageReactionAdd',(reaction, user) => {
  const {name} = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if(reaction.message.id === '942027185152200704'){
    switch(name){
      case '🐍':
        member.roles.add('739058580109879072')
    }
  }
})
*/


keepAlive()