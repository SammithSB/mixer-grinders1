const ms = require('ms')

module.exports = {
  name:'mute',
  UserPerms: ['MUTE_MEMBERS'],
  BotPerms: ['MUTE_MEMBERS'],
  description: 'Mutes the mentioned user',
  run: async(client, message, args, Discord)=>{
    const member = message.mentions.members.first()
    let time = args[1]
    let reason = args.slice(2).join(' ')
    const role = message.guild.roles.cache.find(r => r.name === 'Muted')
    if(!role) return message.channel.send('Create a role first')
    if(!member) return message.channel.send('Please mention a user')
    if(member.id === message.author.id) return message.channel.send('You cannot mute yourself')
    if(member.id === client.id) return message.channel.send('You cannot mute me')
    let role2 = message.guild.roles.cache.find(r => r.name === 'Muted')
    if(member.role.cache.has(role2)) return message.channel.send('This user is already muted')
    if(member.roles.highest.position >=
        message.member.roles.highest.position) return message.channel.send('You cannot mute this user')
    await member.roles.add(role)
    message.channel.send(`${member} has been muted for ${ms(ms(time), {long: true})}`)
    setTimeout(()=>{
      member.roles.remove(role)
      message.channel.send(`${member} has been unmuted`)
    }, ms(time))
  }
  }