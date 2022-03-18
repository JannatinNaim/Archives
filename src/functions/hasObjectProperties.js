const {oneLine} = require('common-tags');


/**
 * Validate
 * @param {Array} requiredProperties Array of required properties.
 * @param {Object} object Event object to check for required properties.
 * @param {String} objectFilePath Event file path.
 */
function hasObjectProperties(requiredProperties, object, objectFilePath) {
  const objectFilePathArray = objectFilePath.split('/');

  requiredProperties.forEach((property) => {
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
