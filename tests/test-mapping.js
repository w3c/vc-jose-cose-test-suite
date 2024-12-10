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
export const TestMapping = {
  'JWT Basic Credential Issuance': {
    'number': 1,
    'input_file': 'credential-minimal.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_jose,
    'issuance_checks': {
      'format': 'jwt_compact',
      'signature_valid': true,
      'signing_key': TestVerificationMethods.p256,
      'required_fields': ['type', 'issuer', 'credentialSubject'],
    },
  },

  'JWT Complex Credential Issuance': {
    'number': 2,
    'input_file': 'credential-full.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_jose,
    'issuance_checks': {
      'format': 'jwt_compact',
      'signature_valid': true,
      'signing_key': TestVerificationMethods.p384,
      'required_fields': ['type', 'issuer', 'credentialSubject', 'evidence', 'termsOfUse'],
    },
  },

  'JWT Basic Presentation Issuance': {
    'number': 3,
    'input_file': 'presentation-single.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_jose,
    'issuance_checks': {
      'format': 'jwt_compact',
      'signature_valid': true,
      'signing_key': TestVerificationMethods.p256,
      'required_fields': ['type', 'verifiableCredential'],
    },
  },

  'JWT Complex Presentation Issuance': {
    'number': 4,
    'input_file': 'presentation-multiple.json',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_jose,
    'issuance_checks': {
      'format': 'jwt_compact',
      'signature_valid': true,
      'signing_key': TestVerificationMethods.p521,
      'required_fields': ['type', 'verifiableCredential'],
    },
  },

  'JWT Basic Credential Verification': {
    'number': 5,
    'input_file': 'credential-minimal-signed.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'verification_checks': {
      'expected_result': TestResult.success,
    },
  },

  'JWT Presentation Verification': {
    'number': 6,
    'input_file': 'presentation-multiple-signed.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.presentation_jose,
    'verification_checks': {
      'expected_result': TestResult.success,
    },
  },

  'JWT Issuer Match Verification': {
    'number': 7,
    'input_file': 'credential-issuer-match.json',
    'key_file': TestVerificationMethods.ed25519,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'verification_checks': {
      'expected_result': TestResult.failure,
      'expected_error': TestError.INVALID_ISSUER,
    },
  },

  'SD-JWT Basic Credential Issuance': {
    'number': 9,
    'input_file': 'credential-selective.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_sdjwt,
    'issuance_checks': {
      'format': 'sd_jwt',
      'signature_valid': true,
      'signing_key': TestVerificationMethods.p384,
      'required_fields': ['type', 'issuer'],
      'selective_disclosure': {
        'required': ['type', 'issuer'],
        'disclosable': ['credentialSubject.firstName', 'credentialSubject.lastName'],
      },
    },
  },

  'SD-JWT Complex Credential Issuance': {
    'number': 10,
    'input_file': 'credential-nested-selective.json',
    'key_file': TestVerificationMethods.p521,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_sdjwt,
    'issuance_checks': {
      'format': 'sd_jwt',
      'signature_valid': true,
      'signing_key': TestVerificationMethods.p521,
      'required_fields': ['type', 'issuer'],
      'selective_disclosure': {
        'required': ['type', 'issuer'],
        'disclosable': [
          'credentialSubject.address.street',
          'credentialSubject.address.city',
          'credentialSubject.phoneNumbers[]',
        ],
      },
    },
  },

  'COSE Basic Credential Issuance': {
    'number': 15,
    'input_file': 'credential-cose.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.issue,
    'feature': TestFeature.credential_cose,
    'issuance_checks': {
      'format': 'cose_sign1',
      'signature_valid': true,
      'signing_key': TestVerificationMethods.p256,
      'required_fields': ['type', 'issuer', 'credentialSubject'],
    },
  },

  'COSE Presentation': {
    'number': 18,
    'input_file': 'presentation-cose.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.issue,
    'feature': TestFeature.presentation_cose,
    'issuance_checks': {
      'format': 'cose_sign1',
      'signature_valid': true,
      'signing_key': TestVerificationMethods.p384,
      'required_fields': ['type', 'verifiableCredential'],
      'encoding_valid': true,
    },
  },

  // Negative test cases
  'Invalid JWT Signature': {
    'number': 22,
    'input_file': 'credential-invalid-signature.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'verification_checks': {
      'expected_result': TestResult.failure,
      'expected_error': TestError.INVALID_SIGNATURE,
    },
  },

  'Missing Required JWT Claims': {
    'number': 23,
    'input_file': 'credential-missing-claims.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_jose,
    'verification_checks': {
      'expected_result': TestResult.failure,
      'expected_error': TestError.MISSING_REQUIRED_FIELDS,
    },
  },

  'Invalid SD-JWT Disclosure': {
    'number': 24,
    'input_file': 'credential-invalid-disclosure.json',
    'key_file': TestVerificationMethods.p384,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_sdjwt,
    'verification_checks': {
      'expected_result': TestResult.failure,
      'expected_error': TestError.INVALID_DISCLOSURE,
    },
  },

  'Invalid COSE Encoding': {
    'number': 25,
    'input_file': 'credential-invalid-encoding.json',
    'key_file': TestVerificationMethods.p256,
    'fn': TestFunction.verify,
    'feature': TestFeature.credential_cose,
    'verification_checks': {
      'expected_result': TestResult.failure,
      'expected_error': TestError.INVALID_ENCODING,
    },
  },
};
