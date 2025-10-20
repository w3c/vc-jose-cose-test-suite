import chai from 'chai';
import {getImplementationFeatures, listImplementationNamesWithFeatures} from '../implementations/index.js';
import {checkTestResults, generateTestResults} from './test-util.js';
import {COSETestMapping, JOSETestMapping, SDJWTTestMapping} from './test-mapping.js';

const should = chai.should();

const testMappingSuites = [
  {name: 'JOSE Tests', mapping: JOSETestMapping},
  {name: 'SD-JWT Tests', mapping: SDJWTTestMapping},
  {name: 'COSE Tests', mapping: COSETestMapping},
];

for (const {name: suiteName, mapping} of testMappingSuites) {
  describe(suiteName, function() {
    const implNames = listImplementationNamesWithFeatures();
    console.log('Implementations with features:', implNames);

    // Set up matrix reporting properties
    this.matrix = true;
    this.report = true;
    this.implemented = [...implNames];
    this.rowLabel = 'Test Name';
    this.columnLabel = 'Implementation';

    for (const name of implNames) {
      describe(name, function() {
        const features = getImplementationFeatures(name);
        console.log(`Features for ${name}:`, JSON.stringify(features, null, 2));

        for (const [testName, testConfig] of Object.entries(mapping)) {
          const requiredFeature = testConfig.feature;

          it(testName, async function() {
            if (!features[requiredFeature]) {
              console.log(`Skipping test "${testName}" for ${name} due to missing feature: ${requiredFeature}`);
              this.skip();
              return;
            }

            console.log(`Running test: ${testName} for implementation: ${name}`);
            await generateTestResults(name, testConfig);
            this.test.cell = {columnId: name, rowId: testName};
            const result = await checkTestResults(name, testConfig);
            console.log(`Test result for ${name} - ${testName}: ${result}`);
            should.equal(result, testConfig.expected_result);

            // Log the test result in a format that matches the report generator's expectations
            console.log(`Reporter data: ${this.test.cell.columnId},${this.test.cell.rowId},${result}`);
          });
        }
      });
    }
  });
}
