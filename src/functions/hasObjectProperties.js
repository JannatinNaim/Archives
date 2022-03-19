const {oneLine} = require('common-tags');

const getFileNameAndCategory = require('./getFileNameAndCategory');


/**
 * Validate required object properties.
 * @param {Array} requiredProperties Required properties.
 * @param {Object} object Object to check properties.
 * @param {String} objectFilePath Object file path.
 */
function hasObjectProperties(requiredProperties, object, objectFilePath) {
  requiredProperties.forEach(function(property) {
    // If object doesn't have required properties, throw error.
    if (!Object.keys(object).includes(property)) {
      // Get object file name and category.
      const [
        objectFileName, objectFileCategory,
      ] = getFileNameAndCategory(objectFilePath);

      // Report on invalid object properties.
      throw new Error(
          oneLine`
          INVALID PROPERTIES:
          ${objectFileCategory}/${objectFileName}
          does not have required properties.
          ${requiredProperties.join(' | ')}
          `,
      );
    }
  });
}


module.exports = hasObjectProperties;
