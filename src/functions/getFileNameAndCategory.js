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


module.exports = getFileNameAndCategory;
