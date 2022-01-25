// Default Channels List
const channels = [];
// Default Notification Sound
let notification = new Audio('./src/audio/notification.mp3');

//Critical variables to avoid sending too many notifications
const minutesOfSilenceBeforePlayingNotification = 2
let timeLastMessageWasSent = new Date();

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

    //check how long it's been since the last message was sent
    const now = new Date();
    const timeSinceLastMesageInMs =  Number(now) - Number(timeLastMessageWasSent);
    const minutesSinceLastMessage = timeSinceLastMesageInMs / 1000 / 60;
    
    if ( minutesSinceLastMessage > minutesOfSilenceBeforePlayingNotification){ 
        // Play notification sound.
        notification.play();
    }
    //Reset global variable to create a cooldown period
    timeLastMessageWasSent = now
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
// #channel_notifications_section .channel_notifications_list
// Channel notification list parent.
const channelNotificationsList = document.querySelector('.channel_notifications_list');
// #notification_sound_section .notification_sound_form
// The actual form for the sound input fields.
const notificationSoundForm = document.querySelector('.notification_sound_section_form');
// #notification_sound_file
// The input field for the notification sound file.
const notificationSoundInput = document.querySelector('#notification_sound_file');
// #notification_sound_section .notification_sound_form .notification_sound_file_label
// The label for the hidden input element.
const notificationSoundLabel = document.querySelector('.notification_sound_file_label');
// #notification_sound_section_form .notification_volume_container .notification_volume_slider input
// The volume slider for input.
const notificationVolumeSlider = document.querySelector('.notification_volume_slider input');
// #notification_sound_section_form .notification_volume_container .notification_volume_slider progress
// Progress bar showing what the value is.
const notificationVolumeSliderProgress = document.querySelector('.notification_volume_slider progress');
// #notification_sound_section_form .notification_volume_container .notification_volume_slider_value
// Text value of the current volume.
const notificationVolumeValue = document.querySelector('.notification_volume_slider_value');

// Listen for user input of new channels.
channelInputForm.addEventListener('submit', (event) => {
    // Prevent from reloading the page.
    event.preventDefault();

    // Get channel name from input field.
    const channelName = channelNameInput.value ? channelNameInput.value.trim().toLowerCase() : '';

    // Add channels to the page.
    const callAddChannelToTMIClient = addChannelToDocument(channelName);
    // If channels were added to page, then add channels to TMI client as well.
    if (callAddChannelToTMIClient) addChannelToTMIClient();
});

/*
 * Add the channel name from the input field to the channels list.
 */
const addChannelToDocument = (channelName) => {
    // Stop if no channel name is given. Shouldn't be possible cause it requires a value to be submitted.
    if (!channelName) return;

    // Variable to check if the channel exists. For exiting the loop.
    // ? Needs a better implementation.
    let channelAdded = false;
    // Whether to call addChannelsToTMIClient or not.
    let callAddChannelToTMIClient = false;

    // Check each name and add to list.
    channelNames.forEach((channelElement) => {
        // Exit if channel already exists.
        if (channelAdded) return;

        // Get channel name from the element's inner text.
        const channel = channelElement.innerText.toLowerCase();

        // If channel name exists, set channelAdded to true and exit.
        // If not, add channel to the element and exit.
        // Else just alert that there are no more space for channels.
        if (channel === channelName) {
            channelAdded = true;
        } else if (channel === '') {
            channelElement.innerText = channelName;
            channelAdded = true;
            callAddChannelToTMIClient = true;
        }
    });

    // If no room to add channels, alert user.
    if (!channelAdded) {
        alert('No more room to add channels. Might wanna remove some first.');
    }

    // Clear channel input field.
    channelNameInput.value = '';

    // If addChannelToTMIClient can be called or not.
    return callAddChannelToTMIClient;
};

/*
 * Add channels to TMI Client channels list.
 */
const addChannelToTMIClient = async () => {
    // Empty channels array.
    channels.length = 0;
    // Add each channel name to channels array.
    channelNames.forEach((channelElement) => {
        // Get channel name.
        const channel = channelElement.innerText;

        // If channel name exists, add them to the array.
        if (channel) channels.push(channel);
    });

    // Disconnect and reconnect TMI client.
    await client.disconnect();
    await client.connect();
};

channelNotificationsList.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'svg') return;

    removeChannelFromDocumentAndTMIClient(event);
});

/*
 * Removes a channel from the document and TMI client.
 */
const removeChannelFromDocumentAndTMIClient = async (event) => {
    const channelName = event.target.previousElementSibling.innerText;
    event.target.previousElementSibling.innerText = '';

    if (!channelName) return;

    const channels = [];
    channelNames.forEach((channelElement) => {
        // Get channel name.
        const channel = channelElement.innerText;
        channelElement.innerText = '';

        // If channel name exists, add them to the array.
        if (channel) channels.push(channel);
    });

    channels.forEach((channel) => {
        addChannelToDocument(channel);
    });
    await addChannelToTMIClient();
};

// Listen for user input for new notification sound.
notificationSoundForm.addEventListener('submit', (event) => {
    // Prevent page from reloading.
    event.preventDefault();

    addNotificationSound();
});

// Listen for user change file source for notification sound.
notificationSoundInput.addEventListener('change', () => {
    notificationSoundLabel.innerText = notificationSoundInput.files[0].name;
});

/*
 * Add new notification sound.
 */
const addNotificationSound = () => {
    const notificationSoundFile = notificationSoundInput.files[0];
    if (!notificationSoundFile) return;

    const notificationSoundFilePath = URL.createObjectURL(notificationSoundFile);
    const notificationSound = new Audio(notificationSoundFilePath);

    notification = notificationSound;
    notificationSoundLabel.style.background = '#2ead07';
};

// Listen for volume change.
notificationVolumeSlider.addEventListener('input', () => changeNotificationVolume());

/*
 * Change volume of notification.
 */
const changeNotificationVolume = () => {
    // Get the volume value from the input.
    const volume = notificationVolumeSlider.value;

    // Set volume to match progress and text.
    notificationVolumeSliderProgress.value = volume;
    notificationVolumeValue.innerText = volume;

    // Set volume of audio notification (range 1.0 = 0)
    notification.volume = volume / 100;
};
