const command = {
  name: 'ping',
  description: 'Ping!',
  /**
   * Jobs on ping command execution.
   * @param {Interaction} interaction Discord Client interaction.
   */
  execute(interaction) {
    // Reply to command.
    interaction['reply']('Pong!');
  },
};


module.exports = command;
