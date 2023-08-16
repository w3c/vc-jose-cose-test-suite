
# Test Suite for the [vc-jose-cose specification](https://www.w3.org/TR/vc-jose-cose/)

## Approach

We generate testcases that cover the core data model and securing specification normative statements.

We generate inputs and outputes for each case, so that implementations can consume the test cases when demonstrating conformance.

The structure of each test case is captured in a single yaml file, of the form:

### `testcases/test-case-name/spec.yml`

This file describes the test case, and provides all required inputs and expected outputs.

This file is a reference document, it may contain structures that look like conforming documents, 
and representation of the results of validation rules against those documents, specifically schema or status validation results. 

The validation results are meant to assist implementers and provide clarity regarding the differences between verifification and validation.

### `testcases/test-case-name/payload.json`

This file represents the verifiable credential or presentation. 

Examples are hosted via github pages:

- https://w3c.github.io/vc-jose-cose-test-suite/testcases/unsecured-vc/payload.json

### `testcases/test-case-name/protected-header.json`

This file represents the verifiable credential or presentation metadata, including hints related to discovering key material and content types.

Examples are hosted via github pages:

- https://w3c.github.io/vc-jose-cose-test-suite/testcases/unsecured-vc/protected-header.json

### `testcases/test-case-name/schema.json`

This file represents a json schema, per https://github.com/w3c/vc-json-schema

Example schema is hoested for testing purposes:

- https://w3c.github.io/vc-jose-cose-test-suite/testcases/secured-vc-with-schema/schema.json

### `testcases/test-case-name/schema.jwt`

This file represents a json schema credential, per https://github.com/w3c/vc-json-schema

Example schema credential is hostes for testing purposes:

- https://w3c.github.io/vc-jose-cose-test-suite/testcases/secured-vc-with-schema-credential/schema.jwt

### `testcases/test-case-name/status-list.jwt`

Example status list is hosted for testing purposes:

- https://w3c.github.io/vc-jose-cose-test-suite/testcases/secured-vc-status-list/status-list.jwt

This file represents a status list credential, per https://github.com/w3c/vc-status-list-2021



