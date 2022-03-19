global.log = require('./functions/log.js');

const {Client, Intents} = require('discord.js');

const eventsHandler = require('./handlers/events.js');
const commandsHandler = require('./handlers/commands.js');


const discordClient = new Client({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS,
  ],
});


/**
 * Program entry function.
 */
async function main() {
  const {
    DISCORD_BOT_TOKEN,
    DEVELOPMENT_DISCORD_BOT_TOKEN,
    DEBUG_MODE,
  } = process.env;

  const TOKEN = DEBUG_MODE ? DEVELOPMENT_DISCORD_BOT_TOKEN : DISCORD_BOT_TOKEN;
  await discordClient.login(TOKEN);

  eventsHandler(discordClient);
  commandsHandler(discordClient);
}

main();
