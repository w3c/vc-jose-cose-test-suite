package main

import (
	"encoding/base64"
	"fmt"
	"github.com/decentralgabe/vc-jose-cose-go/cid"
	"github.com/decentralgabe/vc-jose-cose-go/cose"
	"github.com/decentralgabe/vc-jose-cose-go/credential"
	"github.com/decentralgabe/vc-jose-cose-go/jose"
	"github.com/goccy/go-json"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"os"
)

func Issue(inputFile, keyFile string, feature Feature) (*Result, error) {
	fmt.Printf("Attempting to read input file: %s\n", inputFile)

	// Read and parse the input file
	inputBytes, err := os.ReadFile(inputFile)
	if err != nil {
		return nil, fmt.Errorf("error reading input file: %v", err)
	}
	if len(inputBytes) == 0 {
		return nil, fmt.Errorf("input file is empty")
	}
	fmt.Printf("Successfully read input file. Content length: %d bytes\n", len(inputBytes))

	// Read and parse the key file
	keyBytes, err := os.ReadFile(keyFile)
	if err != nil {
		return nil, fmt.Errorf("error reading key file: %v", err)
	}
	if len(keyBytes) == 0 {
		return nil, fmt.Errorf("key file is empty")
	}

	switch feature {
	case JOSECredential, COSECredential, SDJWTCredential:
		return IssueCredential(inputBytes, keyBytes, feature)
	case JOSEPresentation, COSEPresentation, SDJWTPresentation:
		return IssuePresentation(inputBytes, keyBytes, feature)
	default:
		fmt.Printf("unsupported feature: %s\n", feature)
		return &Result{Result: Indeterminate}, nil
	}
}

func IssueCredential(credBytes, keyBytes []byte, feature Feature) (*Result, error) {
	var cred credential.VerifiableCredential
	if err := json.Unmarshal(credBytes, &cred); err != nil {
		return nil, fmt.Errorf("error unmarshaling credential: %v", err)
	}

	var vm cid.VerificationMethod
	if err := json.Unmarshal(keyBytes, &vm); err != nil {
		return nil, fmt.Errorf("error unmarshaling verifcation method: %v", err)
	}

	switch feature {
	case JOSECredential:
		return IssueJOSECredential(cred, vm.SecretKeyJWK)
	case COSECredential:
		return IssueCOSECredential(cred, vm.SecretKeyJWK)
	case SDJWTCredential:
		return IssueSDJWTCredential(cred, vm.SecretKeyJWK)
	default:
		fmt.Printf("unsupported credential feature: %s\n", feature)
		return &Result{Result: Indeterminate}, nil
	}
}

func IssuePresentation(presBytes, keyBytes []byte, feature Feature) (*Result, error) {
	var pres credential.VerifiablePresentation
	if err := json.Unmarshal(presBytes, &pres); err != nil {
		return nil, fmt.Errorf("error unmarshaling presentation: %v", err)
	}

	var vm cid.VerificationMethod
	if err := json.Unmarshal(keyBytes, &vm); err != nil {
		return nil, fmt.Errorf("error unmarshaling verification method: %v", err)
	}

	switch feature {
	case JOSEPresentation:
		return IssueJOSEPresentation(pres, vm.SecretKeyJWK)
	case COSEPresentation:
		return IssueCOSEPresentation(pres, vm.SecretKeyJWK)
	case SDJWTPresentation:
		return IssueSDJWTPresentation(pres, vm.SecretKeyJWK)
	default:
		fmt.Printf("unsupported presentation feature: %s\n", feature)
		return &Result{Result: Indeterminate}, nil
	}
}

func IssueJOSECredential(cred credential.VerifiableCredential, key jwk.Key) (*Result, error) {
	jws, err := jose.SignVerifiableCredential(cred, key)
	if err != nil {
		fmt.Printf("error signing credential: %v", err)
		return &Result{Result: Failure}, nil
	}
	if jws == nil || *jws == "" {
		return &Result{Result: Failure}, nil
	}

	return &Result{
		Result: Success,
		Data:   *jws,
	}, nil
}

func IssueCOSECredential(cred credential.VerifiableCredential, key jwk.Key) (*Result, error) {
	cs1, err := cose.SignVerifiableCredential(cred, key)
	if err != nil {
		fmt.Printf("error signing credential: %v", err)
		return &Result{Result: Failure}, nil
	}
	if cs1 == nil {
		return &Result{Result: Failure}, nil
	}
	return &Result{
		Result: Success,
		Data:   base64.RawStdEncoding.EncodeToString(cs1),
	}, nil
}

func IssueSDJWTCredential(cred credential.VerifiableCredential, key jwk.Key) (*Result, error) {
	return nil, nil
}

func IssueJOSEPresentation(pres credential.VerifiablePresentation, key jwk.Key) (*Result, error) {
	jws, err := jose.SignVerifiablePresentation(pres, key)
	if err != nil {
		fmt.Printf("error signing presentation: %v", err)
		return &Result{Result: Failure}, nil
	}
	if jws == nil || *jws == "" {
		return &Result{Result: Failure}, nil
	}

	return &Result{
		Result: Success,
		Data:   *jws,
	}, nil
}

func IssueCOSEPresentation(pres credential.VerifiablePresentation, key jwk.Key) (*Result, error) {
	cs1, err := cose.SignVerifiablePresentation(pres, key)
	if err != nil {
		fmt.Printf("error signing presentation: %v", err)
		return &Result{Result: Failure}, nil
	}
	if cs1 == nil {
		return &Result{Result: Failure}, nil
	}
	return &Result{
		Result: Success,
		Data:   base64.RawStdEncoding.EncodeToString(cs1),
	}, nil
}

func IssueSDJWTPresentation(pres credential.VerifiablePresentation, key jwk.Key) (*Result, error) {
	return nil, nil
}
