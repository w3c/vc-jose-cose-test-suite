# Test Cases for VC JOSE COSE

This file outlines each of the testable normative statements in the specification. 

Following, are a set of test cases which describe how the statements are to be tested.

## Testable Normative Statements

### JOSE

#### Verifiable Credentials

1. A conforming JWS issuer implementation MUST use RFC7515 to secure this media type.
2. A conforming JWS verifier implementation MUST use RFC7515 to verify conforming JWS documents that use this media type.
3. Issuers, Holders, and Verifiers MUST ignore all JWT Claims Sets that have no integrity protection.
4. The JWT Claim Names `vc` and `vp` MUST NOT be present in any JWT Claims Set that comprises a verifiable credential.

#### Verifiable Presentations

5. A conforming JWS issuer implementation MUST use RFC7515 to secure this media type.
6. A conforming JWS verifier implementation MUST use RFC7515 to verify conforming JWS documents that use this media type.
7. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type.
8. Credentials in verifiable presentations MUST be secured.

### SD-JWT

#### Verifiable Credentials

9. A conforming SD-JWT issuer implementation MUST use SD-JWT to secure this media type.
10. A conforming SD-JWT verifier implementation MUST use SD-JWT to verify conforming JWS documents that use this media type.

#### Verifiable Presentations

11. A conforming SD-JWT issuer implementation MUST use SD-JWT to secure this media type.
12. A conforming SD-JWT verifier implementation MUST use SD-JWT to verify conforming JWS documents that use this media type.
13. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type.
14. Credentials in verifiable presentations MUST be secured.

### COSE

#### Verifiable Credentials

15. A conforming COSE issuer implementation MUST use COSE_Sign1 to secure this media type.
16. A conforming COSE verifier implementation MUST use COSE_Sign1 to verify conforming COSE documents that use this media type.
17. When including verifiable credentials secured with COSE in verifiable presentations as Enveloped Verifiable Credentials, the credentials MUST be encoded using base64.

#### Verifiable Presentations

18. A conforming COSE issuer implementation MUST use COSE_Sign1 to secure this media type.
19. A conforming COSE verifier implementation MUST use COSE_Sign1 to verify conforming COSE documents that use this media type.
20. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type.
21. Credentials in verifiable presentations MUST be secured.

### Additional Requirements

22. If `kid` is present when the key of the issuer or subject is expressed as a DID URL, it MUST be present.
23. If implementations do not know which media type to use, media types defined in this specification MUST be used.
24. When the issuer value is a string, iss value, if present, MUST match issuer value.
25. When issuer value is an object with an id value, iss value, if present, MUST match issuer.id value.
26. Additional members that are not understood MUST be ignored.
27. When iss is absent, and the issuer is identified as a URL, the kid MUST be an absolute URL to a verification method listed in a controller document.
28. When the holder is identified as a URL, and iss is absent, the kid MUST be an absolute URL to a verification method listed in a controller document.
29. All claims expected for the typ MUST be present.
30. All claims that are understood MUST be evaluated according to the verifier's validation policies.
31. All claims that are not understood MUST be ignored.
32. The verified document returned from verification MUST be a well-formed compact JSON-LD document.
33. If the extension mechanism type is not understood, this property MUST be ignored.
34. Implementations MUST support the JWS compact serialization.
35. Implementations MUST support the SD-JWT compact serialization.

## Test Cases

### JOSE Tests

#### Issuance Tests

1. JWT Basic Credential Issuance
    * Input: Minimal credential with only required fields (type, issuer, credentialSubject)
    * Format: jose
    * Covers: 1, 4, 27, 28, 34

2. JWT Credential Issuance with All Optional Fields
    * Input: Credential containing all optional fields (evidence, termsOfUse, etc.)
    * Format: jose
    * Covers: 1, 4, 27, 28, 34

3. JWT Basic Presentation Issuance
    * Input: Presentation containing single credential
    * Format: jose
    * Covers: 5, 7, 8, 27, 28, 34

4. JWT Complex Presentation Issuance
    * Input: Presentation containing multiple credentials with different types
    * Format: jose
    * Covers: 5, 7, 8, 13, 14, 20, 21, 27, 28, 34

5. JWT Issuance With Unknown Extensions
    * Input: Unsigned credential with unknown extensions
    * Format: jose
    * Covers: 26, 27, 28, 31, 33
    
#### Verification Tests

6. JWT Basic Credential Verification
    * Input: Signed minimal credential
    * Format: jose
    * Covers: 2, 3, 27, 28, 29, 30, 31, 32, 34

7. JWT Presentation Verification
    * Input: Signed presentation with multiple credentials
    * Format: jose
    * Covers: 6, 7, 8, 27, 28, 34

