const {DEBUG_MODE} = process.env;


const event = {
  name: 'debug',
  /**
   * Jobs to run on Discord Client debug mode.
   * @param {String} message Debug message.
   */
  execute(message) {
    if (DEBUG_MODE) log(message, 'debug', 'discord', 'event');
  },
};


module.exports = event;
