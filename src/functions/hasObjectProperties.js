const {oneLine} = require('common-tags');


/**
 * Validate required object properties.
 * @param {Array} requiredProperties Required properties.
 * @param {Object} object Object to check properties.
 * @param {String} objectFilePath Object file path.
 */
function hasObjectProperties(requiredProperties, object, objectFilePath) {
  const objectFilePathArray = objectFilePath.split('/');

  requiredProperties.forEach(function(property) {
    if (!Object.keys(object).includes(property)) {
      const objectFileName = objectFilePathArray[
          objectFilePathArray.length - 1
      ];
      const objectFileCategory = objectFilePathArray[
          objectFilePathArray.length - 2
      ];

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
