const event = {
  name: 'ready',
  once: true,
  /**
   * Jobs to run on Discord Client is ready.
   */
  execute() {
    // Report on ready.
    log('Discord Client is ready!', 'success', 'discord', 'event');
  },
};


module.exports = event;
