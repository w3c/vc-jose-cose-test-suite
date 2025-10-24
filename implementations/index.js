import {allImplementations, filterImplementations} from 'vc-test-suite-implementations';

/**
 * Retrieves a list of implementations with their features from a JSON file.
 * Each implementation is expected to have a name and a set of features.
 * Only implementations with at least one feature are returned.
 *
 * @return {Array<Object>} An array of implementation objects, each augmented with its name.
 * If an error occurs during file reading or parsing, an empty array is returned.
 */
export function implementationsWithFeatures() {
  // Filter `allImplementations` to only include those with a `jose-cose` object
  const filter = ({value}) =>
    value.settings?.['jose-cose']?.features !== undefined;
  const {match} = filterImplementations({allImplementations, filter});
  return match;
}

/**
 * Retrieves a list of implementation names that have features defined.
 *
 * @return {Array<string>} An array of implementation names.
 */
export function listImplementationNamesWithFeatures() {
  return Array.from(implementationsWithFeatures().values().map((i) => i.settings.name));
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
  return allImplementations.get(implName).settings?.['jose-cose']?.features;
}
