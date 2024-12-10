export const TestResult = {
  success: 'success',
  failure: 'failure',
  indeterminate: 'indeterminate',
  error: 'error',
  skipped: 'skipped',
};

export const TestFeature = {
  credential_jose: 'credential_jose',
  credential_cose: 'cose',
  credential_sdjwt: 'sdjwt',
  presentation_jose: 'presentation_jose',
  presentation_cose: 'presentation_cose',
  presentation_sdjwt: 'presentation_sdjwt',
};

export const TestFunction = {
  issue: 'issue',
  verify: 'verify',
};

const TestKeys = {
  p256: 'p256-jwk.json',
  p384: 'p384-jwk.json',
  p521: 'p521-jwk.json',
  ed25519: 'ed25519-jwk.json',
};

// See README.md for details
export const TestMapping = {
  'Requirement 1: ': {
    'number': 1,
    'input_file': '1-credential.json',
    'key_file': TestKeys.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
  },
};
