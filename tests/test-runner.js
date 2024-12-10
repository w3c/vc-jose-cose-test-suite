import chai from 'chai';
import {getImplementationFeatures, implementationsWithFeatures} from '../implementations/index.js';
import {checkTestResults, generateTestResults} from './test-util.js';
import {TestMapping} from './test-mapping.js';

const should = chai.should();

describe('Generic Test Suite', function() {
  const impls = implementationsWithFeatures();
  console.log('Implementations with features:', JSON.stringify(impls, null, 2));

  const implNames = impls.map((i) => i.name);
  console.log('Implementation names:', implNames);

  this.matrix = true;
  this.report = true;
  this.implemented = [...implNames];
  this.rowLabel = 'Test Name';
  this.columnLabel = 'Implementation';

  for (const i of impls) {
    describe(i.name, function() {
      const features = getImplementationFeatures(i.name);
      console.log(`Features for ${i.name}:`, JSON.stringify(features, null, 2));

      for (const [testName, testConfig] of Object.entries(TestMapping)) {
        const requiredFeature = testConfig.config.feature;

        it(testName, async function() {
          if (!features[requiredFeature]) {
            console.log(`Skipping test "${testName}" for ${i.name} due to missing feature: ${requiredFeature}`);
            this.skip();
            return;
          }

          console.log(`Running test: ${testName} for implementation: ${i.name}`);
          await generateTestResults(i.name, testConfig);
          this.test.cell = {columnId: i.name, rowId: testName};
          const result = await checkTestResults(i.name, testConfig);
          console.log(`Test result for ${i.name} - ${testName}: ${result}`);
          should.equal(result, testConfig.expected_result);

          // Log the test result in a format that matches the report generator's expectations
          console.log(`Reporter data: ${this.test.cell.columnId},${this.test.cell.rowId},${result}`);
        });
      }
    });
  }
});
