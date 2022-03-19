const {oneLine} = require('common-tags/lib');
const {Permissions} = require('discord.js');
const glob = require('glob');
const hasObjectProperties = require('../functions/hasObjectProperties.js');


/**
 * Commands Handler.
 * @param {Client} discordClient Discord Client.
 */
async function commandsHandler(discordClient) {
  registerCommands(discordClient);
  handleCommands(discordClient);
}


/**
 * Register commands.
 * @param {Client} discordClient Discord Client.
 */
async function registerCommands(discordClient) {
  const commandFilePaths = glob.sync(process.cwd() + '/src/commands/*/*.js');

  const commands = [];

  commandFilePaths.forEach(function(commandFilePath) {
    const command = require(commandFilePath);

    const requiredCommandProperties = ['name', 'description', 'execute'];
    hasObjectProperties(requiredCommandProperties, command, commandFilePath);

    if (command.requiredPermissions) {
      validateCommandPermissions(command.requiredPermissions, commandFilePath);
    };

    commands.push(command);

    const commandFilePathArray = commandFilePath.split('/');
    const commandFileName = commandFilePathArray[
        commandFilePathArray.length - 1
    ];
    const commandFileCategory = commandFilePathArray[
        commandFilePathArray.length - 2
    ];

    log(
        `${commandFileCategory}/${commandFileName}`,
        'success',
        'discord',
        'loadCommand',
    );
  });


  commands.forEach(function(command) {
    discordClient.commands.set(command.name, command);
  });

  // await discordClient.application.commands.set([]);
  // await discordClient.application.commands.set(commands);

  discordClient.guilds.cache.forEach(async function(guild) {
    await guild.commands.set([]);
    await guild.commands.set(commands);
  });
}


/**
 * Handle commands.
 * @param {Client} discordClient Discord Client.
 */
async function handleCommands(discordClient) {
  discordClient.on('interactionCreate', async function(interaction) {
    if (!interaction.isCommand()) return;

    const command = discordClient.commands.get(interaction.commandName);
    if (!command) return;

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

    await command.execute(interaction, discordClient);
  });
}


/**
 * Validate required command permissions.
 * @param {Array} requiredPermissions Required command permissions.
 * @param {String} commandFilePath Path to command file.
 */
function validateCommandPermissions(requiredPermissions, commandFilePath) {
  const validUserPermissions = Object.keys(Permissions.FLAGS);

  requiredPermissions.forEach(function(permission) {
    if (!validUserPermissions.includes(permission)) {
      const commandFilePathArray = commandFilePath.split('/');

      const commandFileName = commandFilePathArray[
          commandFilePathArray.length - 1
      ];
      const commandFileCategory = commandFilePathArray[
          commandFilePathArray.length - 2
      ];

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
