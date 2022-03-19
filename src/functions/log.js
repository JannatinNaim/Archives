const moment = require('moment');

const {
  logTypeConfig,
  logCategoryConfig,
  processTypeConfig,
} = require('../settings/logConfig.json');


/**
 * Log output to console with categories, types, and processes.
 * @param {String} message Message.
 * @param {String} logType Type.
 * @param {String} processType Process.
 * @param {String} logCategory Category.
 */
async function log(
    message,
    logType = 'info',
    processType = 'general',
    logCategory = 'base',
) {
  const TIMESTAMP = moment().format('YYYY-MM-DD HH:mm:ss');

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
