package main

import (
	"encoding/base64"
	"fmt"
	"github.com/decentralgabe/vc-jose-cose-go/cid"
	"github.com/decentralgabe/vc-jose-cose-go/cose"
	"github.com/decentralgabe/vc-jose-cose-go/jose"
	"github.com/decentralgabe/vc-jose-cose-go/sdjwt"
	"github.com/goccy/go-json"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/pkg/errors"
	"os"
	"strings"
)

func Verify(inputFile, keyFile string, feature Feature) (*Result, error) {
	fmt.Printf("Attempting to read input file: %s\n", inputFile)

	// Read and parse the input file
	inputBytes, err := os.ReadFile(inputFile)
	if err != nil {
		return nil, fmt.Errorf("error reading input file: %v", err)
	}
	if len(inputBytes) == 0 {
		return nil, fmt.Errorf("input file is empty")
	}
	inputStr := strings.TrimSpace(string(inputBytes))

	fmt.Printf("Successfully read input file. Content length: %d bytes\n", len(inputBytes))

	// Read and parse the key file
	keyBytes, err := os.ReadFile(keyFile)
	if err != nil {
		return nil, fmt.Errorf("error reading key file: %v", err)
	}
	if keyBytes == nil {
		return nil, fmt.Errorf("key file is empty")
	}

	var vm cid.VerificationMethod
	if err := json.Unmarshal(keyBytes, &vm); err != nil {
		return nil, fmt.Errorf("error unmarshaling verifcation method: %v", err)
	}

	switch feature {
	case JOSECredential:
		return VerifyJOSECredential(inputStr, vm.PublicKeyJWK)
	case COSECredential:
		return VerifyCOSECredential(inputStr, vm.PublicKeyJWK)
	case SDJWTCredential:
		return VerifySDJWTCredential(inputStr, vm.PublicKeyJWK)
	case JOSEPresentation:
		return VerifyJOSEPresentation(inputStr, vm.PublicKeyJWK)
	case COSEPresentation:
		return VerifyCOSEPresentation(inputStr, vm.PublicKeyJWK)
	case SDJWTPresentation:
		return VerifySDJWTPresentation(inputStr, vm.PublicKeyJWK)
	default:
		fmt.Printf("unsupported feature: %s\n", feature)
		return &Result{Result: Indeterminate}, nil
	}
}

func VerifyJOSECredential(credStr string, key jwk.Key) (*Result, error) {
	cred, err := jose.VerifyVerifiableCredential(credStr, key)
	if err != nil {
		return &Result{Result: Failure, Data: fmt.Sprintf("error verifying JOSE credential: %v", err)}, nil
	}
	if cred == nil {
		return &Result{Result: Failure, Data: "JOSE credential is invalid"}, nil
	}
	return &Result{Result: Success}, nil
}

func VerifyCOSECredential(credStr string, key jwk.Key) (*Result, error) {
	credBytes, err := base64.RawStdEncoding.DecodeString(credStr)
	if err != nil {
		return nil, errors.Wrap(err, "error decoding base64 encoded COSE credential")
	}
	cred, err := cose.VerifyVerifiableCredential(credBytes, key)
	if err != nil {
		return &Result{Result: Failure, Data: fmt.Sprintf("error verifying COSE credential: %v", err)}, nil
	}
	if cred == nil {
		return &Result{Result: Failure, Data: "COSE credential is invalid"}, nil
	}
	return &Result{Result: Success}, nil
}

func VerifySDJWTCredential(credStr string, key jwk.Key) (*Result, error) {
	cred, err := sdjwt.VerifyVerifiableCredential(credStr, key)
	if err != nil {
		return &Result{Result: Failure, Data: fmt.Sprintf("error verifying SD-JWT credential: %v", err)}, nil
	}
	if cred == nil {
		return &Result{Result: Failure, Data: "SD-JWT credential is invalid"}, nil
	}
	return &Result{Result: Success}, nil
}

func VerifyJOSEPresentation(presStr string, key jwk.Key) (*Result, error) {
	pres, err := jose.VerifyVerifiablePresentation(presStr, key)
	if err != nil {
		return &Result{Result: Failure, Data: fmt.Sprintf("error verifying JOSE presentation: %v", err)}, nil
	}
	if pres == nil {
		return &Result{Result: Failure, Data: "JOSE presentation is invalid"}, nil
	}
	return &Result{Result: Success}, nil
}

func VerifyCOSEPresentation(presStr string, key jwk.Key) (*Result, error) {
	presBytes, err := base64.RawStdEncoding.DecodeString(presStr)
	if err != nil {
		return nil, errors.Wrap(err, "error decoding base64 encoded COSE presentation")
	}
	pres, err := cose.VerifyVerifiablePresentation(presBytes, key)
	if err != nil {
		return &Result{Result: Failure, Data: fmt.Sprintf("error verifying COSE presentation: %v", err)}, nil
	}
	if pres == nil {
		return &Result{Result: Failure, Data: "COSE presentation is invalid"}, nil
	}
	return &Result{Result: Success}, nil
}

func VerifySDJWTPresentation(presStr string, key jwk.Key) (*Result, error) {
	pres, err := sdjwt.VerifyVerifiablePresentation(presStr, key)
	if err != nil {
		return &Result{Result: Failure, Data: fmt.Sprintf("error verifying SD-JWT presentation: %v", err)}, nil
	}
	if pres == nil {
		return &Result{Result: Failure, Data: "SD-JWT presentation is invalid"}, nil
	}
	return &Result{Result: Success}, nil
}