8. JWT Issuer Match Verification
    * Input: Credential with string issuer and matching iss claim
    * Format: jose
    * Covers: 24, 25, 27, 28, 34

9. JWT Verification With Unknown Extensions
    * Input: Signed JOSE credential with unknown extensions
    * Format: jose
    * Covers: 26, 27, 28, 31, 33

10. JWT Unsecured Credential Verification
    * Input: Unsecured credential with no integrity protection
    * Format: jose
    * Covers: 3

11. JWT Unsecured Presentation Verification
    * Input: Unsecured presentation with no integrity protection
    * Format: jose
    * Covers: 3
    * 
12. JWT Credential with an Invalid Signature
    * Input: Credential with an invalid signature
    * Format: jose
    * Covers: 1, 2

13. JWT Credential with an Invalid Media Type
    * Input: Credential with an invalid media type
    * Format: jose
    * Covers: 23, 29
    
14. JWT Presentation with an Invalid Media Type
    * Input: Presentation with an invalid media type
    * Format: jose
    * Covers: 23, 29

15. JWT Credential with vc and vp Claims
    * Input: Credential with vc and vp claims
    * Format: jose
    * Covers: 4

16. JWT Presentation with Invalid Credentials
    * Input: Presentation with invalid credentials (unsecured, wrong type)
    * Format: jose
    * Covers: 7, 8

### SD-JWT Tests

#### Issuance Tests

17. Basic SD-JWT Credential Issuance
    * Input: Credential with simple selective disclosure claims
    * Format: sd-jwt
    * Covers: 9, 27, 28, 35

18. Complex SD-JWT Credential Issuance
    * Input: Credential with nested selective disclosure claims
    * Format: sd-jwt
    * Covers: 9, 27, 28, 35

19. SD-JWT Presentation Issuance
    * Input: Presentation containing SD-JWT credentials
    * Format: sd-jwt
    * Covers: 11, 13, 14, 27, 28, 35
 
#### Verification Tests

20. Basic SD-JWT Credential Verification
    * Input: SD-JWT credential with mix of disclosed/undisclosed claims
    * Format: sd-jwt
    * Covers: 10, 26, 27, 28, 31, 35

21. Complex SD-JWT Credential Verification
    * Input: SD-JWT credential with nested disclosures
    * Format: sd-jwt
    * Covers: 10, 26, 27, 28, 31, 35

22. SD-JWT Presentation Verification
    * Input: Presentation with multiple SD-JWT credentials
    * Format: sd-jwt
    * Covers: 12, 13, 14, 27, 28, 35

23. SD-JWT Credential With an Invalid Signature
    * Input: Credential with an invalid signature
    * Format: sd-jwt
    * Covers: 9, 10

24. SD-JWT Credential with an Invalid Media Type
    * Input: Credential with an invalid media type
    * Format: sd-jwt
    * Covers: 23, 29

25. SD-JWT Presentation with an Invalid Media Type
    * Input: Presentation with an invalid media type
    * Format: sd-jwt
    * Covers: 23, 29

26. SD-JWT Presentation with Invalid Credentials
    * Input: Presentation with invalid credentials (unsecured, wrong type)
    * Format: sd-jwt
    * Covers: 13, 14

### COSE Tests

#### Issuance Tests

27. Basic COSE Credential
    * Input: Standard credential with required fields
    * Format: cose
    * Covers: 15, 22

28. COSE Presentation
    * Input: Presentation containing COSE credentials
    * Format: cose
    * Covers: 18, 20, 21, 27, 28

#### Verification Tests

29. Basic COSE Credential Verification
    * Input: Signed COSE credential
    * Format: cose
    * Covers: 16, 27, 28, 29, 30, 31, 32

30. COSE Credential Verification Incorrect Encoding
    * Input: COSE credential in presentation with base64 encoding
    * Format: cose
    * Covers: 17, 20, 21, 27, 28

31. COSE Presentation Verification
    * Input: Presentation with multiple COSE credentials
    * Format: cose
    * Covers: 19, 20, 21, 27, 28

32. COSE Credential With an Invalid Signature
    * Input: Credential with an invalid signature
    * Format: cose
    * Covers: 15, 16

33. COSE Credential with an Invalid Media Type
    * Input: Credential with an invalid media type
    * Format: cose
    * Covers: 23, 29

34. COSE Presentation with an Invalid Media Type
    * Input: Presentation with an invalid media type
    * Format: cose
    * Covers: 23, 29
    * 
35. COSE Presentation with Invalid Credentials
    * Input: Presentation with invalid credentials (unsecured, wrong type)
    * Format: cose
    * Covers: 23, 29
