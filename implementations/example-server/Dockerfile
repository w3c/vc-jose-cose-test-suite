# Use the official Golang image
FROM golang:1.22

# Install necessary tools
RUN apt-get update && apt-get install -y curl jq

WORKDIR /app

# Copy go.mod and go.sum (if it exists)
COPY go.mod ./
COPY go.sum* ./

# Download all dependencies
RUN go mod download

# Copy the source code and shell script
COPY . .

# Build the Go app
RUN go build -o example-server .

# Make the shell script executable
RUN chmod +x cli.sh

# Set the entry point to the shell script
ENTRYPOINT ["./cli.sh"]
