const event = {
  name: 'warn',
  /**
   * Jobs to run on Discord Client event warn.
   * @param {String} message Warn message.
   */
  execute(message) {
    // Report on warn.
    log(message, 'warn', 'discord', 'event');
  },
};


module.exports = event;
