package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	if len(os.Args) < 3 {
		panic("must supply [input, config, output] arguments")
	}

	var input, config, output string

	validateCmd := flag.NewFlagSet("validate", flag.ExitOnError)
	validateCmd.StringVar(&input, "input", "", "input credential file")
	validateCmd.StringVar(&config, "config", "", "validation config")
	validateCmd.StringVar(&output, "output", "", "output file")

	switch os.Args[1] {
	case "validate":
		if err := validateCmd.Parse(os.Args[2:]); err != nil {
			fmt.Printf("error parsing flags: %s\n", err.Error())
			os.Exit(1)
		}
		fmt.Printf("flags parsed: input=%s, config=%s, output=%s\n", input, config, output)

		// Log current working directory and list files in input directory
		pwd, _ := os.Getwd()
		fmt.Printf("Current working directory: %s\n", pwd)

		inputDir := filepath.Dir(input)
		files, err := os.ReadDir(inputDir)
		if err != nil {
			fmt.Printf("Error reading input directory %s: %v\n", inputDir, err)
		} else {
			fmt.Printf("Files in input directory %s:\n", inputDir)
			for _, file := range files {
				fmt.Printf("  %s\n", file.Name())
			}
		}

		validateFlags(input, config, output)
		if err = ValidateCredential(input, config, output); err != nil {
			fmt.Printf("error validating credential: %s\n", err.Error())
			// Write failure result to output file
			writeFailureResult(output)
			os.Exit(1)
		}
		fmt.Println("credential validated; output written to file")
	default:
		fmt.Println("expected 'validate' command")
		os.Exit(1)
	}
}

func validateFlags(input, config, output string) {
	if input == "" {
		fmt.Println("no input file specified")
		os.Exit(1)
	}
	if config == "" {
		fmt.Println("no config specified")
		os.Exit(1)
	}
	if output == "" {
		fmt.Println("no output file specified")
		os.Exit(1)
	}
}

func writeFailureResult(output string) {
	failureResult := []byte(`{"result":"failure"}`)
	if err := os.WriteFile(output, failureResult, 0644); err != nil {
		fmt.Printf("error writing failure result to output file: %s\n", err.Error())
	}
}
