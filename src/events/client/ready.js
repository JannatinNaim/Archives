const event = {
  name: 'ready',
  once: true,
  execute() {
    log('Discord Client is ready!', 'success', 'discord', 'event');
  },
};


module.exports = event;
