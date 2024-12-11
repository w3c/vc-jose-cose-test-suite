# VC JOSE COSE Test Suite

This project provides a flexible and extensible test suite runner for validating implementations of the specification
for securing [W3C Verifiable Credentials using JSON Object Signing and Encryption (JOSE) and CBOR Object Signing and
Encryption (COSE)](https://www.w3.org/TR/vc-jose-cose).

It's designed to work with different types of implementations (SDK or server) as long as they conform to a common CLI
interface via [Docker](https://www.docker.com/).

The suite makes use Digital Bazaar's [mocha-w3c-interop-reporter](https://github.com/digitalbazaar/mocha-w3c-interop-reporter).

## Table of Contents

1. [Project Structure](#project-structure)
2. [Key Components](#key-components)
3. [Adding Implementations](#adding-implementations)
4. [Running Tests](#running-tests)
5. [Extending the Test Suite](#extending-the-test-suite)
6. [Docker Integration](#docker-integration)
7. [Troubleshooting](#troubleshooting)

## Project Structure

```
.
├── implementations/
│   ├── compose.yml
│   ├── implementations.json
│   └── [implementation folders]
├── tests/
│   ├── input/
│   └── output/
├── reports/
│   ├── index.html
│   └── suite.log
├── test-mapping.js
├── test-runner.js
├── test-util.js
└── README.md
```

## Key Components

### test-mapping.js

This file defines the structure of the test suite. It exports two main objects:

1. `TestResult`: An enum of possible test outcomes (success, failure, indeterminate, error).
2. `GenericTestMapping`: A mapping of test names to their configurations. Each test configuration includes:
    - `number`: A unique identifier for the test
    - `input_file`: The name of the input file to be used
    - `config`: Configuration options for the test, including the `check` property which determines the feature being tested
    - `expected_result`: The expected outcome of the test

### test-runner.js

This is the main test runner script. It:

1. Loads the implementations and their supported features
2. Iterates through each implementation and test
3. Skips tests for features not supported by an implementation
4. Runs the tests and compares the results to the expected outcomes
5. Generates a report of the test results

### test-util.js

This file contains utility functions used by the test runner:

1. `generateTestResults`: Executes the Docker command to run a test for a specific implementation
2. `checkTestResults`: Reads and interprets the results of a test execution

## Adding Implementations

To add a new implementation:

1. Create a new folder in the `implementations/` directory with your implementation name.
2. Add your implementation files, including a Dockerfile that sets up your environment.
3. Update `implementations/implementations.json` to include your new implementation and its supported features:

```json
{
  "your-implementation-name": {
    "features": {
      "feature1": true,
      "feature2": false,
      "feature3": true
    }
  }
}
```

Note: if your implementation does not support a feature, set the value to `false`. This will cause the test runner to
skip tests for that feature.

4. Update `implementations/compose.yml` to include your new service:

```yaml
services:
  your-implementation-name:
    build: ./your-implementation-name
    volumes:
      - ../tests/input:/tests/input
      - ../tests/output:/tests/output
```

## Running Tests

To run the test suite:

1. Ensure Docker and [Docker Compose](https://docs.docker.com/compose/) are installed on your system.
2. Navigate to the project root directory.
3. Run the test runner script (the exact command may vary based on your setup, e.g., `node test-runner.js`).

There is also an npm script that can be used to run the test suite:

```sh
npm run test
```

The test runner will execute each test for each implementation and generate a report in the `reports/` directory.

## Extending the Test Suite

To add new tests:

1. Add any necessary input files to the `tests/input/` directory.
2. Update `test-mapping.js` to include the new test configurations.
3. If testing a new feature, ensure implementations are updated to declare support (or lack thereof) for the new feature.

## Docker Integration

Each implementation should provide a Docker container that exposes a CLI with the following interface:

```
validate --input <input_file> --config '<config_json>' --output <output_file>
```

- `<input_file>`: Path to the input file within the container
- `<config_json>`: JSON string containing test configuration
- `<output_file>`: Path where the output should be written within the container

The Docker containers are run using Docker Compose, with volumes mounted to provide access to the input and output directories.

This configuration setup is designed to be flexible and can be modified to suit the specific requirements of each implementation,
though it can be modified to suit the specific requirements of a given test suite.

## Troubleshooting

If you encounter issues:

1. Check the console output for error messages.
2. Verify that all necessary files exist in the expected locations.
3. Ensure Docker containers have the necessary permissions to read input and write output.
4. Check that implementations correctly handle the provided CLI arguments.

For more detailed debugging:
- Add console.log statements in the test runner or utility functions.
- Inspect the Docker container logs for implementation-specific issues.

---

For any questions or issues not covered in this README, please open an issue in the project repository.
