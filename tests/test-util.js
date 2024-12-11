import * as fs from 'fs';
import shell from 'shelljs';
import {TestResult} from './test-mapping.js';

/**
 * generateTestResults is a function that runs the tests for a given implementation
 * @param {string} impl - The name of the implementation
 * @param {Object} testConfig - Data associated with the test
 * @return {Promise<void>} - A promise that resolves after the tests are run
 */
export async function generateTestResults(impl, testConfig) {
  const command = `
docker compose -f ./implementations/compose.yml run --rm ${impl} ${testConfig.fn} \
  --input /tests/input/${testConfig.input_file} \
  --key /tests/input/${testConfig.key_file} \
  --feature '${testConfig.feature}' \
  --output /tests/output/${testConfig.number}-${impl}.json
`;

  console.log(`Executing command: ${command}`);
  const {code, stdout, stderr} = await shell.exec(command, {silent: false});
  if (code !== 0) {
    console.warn(`Command exited with code ${code}`);
    console.warn(`stdout: ${stdout}`);
    console.warn(`stderr: ${stderr}`);
  }
  await sleep(150); // Sleep for 150 milliseconds (0.15 seconds)
}

/**
 * checkTestResults is a function that reads the output of the tests
 * @param {string} impl - The name of the implementation
 * @param {Object} testConfig - Data associated with the test
 * @return {string} - The result of the test
 */
export async function checkTestResults(impl, testConfig) {
  const outputFile = `./tests/output/${testConfig.number}-${impl}.json`;
  try {
    const jsonData = await fs.promises.readFile(outputFile, 'utf8');
    const data = JSON.parse(jsonData);
    // Map the result to match TestResult enum
    switch (data.result) {
      case 'success':
        return TestResult.success;
      case 'failure':
        return TestResult.failure;
      case 'indeterminate':
        return TestResult.indeterminate;
      default:
        return TestResult.error;
    }
  } catch (err) {
    console.log(`\nError reading or parsing test result: ${err}\n`);
    return TestResult.error;
  }
}

/**
 * sleep is a function that waits for a given amount of time
 * @param {number} ms - The amount of time to wait in milliseconds
 * @return {Promise<unknown>} - A promise that resolves after the given amount of time
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
