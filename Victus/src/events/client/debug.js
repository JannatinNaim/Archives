const {DEBUG_MODE} = process.env;


const event = {
  name: 'debug',
  /**
   * Jobs to run on Discord Client debug mode.
   * @param {String} message Debug message.
   */
  execute(message) {
    // If debug mode is on, report on debug.
    if (DEBUG_MODE) log(message, 'debug', 'discord', 'base');
  },
};


module.exports = event;
