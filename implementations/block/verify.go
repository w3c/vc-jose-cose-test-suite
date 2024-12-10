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
		return VerifyCredential(inputBytes, keyBytes, feature)
	case JOSEPresentation, COSEPresentation, SDJWTPresentation:
		return VerifyPresentation(inputBytes, keyBytes, feature)
	default:
		i := Indeterminate
		fmt.Printf("unsupported feature: %s\n", feature)
		return &i, nil
	}
}

func VerifyCredential(credBytes, keyBytes []byte, feature Feature) (*Status, error) {
	return nil, nil
}

func VerifyPresentation(presBytes, keyBytes []byte, feature Feature) (*Status, error) {
	return nil, nil
}
