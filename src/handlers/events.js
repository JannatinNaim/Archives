const {oneLine} = require('common-tags/lib');
const glob = require('glob');
const hasObjectProperties = require('../functions/hasObjectProperties.js');


/**
 * Events Handler.
 * @param {Client} discordClient Discord Client
 */
async function eventsHandler(discordClient) {
  const eventFilePaths = glob.sync(process.cwd() + '/src/events/*/*.js');

  eventFilePaths.forEach(function(eventFilePath) {
    const event = require(eventFilePath);

    const requiredEventProperties = ['name', 'execute'];
    hasObjectProperties(requiredEventProperties, event, eventFilePath);

    validEventName(event.name, eventFilePath);

    if (event.once) {
      discordClient.once(event.name, function(...args) {
        event.execute(...args, discordClient);
      });
    } else {
      discordClient.on(event.name, function(...args) {
        event.execute(...args, discordClient);
      });
    }

    const eventFilePathArray = eventFilePath.split('/');
    const eventFileName = eventFilePathArray[eventFilePathArray.length - 1];
    const eventFileCategory = eventFilePathArray[eventFilePathArray.length - 2];

    log(
        `${eventFileCategory}/${eventFileName}`,
        'success',
        'discord',
        'loadEvent',
    );
  });
}


/**
 * Validates an event name.
 * @param {String} eventName Event name to validate.
 * @param {String} eventFilePath Event file path.
 */
function validEventName(eventName, eventFilePath) {
  const validEventNames = [
    'apiRequest',
    'apiResponse',
    'applicationCommandCreate',
    'applicationCommandDelete',
    'applicationCommandUpdate',
    'channelCreate',
    'channelDelete',
    'channelPinsUpdate',
    'channelUpdate',
    'debug',
    'emojiCreate',
    'emojiDelete',
    'emojiUpdate',
    'error',
    'guildBanAdd',
    'guildBanRemove',
    'guildCreate',
    'guildDelete',
    'guildIntegrationsUpdate',
    'guildMemberAdd',
    'guildMemberAvailable',
    'guildMemberRemove',
    'guildMembersChunk',
    'guildMemberUpdate',
    'guildScheduledEventCreate',
    'guildScheduledEventDelete',
    'guildScheduledEventUpdate',
    'guildScheduledEventUserAdd',
    'guildScheduledEventUserRemove',
    'guildUnavailable',
    'guildUpdate',
    'interaction',
    'interactionCreate',
    'invalidated',
    'invalidRequestWarning',
    'inviteCreate',
    'inviteDelete',
    'message',
    'messageCreate',
    'messageDelete',
    'messageDeleteBulk',
    'messageReactionAdd',
    'messageReactionRemove',
    'messageReactionRemoveAll',
    'messageReactionRemoveEmoji',
    'messageUpdate',
    'presenceUpdate',
    'rateLimit',
    'ready',
    'roleCreate',
    'roleDelete',
    'roleUpdate',
    'shardDisconnect',
    'shardError',
    'shardReady',
    'shardReconnecting',
    'shardResume',
    'stageInstanceCreate',
    'stageInstanceDelete',
    'stageInstanceUpdate',
    'stickerCreate',
    'stickerDelete',
    'stickerUpdate',
    'threadCreate',
    'threadDelete',
    'threadListSync',
    'threadMembersUpdate',
    'threadMemberUpdate',
    'threadUpdate',
    'typingStart',
    'userUpdate',
    'voiceStateUpdate',
    'warn',
    'webhookUpdate',
  ];

  if (!validEventNames.includes(eventName)) {
    const eventFilePathArray = eventFilePath.split('/');

    const eventFileName = eventFilePathArray[eventFilePathArray.length - 1];
    const eventFileCategory = eventFilePathArray[eventFilePathArray.length - 2];

    throw new Error(
        oneLine`
        EVENT:
        ${eventFileCategory}/${eventFileName}
        does not have a valid event name.
        `,
    );
  }
}

module.exports = eventsHandler;
