# Normative Statements for JOSE-COSE Verifiable Credentials

## JOSE

### For Verifiable Credentials

1. A conforming JWS issuer implementation MUST use RFC7515 to secure this media type.
2. A conforming JWS verifier implementation MUST use RFC7515 to verify conforming JWS documents that use this media type.
3. Issuers, Holders, and Verifiers MUST ignore all JWT Claims Sets that have no integrity protection.
4. The JWT Claim Names `vc` and `vp` MUST NOT be present in any JWT Claims Set that comprises a verifiable credential.

### For Verifiable Presentations

5. A conforming JWS issuer implementation MUST use RFC7515 to secure this media type.
6. A conforming JWS verifier implementation MUST use RFC7515 to verify conforming JWS documents that use this media type.
7. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type.
8. Credentials in verifiable presentations MUST be secured.

## SD-JWT

### For Verifiable Credentials

9. A conforming SD-JWT issuer implementation MUST use SD-JWT to secure this media type.
10. A conforming SD-JWT verifier implementation MUST use SD-JWT to verify conforming JWS documents that use this media type.

### For Verifiable Presentations

11. A conforming SD-JWT issuer implementation MUST use SD-JWT to secure this media type.
12. A conforming SD-JWT verifier implementation MUST use SD-JWT to verify conforming JWS documents that use this media type.
13. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type.
14. Credentials in verifiable presentations MUST be secured.

## COSE

### For Verifiable Credentials

15. A conforming COSE issuer implementation MUST use COSE_Sign1 to secure this media type.
16. A conforming COSE verifier implementation MUST use COSE_Sign1 to verify conforming COSE documents that use this media type.
17. When including verifiable credentials secured with COSE in verifiable presentations as Enveloped Verifiable Credentials, the credentials MUST be encoded using base64.

### For Verifiable Presentations

18. A conforming COSE issuer implementation MUST use COSE_Sign1 to secure this media type.
19. A conforming COSE verifier implementation MUST use COSE_Sign1 to verify conforming COSE documents that use this media type.
20. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type.
21. Credentials in verifiable presentations MUST be secured.

## Additional Requirements

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
