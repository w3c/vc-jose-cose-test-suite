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
    // 'issuance_checks': {
    //   'format': 'jwt_compact',
    //   'signature_valid': true,
    //   'signing_key': TestVerificationMethods.p256,
    //   'required_fields': ['type', 'issuer', 'credentialSubject'],
    // },
  },

  '2. JWT Complex Credential Issuance': {
    'number': 2,
    'input_file': 'credential-full.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
    // 'issuance_checks': {
    //   'format': 'jwt_compact',
    //   'signature_valid': true,
    //   'signing_key': TestVerificationMethods.p384,
    //   'required_fields': ['type', 'issuer', 'credentialSubject', 'evidence', 'termsOfUse'],
    // },
  },

  '3. JWT Basic Presentation Issuance': {
    'number': 3,
    'input_file': 'presentation-single.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_jose,
    'expected_result': TestResult.success,
    // 'issuance_checks': {
    //   'format': 'jwt_compact',
    //   'signature_valid': true,
    //   'signing_key': TestVerificationMethods.p256,
    //   'required_fields': ['type', 'verifiableCredential'],
    // },
  },

  '4. JWT Complex Presentation Issuance': {
    'number': 4,
    'input_file': 'presentation-multiple.json',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_jose,
    'expected_result': TestResult.success,
    // 'issuance_checks': {
    //   'format': 'jwt_compact',
    //   'signature_valid': true,
    //   'signing_key': TestVerificationMethods.p521,
    //   'required_fields': ['type', 'verifiableCredential'],
    // },
  },

  '5. JWT Basic Credential Verification': {
    'number': 5,
    'input_file': 'credential-minimal-signed.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
    // 'verification_checks': {
    //   'expected_result': TestResult.success,
    // },
  },

  '6. JWT Presentation Verification': {
    'number': 6,
    'input_file': 'presentation-multiple-signed.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_jose,
    'expected_result': TestResult.success,
    // 'verification_checks': {
    //   'expected_result': TestResult.success,
    // },
  },

  '7. JWT Issuer Match Verification': {
    'number': 7,
    'input_file': 'credential-issuer-match-signed.json',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'expected_result': TestResult.success,
    // 'verification_checks': {
    //   'expected_result': TestResult.failure,
    //   'expected_error': TestError.INVALID_ISSUER,
    // },
  },

  // '8. JWT Issuer as URL without a kid': {
  //   'number': 8,
  //   'input_file': 'credential-issuer-url-no-kid-signed.json',
  //   'key_file': TestVerificationMethods.ed25519,
  //   'fn': TestFunction.verify,
  //   'feature': TestFeature.credential_jose,
  //   'expected_result': TestResult.success,
  // },
};

export const SDJWTTestMapping = {
  '9. SD-JWT Basic Credential Issuance': {
    'number': 9,
    'input_file': 'credential-selective.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_sdjwt,
    'expected_result': TestResult.success,
    'disclosure_paths': ['credentialSubject.firstName', 'credentialSubject.lastName'],
  },

  '10. SD-JWT Complex Credential Issuance': {
    'number': 10,
    'input_file': 'credential-nested-selective.json',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_sdjwt,
    'expected_result': TestResult.success,
    'disclosure_paths': ['credentialSubject.address.street', 'credentialSubject.address.city', 'credentialSubject.phoneNumbers[0]'],
  },

  '11. SD-JWT Presentation Issuance': {
    'number': 11,
    'input_file': 'presentation-selective.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_sdjwt,
    'expected_result': TestResult.success,
    'disclosure_paths': ['holder', 'verifiableCredential[0]'],
  },

  '12. SD-JWT Basic Credential Verification': {
    'number': 12,
    'input_file': 'credential-selective-signed.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_sdjwt,
    'expected_result': TestResult.success,
  },

  '13. SD-JWT Complex Credential Verification': {
    'number': 13,
    'input_file': 'credential-nested-selective-signed.json',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_sdjwt,
    'expected_result': TestResult.success,
  },

  '14. SD-JWT Presentation Verification': {
    'number': 14,
    'input_file': 'presentation-selective-signed.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_sdjwt,
    'expected_result': TestResult.success,
  },
};

export const COSETestMapping = {
  '15. COSE Basic Credential Issuance': {
    'number': 15,
    'input_file': 'credential-minimal.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_cose,
    'expected_result': TestResult.success,
    // 'issuance_checks': {
    //   'format': 'cose_sign1',
    //   'signature_valid': true,
    //   'signing_key': TestVerificationMethods.p256,
    //   'required_fields': ['type', 'issuer', 'credentialSubject'],
    // },
  },

  '16. COSE Basic Presentation Issuance': {
    'number': 16,
    'input_file': 'presentation-single.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_cose,
    'expected_result': TestResult.success,
    // 'issuance_checks': {
    //   'format': 'cose_sign1',
    //   'signature_valid': true,
    //   'signing_key': TestVerificationMethods.p384,
    //   'required_fields': ['type', 'verifiableCredential'],
    //   'encoding_valid': true,
    // },
  },

  '17. COSE Basic Credential Verification': {
    'number': 17,
    'input_file': 'credential-minimal-cose-signed.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_cose,
    'expected_result': TestResult.success,
  },

  '18. COSE Basic Presentation Verification': {
    'number': 18,
    'input_file': 'presentation-single-cose-signed.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_cose,
    'expected_result': TestResult.success,
  },
};
