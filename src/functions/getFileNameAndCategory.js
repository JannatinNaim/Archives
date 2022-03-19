/**
 * Get file name and category from file path.
 * @param {String} filePath File path.
 * @return {Array} File name and category.
 */
function getFileNameAndCategory(filePath) {
  const filePathArray = filePath.split('/');

  const fileName = filePathArray[filePathArray.length - 1];
  const fileCategory = filePathArray[filePathArray.length - 2];

  return [fileName, fileCategory];
}


module.exports = getFileNameAndCategory;
