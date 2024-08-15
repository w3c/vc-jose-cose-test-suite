# Normative Statements from VC JOSE COSE Specification

## 1. Securing with JOSE

1. A conforming JWS issuer implementation MUST use [[RFC7515]] to secure this media type.
2. The `typ` header parameter SHOULD be `vc-ld+jwt`.
3. When present, the `cty` header parameter SHOULD be `vc`.
4. A conforming JWS verifier implementation MUST use [[RFC7515]] to verify conforming JWS documents that use this media
   type.
5. The `typ` header parameter SHOULD be `vp-ld+jwt` (for verifiable presentations).
6. When present, the `cty` header parameter SHOULD be `vp` (for verifiable presentations).
7. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type defined
   by the [[VC-DATA-MODEL-2.0]].
8. Verifiable Presentations in verifiable presentations MUST use the Enveloped Verifiable Presentation type defined by
   the [[VC-DATA-MODEL-2.0]].
9. Credentials in verifiable presentations MUST be secured.
10. Implementations MUST support the JWS compact serialization.
11. Use of the JWS JSON serialization is NOT RECOMMENDED.

## 2. JOSE Header Parameters and JWT Claims

12. When present in the JOSE Header or the JWT Claims Set, members registered in the IANA JSON Web Token Claims registry
    or the IANA JSON Web Signature and Encryption Header Parameters registry are to be interpreted as defined by the
    specifications referenced in the registries.
13. The unencoded JOSE Header is JSON (`application/json`), not JSON-LD (`application/ld+json`).
14. It is RECOMMENDED to use the IANA JSON Web Token Claims registry and the IANA JSON Web Signature and Encryption
    Header Parameters registry to identify any claims and header parameters that might be confused with members defined
    by [[VC-DATA-MODEL-2.0]].
15. Implementers SHOULD avoid setting JWT claims to values that conflict with the values of verifiable credential
    properties when a claim and property pair refer to the same conceptual entity.
16. The JWT Claim Names `vc` and `vp` MUST NOT be present.
17. Additional members may be present as header parameters and claims. If they are not understood, they MUST be ignored.

## 3. Securing with SD-JWT

18. A conforming SD-JWT issuer implementation MUST use [[SD-JWT]] to secure this media type.
19. The `typ` header parameter SHOULD be `vc-ld+sd-jwt`.
20. When present, the `cty` header parameter SHOULD be `vc`.
21. A conforming SD-JWT verifier implementation MUST use [[SD-JWT]] to verify conforming JWS documents that use this
    media type.
22. The `typ` header parameter SHOULD be `vp-ld+sd-jwt` (for verifiable presentations).
23. When present, the `cty` header parameter SHOULD be `vp` (for verifiable presentations).
24. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type defined
    by the [[VC-DATA-MODEL-2.0]].
25. Verifiable Presentations in verifiable presentations MUST use the Enveloped Verifiable Presentation type defined by
    the [[VC-DATA-MODEL-2.0]].
26. Credentials in verifiable presentations MUST be secured.
27. Implementations MUST support the compact serialization (`application/sd-jwt`).
28. Implementations MAY support the JSON serialization (`application/sd-jwt+json`).

## 4. Securing with COSE

29. A conforming COSE issuer implementation MUST use COSE_Sign1 as specified in [[RFC9052]] to secure this media type.
30. The `typ` header parameter SHOULD be `application/vc-ld+cose`.
31. When present, the `content type (3)` header parameter SHOULD be `application/vc`.
32. A conforming COSE verifier implementation MUST use COSE_Sign1 as specified in [[RFC9052]] to verify conforming COSE
    documents that use this media type.
33. The `typ` header parameter SHOULD be `application/vp-ld+cose` (for verifiable presentations).
34. When present, the `cty` header parameter SHOULD be `application/vp` (for verifiable presentations).
35. Verifiable Credentials secured in verifiable presentations MUST use the Enveloped Verifiable Credential type defined
    by the [[VC-DATA-MODEL-2.0]].
36. Verifiable Presentations in verifiable presentations MUST use the Enveloped Verifiable Presentation type defined by
    the [[VC-DATA-MODEL-2.0]].
37. Credentials in verifiable presentations MUST be secured.

## 5. Key Discovery

38. When `iss` is absent and the issuer is identified as a DID Subject, the `kid` MUST be an absolute DID URL.
39. When `iss` is absent, and the holder is identified as a DID Subject, the `kid` MUST be an absolute DID URL.
40. When `iss` is absent, and the issuer is identified as a [[URL]], the `kid` MUST be an absolute [[URL]] to a
    verification method listed in a controller document.
