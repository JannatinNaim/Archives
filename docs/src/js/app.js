// Channels to listen for messages.
const channels = [];
// Notification audio.
let audio = new Audio('../src/audio/notification.mp3');

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
tmiClient.connect().then(() => retrieveChannels());

const channelInputForm = document.getElementById('channel_input_form');
channelInputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addChannels();
});

// Input field for channel names.
const channelNameInput = document.getElementById('channel_name_input');
// Button to add channel names.
const addChannelButton = document.getElementById('add_channel_button');
// List of channels listening to.
const channelsList = document.getElementById('channels_list');

const soundInputFormContainer = document.getElementById('sound_input_form');
const notificationAdded = document.createElement('p');
soundInputFormContainer.appendChild(notificationAdded);

const removeChannel = async (channelName, channelNameContainer, channelsList) => {
    // Iterate through all channels listening to and add them to TMI.
    const tmiChannels = tmiClient.channels;
    // If TMI already has the channel, skip iteration.
    tmiChannels.splice(tmiChannels.indexOf(channelName, 1));

    channelsList.removeChild(channelNameContainer);

    addChannelsToLocalStorage();

    // Disconnect and reconnect to TMI to refresh listening channels.
    await tmiClient.disconnect();
    await tmiClient.connect();
};

const retrieveChannels = async () => {
    const channels = JSON.parse(window.localStorage.getItem('channels')) || [];

    for (let i = 0; i < channels.length; i++) {
        const channelName = channels[i];

        const channelNameContainer = document.createElement('li');
        const channelNameContainerText = document.createElement('span');
        const channelNameContainerButton = document.createElement('button');
        const channelNameContainerButtonIcon = document.createElement('span');

        channelNameContainerText.innerText = channelName;
        channelNameContainerText.classList.add('channel_name_text');
        channelNameContainerButtonIcon.classList.add('iconify');
        channelNameContainerButtonIcon.dataset.icon = 'emojione-monotone:cross-mark-button';
        channelNameContainerButton.appendChild(channelNameContainerButtonIcon);
        channelNameContainerButton.classList.add('channel_name_button');

        channelNameContainerButton.addEventListener('click', () =>
            removeChannel(channelName, channelNameContainer, channelsList)
        );

        channelNameContainer.appendChild(channelNameContainerText);
        channelNameContainer.appendChild(channelNameContainerButton);

        for (let i = 0; i < channelsList.children.length; i++) {
            const item = channelsList.children[i];
            if (item.innerText === channelNameContainerText.innerText) return;
        }

        channelNameInput.value = '';
        channelsList.appendChild(channelNameContainer);

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

        addChannelsToLocalStorage();

        // Disconnect and reconnect to TMI to refresh listening channels.
        await tmiClient.disconnect();
        await tmiClient.connect();
    }
};

/*
 * Add channels to the channels list and TMI client.
 */
const addChannels = async () => {
    // Stop if input value of channel name is empty.
    if (channelNameInput.value === '') return;

    const channelNameContainer = document.createElement('li');
    const channelNameContainerText = document.createElement('span');
    const channelNameContainerButton = document.createElement('button');
    const channelNameContainerButtonIcon = document.createElement('span');

    const channelName = channelNameInput.value;
    channelNameContainerText.innerText = channelName;
    channelNameContainerText.classList.add('channel_name_text');
    channelNameContainerButtonIcon.classList.add('iconify');
    channelNameContainerButtonIcon.dataset.icon = 'emojione-monotone:cross-mark-button';
    channelNameContainerButton.appendChild(channelNameContainerButtonIcon);
    channelNameContainerButton.classList.add('channel_name_button');

    channelNameContainerButton.addEventListener('click', () =>
        removeChannel(channelName, channelNameContainer, channelsList)
    );

    channelNameContainer.appendChild(channelNameContainerText);
    channelNameContainer.appendChild(channelNameContainerButton);

    for (let i = 0; i < channelsList.children.length; i++) {
        const item = channelsList.children[i];
        if (item.innerText === channelNameContainerText.innerText) return;
    }

    channelNameInput.value = '';
    channelsList.appendChild(channelNameContainer);

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

    addChannelsToLocalStorage();

    // Disconnect and reconnect to TMI to refresh listening channels.
    await tmiClient.disconnect();
    await tmiClient.connect();
};

const addChannelsToLocalStorage = () => {
    // TODO:
    // 1. On channel name add , add channel name to channel names list.
    const channels = [];

    for (let i = 0; i < channelsList.children.length; i++) {
        const channel = channelsList.children[i].innerText;
        channels.push(channel);
    }

    window.localStorage.setItem('channels', JSON.stringify(channels));
};

const soundInputForm = document.getElementById('audio_file_input');
const soundInputButton = document.getElementById('add_sound_button');

soundInputButton.addEventListener('click', (event) => {
    event.preventDefault();

    audio = new Audio(URL.createObjectURL(soundInputForm.files[0]));

    notificationAdded.innerText = 'Added Notification Sound: ' + soundInputForm.files[0].name;

    window.localStorage.setItem('notification', JSON.stringify(URL.createObjectURL(soundInputForm.files[0])));
});
