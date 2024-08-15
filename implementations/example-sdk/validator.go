package main

import (
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"time"
)

type Credential struct {
	ID                string         `json:"id"`
	Type              []string       `json:"type"`
	IssuanceDate      time.Time      `json:"issuanceDate"`
	CredentialSubject map[string]any `json:"credentialSubject"`
}

type Config struct {
	Check        string `json:"check"`
	ExpectedType string `json:"expected_type,omitempty"`
}

type ValidationResult string

const (
	Success       ValidationResult = "success"
	Failure       ValidationResult = "failure"
	Indeterminate ValidationResult = "indeterminate"
)

func ValidateCredential(inputFile, configStr, outputFile string) error {
	fmt.Printf("Attempting to read input file: %s\n", inputFile)

	// Read and parse the input credential
	credBytes, err := os.ReadFile(inputFile)
	if err != nil {
		return fmt.Errorf("error reading input file: %v", err)
	}

	fmt.Printf("Successfully read input file. Content length: %d bytes\n", len(credBytes))

	var cred Credential
	if err = json.Unmarshal(credBytes, &cred); err != nil {
		return fmt.Errorf("error parsing credential: %v", err)
	}

	fmt.Printf("Successfully parsed credential. ID: %s\n", cred.ID)

	// Parse the config
	var config Config
	if err = json.Unmarshal([]byte(configStr), &config); err != nil {
		return fmt.Errorf("error parsing config: %v", err)
	}

	fmt.Printf("Successfully parsed config. Check: %s\n", config.Check)

	// Perform the validation based on the config
	var result ValidationResult
	switch config.Check {
	case "identifier":
		result = validateIdentifier(cred.ID)
	case "type":
		result = validateType(cred.Type, config.ExpectedType)
	case "issuance_date":
		result = validateIssuanceDate(cred.IssuanceDate)
	default:
		return fmt.Errorf("unknown check type: %s", config.Check)
	}

	fmt.Printf("Validation result: %s\n", result)

	// Write the result to the output file
	output := struct {
		Result ValidationResult `json:"result"`
	}{Result: result}

	outputBytes, err := json.Marshal(output)
	if err != nil {
		return fmt.Errorf("error marshaling output: %v", err)
	}

	fmt.Printf("Attempting to write output to file: %s\n", outputFile)
	if err = os.WriteFile(outputFile, outputBytes, 0644); err != nil {
		return fmt.Errorf("error writing output file: %v", err)
	}

	fmt.Printf("Successfully wrote output to file\n")

	return nil
}

func validateIdentifier(id string) ValidationResult {
	if _, err := url.ParseRequestURI(id); err != nil {
		fmt.Printf("Invalid identifier: %s\n", id)
		return Failure
	}
	fmt.Printf("Valid identifier: %s\n", id)
	return Success
}

func validateType(types []string, expectedType string) ValidationResult {
	for _, t := range types {
		if t == expectedType {
			fmt.Printf("Found expected type: %s\n", expectedType)
			return Success
		}
	}
	fmt.Printf("Expected type not found: %s\n", expectedType)
	return Failure
}

func validateIssuanceDate(date time.Time) ValidationResult {
	if date.IsZero() {
		fmt.Printf("Invalid issuance date: zero value\n")
		return Failure
	}
	fmt.Printf("Valid issuance date: %s\n", date)
	return Success
}
