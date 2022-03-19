const log = require('../../functions/log.js');


const event = {
  name: 'warn',
  execute(message) {
    log(message, 'warn', 'discord', 'event');
  },
};


module.exports = event;
