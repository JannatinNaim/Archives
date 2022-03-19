const event = {
  name: 'error',
  /**
   * Jobs to run on Discord Client error.
   * @param {String} message Error message.
   */
  execute(message) {
    log(message, 'error', 'discord', 'event');
  },
};


module.exports = event;
