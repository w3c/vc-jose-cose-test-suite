export const TestResult = {
  success: 'success',
  failure: 'failure',
  indeterminate: 'indeterminate',
  error: 'error',
};

export const TestFeature = {
  credential_jose: 'credential_jose',
  credential_cose: 'credential_cose',
  credential_sdjwt: 'credential_sdjwt',
  presentation_jose: 'presentation_jose',
  presentation_cose: 'presentation_cose',
  presentation_sdjwt: 'presentation_sdjwt',
};

export const TestFunction = {
  issue: 'issue',
  verify: 'verify',
};

const TestVerificationMethods = {
  p256: 'cid-p256.json',
  p384: 'cid-p384.json',
  p521: 'cid-p521.json',
  ed25519: 'cid-ed25519.json',
};

// See README.md for details
export const TestMapping = {
  'Requirement 1: ': {
    'number': 1,
    'input_file': '1-credential.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
  },
};
