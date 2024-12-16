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
    'input_file': 'credential-jose-minimal.txt',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
  },

  '7. JWT Presentation Verification': {
    'number': 7,
    'input_file': 'presentation-jose-multiple.txt',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_jose,
    'expected_result': TestResult.success,
  },

  '8. JWT Issuer Match Verification': {
    'number': 8,
    'input_file': 'credential-issuer-match-signed.txt',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
  },

  '9. JWT Verification With Unknown Extensions': {
    'number': 9,
    'input_file': 'credential-jose-unknown-extensions.txt',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.failure,
  },

  '10. JWT Unsecured Credential Verification': {
    'number': 10,
    'input_file': 'credential-minimal.json',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.failure,
  },

  '11. JWT Unsecured Presentation Verification': {
    'number': 11,
    'input_file': 'presentation-single.json',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_jose,
    'expected_result': TestResult.failure,
  },

  '12. JWT Credential with an Invalid Signature': {
    'number': 12,
    'input_file': 'credential-jose-bad-signature.txt',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.failure,
  },

  '13. JWT Credential with an Invalid Media Type': {
    'number': 13,
    'input_file': 'credential-jose-bad-media-type.txt',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.failure,
  },

  '14. JWT Presentation with an Invalid Media Type': {
    'number': 14,
    'input_file': 'presentation-jose-bad-media-type.txt',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_jose,
    'expected_result': TestResult.failure,
  },

  '15. JWT Credential with vc and/or vp Claims': {
    'number': 15,
    'input_file': 'credential-jose-vc-vp-claims.txt',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.failure,
  },

  '16. JWT Presentation with Invalid Credential': {
    'number': 16,
    'input_file': 'presentation-jose-bad-credential.txt',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_jose,
    'expected_result': TestResult.failure,
  },
};

export const SDJWTTestMapping = {
  '17. SD-JWT Basic Credential Issuance': {
    'number': 17,
    'input_file': 'credential-selective.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_sdjwt,
    'disclosure_paths': ['credentialSubject.firstName', 'credentialSubject.lastName'],
    'expected_result': TestResult.success,
  },

  '18. SD-JWT Complex Credential Issuance': {
    'number': 18,
    'input_file': 'credential-nested-selective.json',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_sdjwt,
    'disclosure_paths': ['credentialSubject.address.street', 'credentialSubject.address.city', 'credentialSubject.phoneNumbers[0]'],
    'expected_result': TestResult.success,
  },

  '19. SD-JWT Presentation Issuance': {
    'number': 19,
    'input_file': 'presentation-selective.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_sdjwt,
    'disclosure_paths': ['holder', 'verifiableCredential[0]'],
    'expected_result': TestResult.success,
  },

  '20. SD-JWT Basic Credential Verification': {
    'number': 20,
    'input_file': 'credential-sdjwt-selective.txt',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_sdjwt,
    'expected_result': TestResult.success,
  },

  '21. SD-JWT Complex Credential Verification': {
    'number': 21,
    'input_file': 'credential-sdjwt-nested.txt',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_sdjwt,
    'expected_result': TestResult.success,
  },

  '23. SD-JWT Credential With an Invalid Signature': {
    'number': 23,
    'input_file': 'credential-sdjwt-bad-signature.txt',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_sdjwt,
    'expected_result': TestResult.failure,
  },

  '24. SD-JWT Credential with an Invalid Media Type': {
    'number': 24,
    'input_file': 'credential-sdjwt-bad-media-type.txt',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_sdjwt,
    'expected_result': TestResult.failure,
  },

  '25. SD-JWT Presentation with an Invalid Media Type': {
    'number': 25,
    'input_file': 'presentation-sdjwt-bad-media-type.txt',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_sdjwt,
    'expected_result': TestResult.failure,
  },

  '26. SD-JWT Presentation with Invalid Credentials': {
    'number': 26,
    'input_file': 'presentation-sdjwt-bad-credential.txt',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_sdjwt,
    'expected_result': TestResult.failure,
  },
};

export const COSETestMapping = {
  '27. COSE Basic Credential Issuance': {
    'number': 27,
    'input_file': 'credential-minimal.json',
    'key_file': TestVerificationMethods.didEd25519,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_cose,
    'expected_result': TestResult.success,
  },

  '28. COSE Basic Presentation Issuance': {
    'number': 28,
    'input_file': 'presentation-single.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_cose,
    'expected_result': TestResult.success,
  },

  '29. COSE Basic Credential Verification': {
    'number': 29,
    'input_file': 'credential-cose-minimal.txt',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_cose,
    'expected_result': TestResult.success,
  },

  '30. COSE Credential Verification Incorrect Encoding': {
    'number': 30,
    'input_file': 'credential-cose-minimal-not-base64.txt',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_cose,
    'expected_result': TestResult.failure,
  },

  '31. COSE Basic Presentation Verification': {
    'number': 31,
    'input_file': 'presentation-cose-single.txt',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_cose,
    'expected_result': TestResult.success,
  },

  '32. COSE Credential With an Invalid Signature': {
    'number': 32,
    'input_file': 'credential-cose-bad-signature.txt',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_cose,
    'expected_result': TestResult.failure,
  },

  '33. COSE Credential with an Invalid Media Type': {
    'number': 33,
    'input_file': 'credential-cose-bad-media-type.txt',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_cose,
    'expected_result': TestResult.failure,
  },

  '34. COSE Presentation with an Invalid Media Type': {
    'number': 34,
    'input_file': 'presentation-cose-bad-media-type.txt',
    'key_file': TestVerificationMethods.p348,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_cose,
    'expected_result': TestResult.failure,
  },

  '35. COSE Presentation with Invalid Credentials': {
    'number': 35,
    'input_file': 'presentation-cose-bad-credential.txt',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_cose,
    'expected_result': TestResult.failure,
  },
};
