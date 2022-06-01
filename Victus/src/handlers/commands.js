const {oneLine} = require('common-tags/lib');
const {Permissions, Collection} = require('discord.js');
const glob = require('glob');

const {
  getFileNameAndCategory,
  hasObjectProperties,
} = require('../functions/utilities.js');

/**
 * Discord Client commands handler.
 * @param {Client} discordClient Discord Client.
 */
function commandsHandler(discordClient) {
  // Register Discord Client commands.
  registerCommands(discordClient);

  // Handle Discord Client commands.
  handleCommands(discordClient);
}


/**
 * Discord Client commands registerer.
 * @param {Client} discordClient Discord Client.
 */
function registerCommands(discordClient) {
  // Array of command file paths.
  const commandFilePaths = glob.sync(process.cwd() + '/src/commands/*/*.js');

  // Array of commands to register.
  const commands = [];

  commandFilePaths.forEach(function(commandFilePath) {
    // Require each command.
    const command = require(commandFilePath);

    // Required command properties.
    const requiredCommandProperties = ['name', 'description', 'execute'];
    // Validate if command has all required command properties.
    hasObjectProperties(requiredCommandProperties, command, commandFilePath);

    // Validate if command permissions are available Discord permissions.
    if (command['requiredPermissions']) {
      validateCommandPermissions(
          command['requiredPermissions'], commandFilePath,
      );
    }

    // Set command to be registered.
    commands.push(command);

    // Get command file name and category.
    const [
      commandFileName, commandFileCategory,
    ] = getFileNameAndCategory(commandFilePath);

    // Report on loaded command.
    log(
        `${commandFileCategory}/${commandFileName}`,
        'success',
        'discord',
        'loadCommand',
    );
  });

  // Collection of registered commands.
  discordClient['commands'] = new Collection();

  commands.forEach(function(command) {
    // Register command to collection with access key as the command name.
    discordClient['commands'].set(command.name, command);
  });

  const {DEBUG_MODE} = process.env;

  // Register commands to only guilds in debug mode, otherwise in global.
  // ! NOTE: This should be changed to a specific development server.
  if (DEBUG_MODE) {
    discordClient.guilds.cache.forEach(async function(guild) {
      await guild.commands.set([]);
      await guild.commands.set(commands);
    });
  } else {
    // ! NOTE: This is disabled for now because I'm an idiot.
    // await discordClient.application.commands.set([]);
    // await discordClient.application.commands.set(commands);
  }
}


/**
 * Discord Client commands handler.
 * @param {Client} discordClient Discord Client.
 */
function handleCommands(discordClient) {
  discordClient.on('interactionCreate', async function(interaction) {
    // Return if interaction is not a command.
    if (!interaction.isCommand()) return;

    // Retrieve command from available commands.
    const command = discordClient['commands'].get(interaction['commandName']);
    // Return if command is not available.
    if (!command) return;

    // Report on executed command.
    log(
        oneLine`
        ${command.name} |
        ${interaction.user.username} |
        ${interaction.guild.name} |
        ${interaction.channel?.name}
        `,
        'success',
        'discord',
        'command',
    );

    // Execute command.
    try {
      await command.execute(interaction, discordClient);
    } catch (e) {
      // Report on command error.
      log(e, 'error', 'discord', 'command');
    }
  });
}


/**
 * Validate required command permissions.
 * @param {Array} requiredPermissions Required command permissions.
 * @param {String} commandFilePath Path to command file.
 */
function validateCommandPermissions(requiredPermissions, commandFilePath) {
  // Array of valid Discord User permissions.
  const validUserPermissions = Object.keys(Permissions.FLAGS);

  requiredPermissions.forEach(function(permission) {
    // If permission is invalid, throw error.
    if (!validUserPermissions.includes(permission)) {
      // Get command file name and category.
      const [
        commandFileName, commandFileCategory,
      ] = getFileNameAndCategory(commandFilePath);

      // Report on invalid command permissions.
      throw new Error(
          oneLine`
          COMMAND:
          ${commandFileCategory}/${commandFileName}
          does not have valid required permission(s).
          `,
      );
    }
  });
}


module.exports = commandsHandler;
