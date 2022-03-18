const event = {
  name: 'ready',
  once: true,
  execute() {
    console.log('Discord Client is ready!');
  },
};


module.exports = event;
