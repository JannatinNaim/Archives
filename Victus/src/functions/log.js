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
function log(
    message,
    logType = 'info',
    processType = 'general',
    logCategory = 'base',
) {
  // Current timestamp.
  const TIMESTAMP = moment().format('YYYY-MM-DD HH:mm:ss');

  // Set category, type, and process colors to default if invalid.
  const logTypeColor = logTypeConfig[logType]?.color || '';
  const processTypeColor = processTypeConfig[processType]?.color || '';
  const logCategoryColor = logCategoryConfig[logCategory]?.color || '';

  // Colored uppercase or regular uppercase log type.
  logType = logTypeColor ?
    logType.toUpperCase()[logTypeColor] :
    logType.toUpperCase();

  // Colored uppercase or regular uppercase process type.
  processType = processTypeColor ?
    processType.toUpperCase()[processTypeColor] :
    processType.toUpperCase();

  // Colored uppercase or regular uppercase log category.
  logCategory = logCategoryColor ?
    logCategory.toUpperCase()[logCategoryColor] :
    logCategory.toUpperCase();

  // Log message to console.
  console.log(`[${TIMESTAMP}]`,
      `[${processType}]`,
      `[${logType}]`,
      `[${logCategory}]`,
      message,
  );
}


module.exports = log;
