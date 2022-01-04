// * Channel Names e.g ['jannatinnaim', 'twitch']
const channels = ['jannatinnaim'];
// * Notification Sound e.g './notification.mp3' / 'sound.mp3'
const notification = '../src/audio/notification.mp3';

/*
    ! DO NOT MODIFY THE CODE BELOW!
*/

// Create TMI Client
const tmiClient = new tmi.Client({ channels });
// Create Audio Object
const audio = new Audio(notification);

// Connect To Twitch Channels
tmiClient.connect();
// On Message Play Sound
tmiClient.on('message', () => {
    audio.play();
    console.log('MESSAGE');
});
