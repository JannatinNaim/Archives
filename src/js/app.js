// Default Channels List
const channels = ['jannatinnaim'];
// Default Notification Sound
const notification = new Audio('./src/audio/notification.mp3');

// Client Settings
const clientOptions = {
    channels,
    options: {
        debug: true,
    },
    connection: {
        secure: true,
        reconnect: true,
    },
};

// Create TMI Client
const client = new tmi.Client(clientOptions);

// Listen To Chat
client.on('chat', (channel, userState, message, self) => {
    // Return if message from self.
    if (self) return;

    // Play notification sound.
    notification.play();
});

// Connect To Twitch
client.connect().then(() => {
    const username = client.getUsername();
    console.info(`CONNECTED WITH USERNAME: ${username}`);
});
