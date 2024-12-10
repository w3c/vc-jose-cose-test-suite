package main

import (
	"fmt"
	"os"
)

func Verify(inputFile, keyFile string, feature Feature) (*Status, error) {
	fmt.Printf("Attempting to read input file: %s\n", inputFile)

	// Read and parse the input file
	inputBytes, err := os.ReadFile(inputFile)
	if err != nil {
		return nil, fmt.Errorf("error reading input file: %v", err)
	}

	fmt.Printf("Successfully read input file. Content length: %d bytes\n", len(inputBytes))

	// Read and parse the key file
	keyBytes, err := os.ReadFile(keyFile)
	if err != nil {
		return nil, fmt.Errorf("error reading key file: %v", err)
	}
	if keyBytes == nil {
		return nil, fmt.Errorf("key file is empty")
	}

	switch feature {
	case JOSECredential:
		return VerifyJOSECredential(inputBytes, keyBytes)
	case COSECredential:
		return VerifyCOSECredential(inputBytes, keyBytes)
	case SDJWTCredential:
		return VerifySDJWTCredential(inputBytes, keyBytes)
	case JOSEPresentation:
		return VerifyJOSEPresentation(inputBytes, keyBytes)
	case COSEPresentation:
		return VerifyCOSEPresentation(inputBytes, keyBytes)
	case SDJWTPresentation:
		return VerifySDJWTPresentation(inputBytes, keyBytes)
	default:
		i := Indeterminate
		fmt.Printf("unsupported feature: %s\n", feature)
		return &i, nil
	}
}

func VerifyJOSECredential(credBytes, keyBytes []byte) (*Status, error) {
	return nil, nil
}

func VerifyCOSECredential(credBytes, keyBytes []byte) (*Status, error) {
	return nil, nil
}

func VerifySDJWTCredential(credBytes, keyBytes []byte) (*Status, error) {
	return nil, nil
}

func VerifyJOSEPresentation(presBytes, keyBytes []byte) (*Status, error) {
	return nil, nil
}

func VerifyCOSEPresentation(presBytes, keyBytes []byte) (*Status, error) {
	return nil, nil
}

func VerifySDJWTPresentation(presBytes, keyBytes []byte) (*Status, error) {
	return nil, nil
}
