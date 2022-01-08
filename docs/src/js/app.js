// Channels to listen for messages.
const channels = [];
// Notification audio.
const audio = new Audio('../src/audio/notification.mp3');

// Initiate TMI client.
let tmiClient = new tmi.Client({
    channels,
    options: {
        debug: true,
    },
    connection: {
        reconnect: true,
    },
});

// Play audio on message.
tmiClient.on('message', () => {
    audio.play();
});

// Connect TMI client.
tmiClient.connect();

// Input field for channel names.
const channelNameInput = document.getElementById('channel_name_input');
// Button to add channel names.
const addChannelButton = document.getElementById('add_channel_button');
// List of channels listening to.
const channelsList = document.getElementById('channels_list');

// Wait for click on 'Add Channel' button.
addChannelButton.addEventListener('click', async (event) => addChannels());

/*
 * Add channels to the channels list and TMI client.
 */
const addChannels = () => {
    // Stop if input value of channel name is empty.
    if (channelNameInput.value === '') return;

    // Create a new li with the name of the channel.
    const newChannelElement = document.createElement('li');
    newChannelElement.innerText = channelNameInput.value;

    // Stop if channel name already exists on the list.
    for (let i = 0; i < channelsList.children.length; i++) {
        const item = channelsList.children[i];
        if (item.innerText === newChannelElement.innerText) return;
    }

    // Add the new channel to the list of listening channels.
    channelsList.appendChild(newChannelElement);
    // Clear the channel name input field.
    channelNameInput.value = '';

    // Iterate through all channels listening to and add them to TMI.
    for (let i = 0; i < channelsList.children.length; i++) {
        // One of the channels from channel list.
        const channel = channelsList.children[i].innerText;
        // TMI channels.
        const tmiChannels = tmiClient.channels;
        // If TMI already has the channel, skip iteration.
        if (tmiChannels.includes(channel)) continue;
        // Add channel to TMI.
        tmiChannels.push(channel);
    }

    // Disconnect and reconnect to TMI to refresh listening channels.
    await tmiClient.disconnect();
    await tmiClient.connect();
};
