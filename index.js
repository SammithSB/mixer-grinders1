

const token = process.env['token']
const Discord = require('discord.js');
const keepAlive = require("./server")
// Create a new client instance
const client = new Discord.Client({
  intents: [1
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
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
client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commands = args.shift();

  if (commands == "play") {
    if (!message.member.voice.channel) return message.channel.send('ayy voice channel join ago badmash -FBI');
    if (!args[0]) return message.channel.send('haad hesaru helana 😤');
    distube.play(message, args.join(" "));

  }
  if (commands == "pause") {
    distube.pause(message)
    message.channel.send("ha nonsense togo break, nangu had koogi koogi sakagoytu");
  }
  if (commands == "resume") {
    distube.resume(message)
    message.channel.send("yeshtot madudyalo vapas barakke, innen bittogtidde vc");
  }
  if (commands === 'skip') {
    distube.skip(message)
    message.channel.send("paapa aa artist kashta patti sangeeta produce madidane, ninu skip madtiyalo, aytu nangenu");
  }
  if (commands == "stop") {
    distube.stop(message);
    message.channel.send('ha nadi maneg haadu mugitu')
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


})
keepAlive()