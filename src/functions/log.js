const moment = require('moment');


/**
 * Log function with categories and types.
 * @param {String} message Message to log.
 * @param {String} logType Type of log.
 * @param {String} processType Type of process.
 * @param {String} logCategory Type of category.
 */
async function log(
    message,
    logType = 'info',
    processType = 'general',
    logCategory = 'base',
) {
  const TIMESTAMP = moment().format('YYYY-MM-DD HH:mm:ss');

  const logTypeConfig = {
    info: {color: ''},
    success: {color: 'green'},
    warn: {color: 'yellow'},
    error: {color: 'red'},
    debug: {color: 'magenta'},
  };

  const logCategoryConfig = {
    loadEvent: {color: 'cyan'},
    event: {color: 'yellow'},
    loadCommand: {color: 'magenta'},
    command: {color: 'blue'},
  };

  const processTypeConfig= {
    node: {color: 'green'},
    discord: {color: 'blue'},
  };

  const logTypeColor = logTypeConfig[logType]?.color || '';
  const processTypeColor = processTypeConfig[processType]?.color || '';
  const logCategoryColor = logCategoryConfig[logCategory]?.color || '';

  logType = logTypeColor ?
    logType.toUpperCase()[logTypeColor] :
    logType.toUpperCase();

  processType = processTypeColor ?
    processType.toUpperCase()[processTypeColor] :
    processType.toUpperCase();

  logCategory = logCategoryColor ?
    logCategory.toUpperCase()[logCategoryColor] :
    logCategory.toUpperCase();

  console.log(`[${TIMESTAMP}]`,
      `[${processType}]`,
      `[${logType}]`,
      `[${logCategory}]`,
      message,
  );
};


module.exports = log;
