export const TestResult = {
  success: 'success',
  failure: 'failure',
  indeterminate: 'indeterminate',
  error: 'error',
};

export const TestFeature = {
  credential_jose: 'credential_jose',
  credential_sdjwt: 'credential_sdjwt',
  credential_cose: 'credential_cose',
  presentation_jose: 'presentation_jose',
  presentation_sdjwt: 'presentation_sdjwt',
  presentation_cose: 'presentation_cose',
};

export const TestFunction = {
  issue: 'issue',
  verify: 'verify',
};

const TestVerificationMethods = {
  p256: 'vm-p256.json',
  p384: 'vm-p384.json',
  p521: 'vm-p521.json',
  ed25519: 'vm-ed25519.json',
  didEd25519: 'vm-did-ed25519.json',
};

export const TestError = {
  INVALID_SIGNATURE: 'INVALID_SIGNATURE',
  MISSING_REQUIRED_FIELDS: 'MISSING_REQUIRED_FIELDS',
  INVALID_MEDIA_TYPE: 'INVALID_MEDIA_TYPE',
  INVALID_DISCLOSURE: 'INVALID_DISCLOSURE',
  INVALID_ENCODING: 'INVALID_ENCODING',
  INVALID_CLAIMS: 'INVALID_CLAIMS',
  INVALID_ISSUER: 'INVALID_ISSUER',
};

// See README.md for details
export const JOSETestMapping = {
  '1. JWT Basic Credential Issuance': {
    'number': 1,
    'input_file': 'credential-minimal.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
  },

  '2. JWT Credential Issuance with All Optional Fields': {
    'number': 2,
    'input_file': 'credential-full.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
  },

  '3. JWT Basic Presentation Issuance': {
    'number': 3,
    'input_file': 'presentation-single.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_jose,
    'expected_result': TestResult.success,
  },

  '4. JWT Complex Presentation Issuance': {
    'number': 4,
    'input_file': 'presentation-multiple.json',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_jose,
    'expected_result': TestResult.success,
  },

  '5. JWT Issuance with Unknown Extensions': {
    'number': 5,
    'input_file': 'credential-unknown-extensions.json',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.failure,
  },

  '6. JWT Basic Credential Verification': {
    'number': 6,
    'input_file': 'credential-minimal-signed.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
  },

  '7. JWT Presentation Verification': {
    'number': 7,
    'input_file': 'presentation-multiple-signed.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_jose,
    'expected_result': TestResult.success,
  },

  '8. JWT Issuer Match Verification': {
    'number': 8,
    'input_file': 'credential-issuer-match-signed.json',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
  },

  '9. JWT Verification With Unknown Extensions': {
    'number': 9,
    'input_file': 'credential-unknown-extensions-signed.json',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.failure,
  },
};

export const SDJWTTestMapping = {
  '10. SD-JWT Basic Credential Issuance': {
    'number': 10,
    'input_file': 'credential-selective.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_sdjwt,
    'disclosure_paths': ['credentialSubject.firstName', 'credentialSubject.lastName'],
    'expected_result': TestResult.success,
  },

  '11. SD-JWT Complex Credential Issuance': {
    'number': 11,
    'input_file': 'credential-nested-selective.json',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_sdjwt,
    'disclosure_paths': ['credentialSubject.address.street', 'credentialSubject.address.city', 'credentialSubject.phoneNumbers[0]'],
    'expected_result': TestResult.success,
  },

  '12. SD-JWT Presentation Issuance': {
    'number': 12,
    'input_file': 'presentation-selective.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_sdjwt,
    'disclosure_paths': ['holder', 'verifiableCredential[0]'],
    'expected_result': TestResult.success,
  },

  '13. SD-JWT Basic Credential Verification': {
    'number': 12,
    'input_file': 'credential-selective-signed.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_sdjwt,
    'expected_result': TestResult.success,
  },

  '14. SD-JWT Complex Credential Verification': {
    'number': 13,
    'input_file': 'credential-nested-selective-signed.json',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_sdjwt,
    'expected_result': TestResult.success,
  },

  '15. SD-JWT Presentation Verification': {
    'number': 14,
    'input_file': 'presentation-selective-signed.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_sdjwt,
    'expected_result': TestResult.success,
  },
};

export const COSETestMapping = {
  '16. COSE Basic Credential Issuance': {
    'number': 16,
    'input_file': 'credential-minimal.json',
    'key_file': TestVerificationMethods.didEd25519,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_cose,
    'expected_result': TestResult.success,
  },

  '17. COSE Basic Presentation Issuance': {
    'number': 17,
    'input_file': 'presentation-single.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_cose,
    'expected_result': TestResult.success,
  },

  '18. COSE Basic Credential Verification': {
    'number': 18,
    'input_file': 'credential-minimal-cose-signed.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_cose,
    'expected_result': TestResult.success,
  },

  '19. COSE Credential Verification Incorrect Encoding': {
    'number': 19,
    'input_file': 'credential-minimal-cose-signed-not-base64.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_cose,
    'expected_result': TestResult.failure,
  },

  '20. COSE Basic Presentation Verification': {
    'number': 20,
    'input_file': 'presentation-single-cose-signed.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_cose,
    'expected_result': TestResult.success,
  },
};
