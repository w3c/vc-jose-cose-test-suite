package main

import (
	"flag"
	"fmt"
	"github.com/goccy/go-json"
	"os"
)

type Feature string

const (
	JOSECredential    Feature = "credential_jose"
	COSECredential    Feature = "credential_cose"
	SDJWTCredential   Feature = "credential_sdjwt"
	JOSEPresentation  Feature = "presentation_jose"
	COSEPresentation  Feature = "presentation_cose"
	SDJWTPresentation Feature = "presentation_sdjwt"
)

type Status string

const (
	Success       Status = "success"
	Failure       Status = "failure"
	Indeterminate Status = "indeterminate"
)

type Result struct {
	Result Status `json:"result"`
	Data   string `json:"data"`
}

func main() {
	if len(os.Args) < 4 {
		panic("must supply [input, key, feature, output] arguments")
	}

	var input, key, feature, output string

	verifyCmd := flag.NewFlagSet("verify", flag.ExitOnError)
	verifyCmd.StringVar(&input, "input", "", "input file")
	verifyCmd.StringVar(&key, "key", "", "input key file")
	verifyCmd.StringVar(&feature, "feature", "", "feature to test (e.g credential_jose, presentation_sdjwt)")
	verifyCmd.StringVar(&output, "output", "", "output file")

	issueCmd := flag.NewFlagSet("issue", flag.ExitOnError)
	issueCmd.StringVar(&input, "input", "", "input file")
	issueCmd.StringVar(&key, "key", "", "input key file")
	issueCmd.StringVar(&feature, "feature", "", "feature to test (e.g credential_jose, presentation_sdjwt)")
	issueCmd.StringVar(&output, "output", "", "output file")

	switch os.Args[1] {
	case "issue":
		if err := issueCmd.Parse(os.Args[2:]); err != nil {
			fmt.Printf("error parsing flags: %s\n", err.Error())
			os.Exit(1)
		}
		fmt.Printf("flags parsed: input=%s, key=%s, feature=%s, output=%s\n", input, key, feature, output)

		validateFlags(input, key, feature, output)

		result, err := Issue(input, key, Feature(feature))
		if err != nil {
			fmt.Printf("error issuing %s: %s\n", feature, err.Error())
			// Write failure result to output file
			writeEmptyResult(Failure, output)
			os.Exit(1)
		}

		// Write the result to the output file
		writeResult(*result, output)
		fmt.Printf("Successfully wrote output to file\n")
	case "verify":
		if err := verifyCmd.Parse(os.Args[2:]); err != nil {
			fmt.Printf("error parsing flags: %s\n", err.Error())
			os.Exit(1)
		}
		fmt.Printf("flags parsed: input=%s, key=%s, feature=%s, output=%s\n", input, key, feature, output)

		validateFlags(input, key, feature, output)

		result, err := Verify(input, key, Feature(feature))
		if err != nil || result == nil {
			fmt.Printf("error verifying %s: %s\n", feature, err.Error())
			writeEmptyResult(Failure, output)
			os.Exit(1)
		}

		// Write the result to the output file
		writeResult(*result, output)
		fmt.Printf("Successfully wrote output to file\n")
	default:
		fmt.Println("expected 'issue' or 'verify' command")
		os.Exit(1)
	}
}

func validateFlags(input, key, feature, output string) {
	if input == "" {
		fmt.Println("no input file specified")
		os.Exit(1)
	}
	if key == "" {
		fmt.Println("no key file specified")
		os.Exit(1)
	}
	if feature == "" {
		fmt.Println("no feature specified")
		os.Exit(1)
	} else {
		if !isValidFeature(feature) {
			fmt.Println("invalid feature specified")
			os.Exit(1)
		}
	}
	if output == "" {
		fmt.Println("no output file specified")
		os.Exit(1)
	}
}

func writeResult(result Result, outputFile string) {
	outputBytes, err := json.Marshal(result)
	if err != nil {
		fmt.Printf("error marshaling output: %v\n", err)
	}

	fmt.Printf("Attempting to write output to file: %s\n", outputFile)
	if err = os.WriteFile(outputFile, outputBytes, 0644); err != nil {
		fmt.Printf("error writing output file: %v\n", err)
	}
}

func writeEmptyResult(status Status, outputFile string) {
	result := Result{
		Result: status,
	}
	writeResult(result, outputFile)
}

func isValidFeature(f string) bool {
	for _, feature := range getSupportedFeatures() {
		if Feature(f) == feature {
			return true
		}
	}
	return false
}

func getSupportedFeatures() []Feature {
	return []Feature{JOSECredential, COSECredential, SDJWTCredential, JOSEPresentation, COSEPresentation, SDJWTPresentation}
}
