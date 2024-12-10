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

### Issuance Test Cases

1. Basic JWT Credential Issuance
    * Input: Minimal credential with only required fields (type, issuer, credentialSubject)
    * Format: jose
    * Covers: 1, 4

2. JWT Presentation Issuance
    * Input: Presentation containing one credential
    * Format: jose
    * Covers: 5, 7, 8

3. SD-JWT Selective Disclosure Credential
    * Input: Credential with multiple disclosable claims in credentialSubject
    * Format: sd-jwt
    * Covers: 9

4. COSE Credential Issuance
    * Input: Standard credential with issuer DID and key references
    * Format: cose
    * Covers: 15, 22

5. Complex Presentation Issuance
    * Input: Presentation containing multiple credentials of different types
    * Format: jose
    * Covers: 5, 7, 8

6. Credential with Extensions
    * Input: Credential with credentialSchema and credentialStatus
    * Format: jose
    * Covers: 1, 33

### Verification Test Cases

7. Basic JWT Credential Verification
    * Input: Signed minimal credential
    * Format: jose
    * Covers: 2, 3, 29, 30, 31, 32

8. SD-JWT Verification with Selective Disclosure
    * Input: SD-JWT credential with multiple disclosed and undisclosed claims
    * Format: sd-jwt
    * Covers: 10, 26, 31

9. COSE Base64 Format Check
    * Input: COSE credential within a presentation using base64 encoding
    * Format: cose
    * Covers: 17, 20, 21

10. Issuer Match Verification
    * Input: Credential with string issuer and matching iss claim
    * Format: jose
    * Covers: 24, 25

11. URL Verification Method Resolution
    * Input: Credential using URL identifiers without iss
    * Format: jose
    * Covers: 27, 28

12. Presentation Format Verification
    * Input: Presentation with multiple credentials in different formats
    * Format: jose
    * Covers: 6, 7, 8, 34, 35

13. Serialization Format Check
    * Input: Credential using compact serialization
    * Format: jose/sd-jwt
    * Covers: 34, 35

14. Type Validation
    * Input: Credential with expected type fields
    * Format: jose
    * Covers: 29, 30, 31, 32

15. Extension Processing
    * Input: Credential with unknown extension fields
    * Format: jose
    * Covers: 26, 31, 33

16. Multi-format Presentation Verification
    * Input: Presentation containing JWT, SD-JWT, and COSE credentials
    * Format: jose
    * Covers: 7, 8, 13, 14, 20, 21

17. Controller Document Resolution
    * Input: Credential using DID URLs for key references
    * Format: jose
    * Covers: 22, 27, 28

### (Optional) Negative Test Cases

18. Invalid Signature Verification
    * Input: Credential with tampered signature
    * Format: jose
    * Covers: 2, 3

19. Missing Required Claims
    * Input: Credential missing mandatory type claim
    * Format: jose
    * Covers: 29, 30

20. Invalid Base64 Encoding
    * Input: COSE credential with improper base64 encoding
    * Format: cose
    * Covers: 17

21. Non-compact Serialization
    * Input: Credential using JSON serialization
    * Format: jose
    * Covers: 34, 35

22. Mismatched Issuer Claims
    * Input: Credential with non-matching issuer and iss values
    * Format: jose
    * Covers: 24, 25