# Test Cases

This document lists all the normative statements that need to be tested for the JOSE-COSE Verifiable Credentials specification.

## JWT (JOSE) Section

### For Verifiable Credentials

1. A conforming JWS issuer implementation MUST use RFC7515 to secure this media type.
2. A conforming JWS verifier implementation MUST use RFC7515 to verify conforming JWS documents that use this media type.
3. Issuers, Holders, and Verifiers MUST ignore all JWT Claims Sets that have no integrity protection.
4. The JWT Claim Names `vc` and `vp` MUST NOT be present in any JWT Claims Set that comprises a verifiable credential.

### For Verifiable Presentations

5. A conforming JWS issuer implementation MUST use RFC7515 to secure this media type.
6. A conforming JWS verifier implementation MUST use RFC7515 to verify conforming JWS documents that use this media type.
7. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type defined by the VC-DATA-MODEL-2.0.
8. Verifiable Presentations in verifiable presentations MUST use the Enveloped Verifiable Presentation type defined by the VC-DATA-MODEL-2.0.
9. Credentials in verifiable presentations MUST be secured.

## SD-JWT Section

### For Verifiable Credentials

10. A conforming SD-JWT issuer implementation MUST use SD-JWT to secure this media type.
11. A conforming SD-JWT verifier implementation MUST use SD-JWT to verify conforming JWS documents that use this media type.

### For Verifiable Presentations

12. A conforming SD-JWT issuer implementation MUST use SD-JWT to secure this media type.
13. A conforming SD-JWT verifier implementation MUST use SD-JWT to verify conforming JWS documents that use this media type.
14. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type defined by the VC-DATA-MODEL-2.0.
15. Verifiable Presentations in verifiable presentations MUST use the Enveloped Verifiable Presentation type defined by the VC-DATA-MODEL-2.0.
16. Credentials in verifiable presentations MUST be secured.

## COSE Section

### For Verifiable Credentials

17. A conforming COSE issuer implementation MUST use COSE_Sign1 as specified in RFC9052 to secure this media type.
18. A conforming COSE verifier implementation MUST use COSE_Sign1 as specified in RFC9052 to verify conforming COSE documents that use this media type.
19. When including verifiable credentials secured with COSE in verifiable presentations as Enveloped Verifiable Credentials, the credentials MUST be encoded using base64 as specified in RFC2397.

### For Verifiable Presentations

20. A conforming COSE issuer implementation MUST use COSE_Sign1 as specified in RFC9052 to secure this media type.
21. A conforming COSE verifier implementation MUST use COSE_Sign1 as specified in RFC9052 to verify conforming COSE documents that use this media type.
22. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type defined by the VC-DATA-MODEL-2.0.
23. Verifiable Presentations in verifiable presentations MUST use the Enveloped Verifiable Presentation type defined by the VC-DATA-MODEL-2.0.
24. Credentials in verifiable presentations MUST be secured.

## Additional Requirements

25. If `kid` is present when the key of the issuer or subject is expressed as a DID URL, it MUST be present.
26. If implementations do not know which media type to use, media types defined in this specification MUST be used.
27. A conforming JWS document MUST conform to all of the "MUST" statements in Section 3.1 With JOSE.
28. A conforming SD-JWT document MUST conform to all of the "MUST" statements in Section 3.2 With SD-JWT.
29. A conforming COSE document MUST conform to all of the "MUST" statements in Section 3.3 With COSE.
30. When the issuer value is a string, iss value, if present, MUST match issuer value.
31. When issuer value is an object with an id value, iss value, if present, MUST match issuer.id value.
32. Additional members may be present as header parameters and claims. If they are not understood, they MUST be ignored.
33. When iss is absent, and the issuer is identified as a URL, the kid MUST be an absolute URL to a verification method listed in a controller document or a DID Document.
34. When the holder is identified as a URL, and iss is absent, the kid MUST be an absolute URL to a verification method listed in a controller document.
35. All claims expected for the typ MUST be present.
36. All claims that are understood MUST be evaluated according the verifier's validation policies.
37. All claims that are not understood MUST be ignored.
38. The verified document returned from verification MUST be a well-formed compact JSON-LD document, as described in Verifiable Credentials Data Model v2.0.
39. If the extension mechanism type is not understood, this property MUST be ignored (for both credentialSchema and credentialStatus).
40. Implementations MUST support the JWS compact serialization.
41. Implementations MUST support the SD-JWT compact serialization (`application/sd-jwt`).

## Should Statements (to be tested as warnings or recommendations)

42. The `typ` header parameter SHOULD be `vc+jwt` for VCs and `vp+jwt` for VPs. When present, the `cty` header parameter SHOULD be `vc` for VCs and `vp` for VPs.
43. For COSE, the `typ` header parameter SHOULD be `application/vc+cose` for VCs and `application/vp+cose` for VPs. When present, the `content type (3)` header parameter SHOULD be `application/vc` for VCs and `application/vp` for VPs.
44. When securing verifiable credentials with SD-JWT, implementers SHOULD ensure that properties necessary for the validation and verification of a credential are NOT selectively disclosable (i.e., such properties SHOULD be disclosed).
45. The most specific media type (or subtype) available SHOULD be used, instead of more generic media types (or supertypes).
46. Verifiers SHOULD strive to minimize the processing of untrusted data.
47. After verification has succeeded, additional validation checks SHOULD be performed as described in Section 5.4 Validation.
48. Schema extension mechanisms such as `credentialSchema` SHOULD be checked.
49. Status extension mechanisms such as `credentialStatus` SHOULD be checked.
50. When using URL identifiers, the kid is RECOMMENDED to be an absolute URL that includes a JWK Thumbprint URI as defined in RFC7638.
