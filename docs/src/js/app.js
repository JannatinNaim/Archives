// * Channel Names e.g ['jannatinnaim', 'twitch']
let channels = [];
// * Notification Sound e.g './notification.mp3' / 'sound.mp3'
const notification = '../src/audio/notification.mp3';

/*
    ! DO NOT MODIFY THE CODE BELOW!
*/
let tmiClient = new tmi.Client({
    channels,
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
});
tmiClient.on('message', () => {
    audio.play();
    console.log('MESSAGE');
});
tmiClient.on('connect', () => {
    console.log('CONNECTED');
});
tmiClient.connect();
// Create TMI Client
// Create Audio Object
const audio = new Audio(notification);

// On Message Play Sound

const channelNameInput = document.getElementById('channel_name_input');
const addChannelButton = document.getElementById('add_channel_button');
const channelsList = document.getElementById('channels_list');

addChannelButton.addEventListener('click', async (event) => {
    const newChannel = document.createElement('li');
    newChannel.innerText = channelNameInput.value;
    channelNameInput.value = '';

    for (let i = 0; i < channelsList.children.length; i++) {
        const item = channelsList.children[i];
        if (item.innerText === newChannel.innerText) return;
    }
    channelsList.appendChild(newChannel);

    for (let i = 0; i < channelsList.children.length; i++) {
        const item = channelsList.children[i];
        tmiClient.channels.push(item.innerText);
    }
    await tmiClient.disconnect();
    await tmiClient.connect();
});