41. When the holder is identified as a [[URL]], and `iss` is absent, the `kid` MUST be an absolute [[URL]] to a
    verification method listed in a controller document.
42. When `iss` is present and is a [[URL]], the `kid` MUST match a key discovered via a JWT Issuer Metadata Request, as
    described in [[SD-JWT-VC]].
43. `kid` MUST be present when the key of the issuer or subject is expressed as a DID URL.
44. When issuer value is a string, `iss` value, if present, MUST match issuer value.
45. When issuer value is an object with an `id` value, `iss` value, if present, MUST match `issuer.id` value.

## 6. Verification Methods

46. The `verificationMethod` property is OPTIONAL. If present, its value MUST be a set of verification methods, where
    each verification method is expressed using a map.
47. The verification method map MUST include the `id`, `type`, `controller`, and specific verification material
    properties that are determined by the value of `type`.
48. The value of the `id` property for a verification method MUST be a string that conforms to the [[URL]] syntax.
49. The value of the `type` property MUST be a string that references exactly one verification method type.
50. The value of the `controller` property MUST be a string that conforms to the [[URL]] syntax.
51. The `revoked` property is OPTIONAL. If present, its value MUST be an [[XMLSCHEMA11-2]] combined date and time string
    specifying when the verification method SHOULD cease to be used.
52. A verification method MUST NOT contain multiple verification material properties for the same material.

## 7. Verification Relationships

53. The `authentication` property is OPTIONAL. If present, its value MUST be a set of one or more verification methods.
    Each verification method MAY be embedded or referenced.
54. The `assertionMethod` property is OPTIONAL. If present, its value MUST be a set of one or more verification methods.
    Each verification method MAY be embedded or referenced.

## 8. Conformance Classes

55. A conforming JWS document is one that conforms to all of the "MUST" statements in Section "Secure with JOSE".
56. A conforming JWS issuer implementation produces conforming JWS documents and MUST secure them as described in
    Section "Secure with JOSE".
57. A conforming JWS verifier implementation verifies conforming JWS documents as described in Section "Secure with
    JOSE".
58. A conforming SD-JWT document is one that conforms to all of the "MUST" statements in Section "Secure with SD-JWT".
59. A conforming SD-JWT issuer implementation produces conforming SD-JWT documents and MUST secure them as described in
    Section "Secure with SD-JWT".
60. A conforming SD-JWT verifier implementation verifies conforming SD-JWT documents as described in Section "Secure
    with SD-JWT".
61. A conforming COSE document is one that conforms to all of the "MUST" statements in Section "Secure with COSE".
62. A conforming COSE issuer implementation produces conforming COSE documents and MUST secure them as described in
    Section "Secure with COSE".
63. A conforming COSE verifier implementation verifies conforming COSE documents as described in Section "Secure with
    COSE".

## 9. Securing Verifiable Credentials

64. If implementations do not know which media type to use, media types defined in this specification MUST be used.
65. Accordingly, Issuers, Holders, and Verifiers MUST understand the JSON Web Token header parameter `"alg": "none"`
    when securing [[VC-DATA-MODEL-2.0]] with JSON Web Tokens.
66. When content types from [[VC-DATA-MODEL-2.0]] are secured using JSON Web Tokens, the header parameter
    `"alg": "none"`, MUST be used to communicate that a JWT Claims Set (a Verifiable Credential or a Verifiable
    Presentation) has no integrity protection.
67. When a JWT Claims Set (a Verifiable Credential or a Verifiable Presentation) contains `proof`, and the JSON Web
    Token header contains `"alg": "none"`, the JWT Claims Set MUST be considered to have no integrity protection.
68. Issuers, Holders, and Verifiers MUST ignore all JWT Claims Sets that have no integrity protection.
69. The JWT Claim Names `vc` and `vp` MUST NOT be present in any JWT Claims Set.

## 10. Validation Algorithm

70. All claims expected for the `typ` MUST be present.
71. All claims that are understood MUST be evaluated according the verifier's validation policies.
72. All claims that are not understood MUST be ignored.
73. The verified `document` returned from verification MUST be a well-formed compact JSON-LD document, as described in
    Verifiable Credentials Data Model v2.0.
74. Schema extension mechanisms such as `credentialSchema` SHOULD be checked.
75. If the extension mechanism `type` is not understood, this property MUST be ignored.
76. Status extension mechanisms such as `credentialStatus` SHOULD be checked.
77. If the extension mechanism `type` is not understood, this property MUST be ignored.
