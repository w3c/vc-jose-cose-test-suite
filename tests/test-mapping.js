export const TestResult = {
  success: 'success',
  failure: 'failure',
  indeterminate: 'indeterminate',
  error: 'error',
  skipped: 'skipped',
};

export const GenericTestMapping = {
  'Requirement 1: The credential must have a valid identifier (Valid)': {
    'number': 1,
    'input_file': 'valid-credential.json',
    'config': {'check': 'identifier'},
    'expected_result': TestResult.success,
  },
  'Requirement 1: The credential must have a valid identifier (Invalid)': {
    'number': 2,
    'input_file': 'invalid-identifier-credential.json',
    'config': {'check': 'identifier'},
    'expected_result': TestResult.failure,
  },
  'Requirement 2: The credential must have the correct type (Valid)': {
    'number': 3,
    'input_file': 'valid-credential.json',
    'config': {'check': 'type', 'expected_type': 'VerifiableCredential'},
    'expected_result': TestResult.success,
  },
  'Requirement 2: The credential must have the correct type (Invalid)': {
    'number': 4,
    'input_file': 'invalid-type-credential.json',
    'config': {'check': 'type', 'expected_type': 'VerifiableCredential'},
    'expected_result': TestResult.failure,
  },
  'Requirement 3: The credential must have a valid issuance date (Valid)': {
    'number': 5,
    'input_file': 'valid-credential.json',
    'config': {'check': 'issuance_date'},
    'expected_result': TestResult.success,
  },
  'Requirement 3: The credential must have a valid issuance date (Invalid)': {
    'number': 6,
    'input_file': 'invalid-issuance-date-credential.json',
    'config': {'check': 'issuance_date'},
    'expected_result': TestResult.failure,
  },
};
