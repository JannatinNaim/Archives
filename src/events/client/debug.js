const log = require('../../functions/log.js');
const {DEBUG_MODE} = process.env;


const event = {
  name: 'debug',
  execute(message) {
    if (DEBUG_MODE) log(message, 'debug', 'discord', 'event');
  },
};


module.exports = event;
