import fs from 'fs';

const implementationsFile = './implementations/implementations.json';

/**
 * Retrieves a list of implementations with their features from a JSON file.
 * Each implementation is expected to have a name and a set of features.
 * Only implementations with at least one feature are returned.
 *
 * @return {Array<Object>} An array of implementation objects, each augmented with its name.
 * If an error occurs during file reading or parsing, an empty array is returned.
 */
export function implementationsWithFeatures() {
  let implementationsData;
  try {
    const fileContent = fs.readFileSync(implementationsFile, 'utf8');
    implementationsData = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading or parsing implementations file:', error);
    return [];
  }

  return Object.entries(implementationsData)
      .map(([name, impl]) => ({name, ...impl}))
      .filter((impl) => impl.features && Object.keys(impl.features).length > 0);
}

/**
 * Retrieves the features of a specific implementation by name.
 * The features are read from a JSON file specified by `implementationsFile`.
 *
 * @param {string} implName The name of the implementation to retrieve features for.
 * @return {Object} An object containing the features of the specified implementation.
 * If the implementation does not exist or an error occurs, an empty object is returned.
 */
export function getImplementationFeatures(implName) {
  const implementationsData = JSON.parse(fs.readFileSync(implementationsFile, 'utf8'));
  return implementationsData[implName]?.features;
}
