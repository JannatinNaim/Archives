// Default Channels List
const channels = [];
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

// #channel_notifications_section .add_channel_form.
// Input form for channel names.
const channelInputForm = document.querySelector('.add_channel_form');
// #channel_notifications_section .add_channel_form .add_channel_name.
// Input field for channel name.
const channelNameInput = document.querySelector('.add_channel_form .add_channel_name');
// #channel_notifications_section .channel_notifications_list .channel_name
// Each span with channel names.
const channelNames = document.querySelectorAll('.channel_notifications_list .channel_name');

channelInputForm.addEventListener('submit', (event) => {
    // Prevent from reloading the page.
    event.preventDefault();

    // Add channels to the page.
    addChannelToDocument();
    // Add channels to TMI client.
    addChannelToTMIClient();
});

/*
 * Add the channel name from the input field to the channels list.
 */
const addChannelToDocument = () => {
    // Get channel name from input field.
    const channelName = channelNameInput.value;
    // Stop if no channel name is given. Shouldn't be possible cause it requires a value to be submitted.
    if (!channelName) return;

    // Variable to check if the channel exists. For exiting the loop.
    // ? Needs a better implementation.
    let channelAdded = false;

    // Check each name and add to list.
    channelNames.forEach((channelElement) => {
        // Exit if channel already exists.
        if (channelAdded) return;

        // Get channel name from the element's inner text.
        const channel = channelElement.innerText;

        // If channel name exists, set channelAdded to true and exit.
        // If not, add channel to the element and exit.
        // Else just alert that there are no more space for channels.
        if (channel === channelName) {
            channelAdded = true;
        } else if (channel === '') {
            channelElement.innerText = channelName;
            channelAdded = true;
        }
    });

    // If no room to add channels, alert user.
    if (!channelAdded) {
        alert('No more room to add channels. Might wanna remove some first.');
    }

    // Clear channel input field.
    channelNameInput.value = '';
};

const addChannelToTMIClient = () => {
    // TODO: Add channels to TMI.
};
