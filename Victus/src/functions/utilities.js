const {oneLine} = require('common-tags');


/**
 * Get file name and category from file path.
 * @param {String} filePath File path.
 * @return {Array} File name and category.
 */
function getFileNameAndCategory(filePath) {
  // Split file path into an array.
  const filePathArray = filePath.split('/');

  // Last item in path array is file name.
  const fileName = filePathArray[filePathArray.length - 1];
  // Second to last item in path array is file category.
  const fileCategory = filePathArray[filePathArray.length - 2];

  // Return array of file name and file category.
  return [fileName, fileCategory];
}


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


module.exports = {getFileNameAndCategory, hasObjectProperties};
