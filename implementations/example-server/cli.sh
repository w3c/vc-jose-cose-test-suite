#!/bin/bash

# Function to send a POST request to the example server
send_request() {
    local input_file=$1
    local config=$2
    local output_file=$3

    echo "Input file: $input_file"
    echo "Config: $config"
    echo "Output file: $output_file"

    # Read the input file
    if [ ! -f "$input_file" ]; then
        echo "Error: Input file not found: $input_file"
        return 1
    fi
    credential=$(cat "$input_file")

    # Construct the JSON payload
    payload=$(jq -n \
                  --argjson cred "$credential" \
                  --argjson conf "$config" \
                  '{credential: $cred, config: $conf}')

    # Send the POST request
    response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -d "$payload" \
        http://localhost:8080/validate)

    # Write the response to the output file
    echo "$response" > "$output_file"

    echo "Response written to $output_file"
    echo "Response content: $response"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    validate)
      shift
      ;;
    --input)
      input_file="$2"
      shift 2
      ;;
    --config)
      config="$2"
      shift 2
      ;;
    --output)
      output_file="$2"
      shift 2
      ;;
    *)
      echo "Unknown argument: $1"
      exit 1
      ;;
  esac
done

# Check if required arguments are provided
if [ -z "$input_file" ] || [ -z "$config" ] || [ -z "$output_file" ]; then
    echo "Usage: $0 validate --input <input_file> --config '<config>' --output <output_file>"
    exit 1
fi

echo "Starting web server..."
# Start the web server in the background
./example-server &
SERVER_PID=$!

# Wait for the server to start
sleep 2

echo "Sending request..."
# Call the function to send the request
if ! send_request "$input_file" "$config" "$output_file"; then
    echo "Error occurred during request processing"
    kill $SERVER_PID
    exit 1
fi

echo "Stopping web server..."
# Stop the web server
kill $SERVER_PID

# Display the result
if [ -f "$output_file" ]; then
    result=$(jq -r .result "$output_file" 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo "Validation result: $result"
    else
        echo "Error: Unable to parse JSON from output file. File contents:"
        cat "$output_file"
    fi
else
    echo "Error: Output file not found: $output_file"
fi
