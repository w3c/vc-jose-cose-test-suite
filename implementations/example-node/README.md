This is a example Node implementation CLI wrapper for an implementation. Once the CLI is in place, you can take the command and forward it to an JS library implementation or API endpoint.

## Running

The wrapper exposes the `validate` CLI command. If you want to try this locally outside of the Docker environment, navigate to this package (e.g., `cd implementations/example-node`), and run the following commands:

```bash
npm install
npm link
```

Subsequently, you will be able to run the implementation without needing Docker:

```bash
validate --input <input-file>  --config <config-json> --output <output-file> 
```

For example:

```bash
validate \
  --input ../../tests/input/valid-credential.json \
  --config '{"check":"identifier"}' \
  --output ../../tests/output/1-sample-impl.json
```

## Docker

### Building

To build the Docker image:

```bash
docker build -t example-node-validator .
```

### Running

To run the validator using Docker, mount the appropriate directories for input and output files, and issue a command like the following:

```bash
docker run -v $(pwd)/tests:/tests example-node-validator validate \
  --input /tests/input/valid-credential.json \
  --config '{"check":"identifier"}' \
  --output /tests/output/1-sample-impl.json
```
