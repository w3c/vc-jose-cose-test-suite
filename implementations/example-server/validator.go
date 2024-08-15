package main

import (
	"fmt"
	"net/url"
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
