const {oneLine} = require('common-tags/lib');
const glob = require('glob');

const hasObjectProperties = require('../functions/hasObjectProperties.js');
const getFileNameAndCategory = require(
    '../functions/getFileNameAndCategory.js',
);


/**
 * Handle Discord Client events.
 * @param {Client} discordClient Discord Client.
 */
async function eventsHandler(discordClient) {
  // Array of event file paths.
  const eventFilePaths = glob.sync(process.cwd() + '/src/events/*/*.js');

  eventFilePaths.forEach(function(eventFilePath) {
    // Require each event.
    const event = require(eventFilePath);

    // Required event properties.
    const requiredEventProperties = ['name', 'execute'];
    // Validate if event has all required event properties.
    hasObjectProperties(requiredEventProperties, event, eventFilePath);

    // Validate if event name is available in Discord Client.
    validateEventName(event.name, eventFilePath);


    // Switch between always running events and only once ran events.
    if (event.once) {
      discordClient.once(event.name, async function(...args) {
        try {
          // Execute event.
          await event.execute(...args, discordClient);
        } catch (error) {
          // Report on event error.
          log(error, 'error', 'discord', 'event' );
        }
      });
    } else {
      discordClient.on(event.name, async function(...args) {
        try {
          // Execute event.
          await event.execute(...args, discordClient);
        } catch (error) {
          // Report on event error.
          log(error, 'error', 'discord', 'event');
        }
      });
    }

    // Event file name and category.
    const [
      eventFileName, eventFileCategory,
    ] = getFileNameAndCategory(eventFilePath);

    // Report on loaded events.
    log(
        `${eventFileCategory}/${eventFileName}`,
        'success',
        'discord',
        'loadEvent',
    );
  });
}


/**
 * Validate Discord Client event name.
 * @param {String} eventName Event name.
 * @param {String} eventFilePath Event file path.
 */
function validateEventName(eventName, eventFilePath) {
  // All valid Discord Client event names.
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

  // If event name is invalid, throw error.
  if (!validEventNames.includes(eventName)) {
    // Get event file name and category.
    const [
      eventFileName, eventFileCategory,
    ] = getFileNameAndCategory(eventFilePath);

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
