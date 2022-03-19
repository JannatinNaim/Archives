const log = require('../../functions/log.js');


const event = {
  name: 'error',
  execute(message) {
    log(message, 'error', 'discord', 'event');
  },
};


module.exports = event;
