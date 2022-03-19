const command = {
  name: 'ping',
  description: 'Ping!',
  execute(interaction, discordClient) {
    interaction.reply('Pong!');
  },
};


module.exports = command;
