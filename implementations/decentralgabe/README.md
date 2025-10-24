## Running

To run the implementation validator, use the following command structure:

```bash
go run . [command] \
 --input /path/to/input.json \
 --key /path/to/key.json \
 --feature [feature] \ 
 --output /path/to/output.json 
```
Where possible commands are `issue` and `verify` and possible features are `credential_jose`, `presentation_jose`, `credential_cose`, `presentation_cose`, `credential_sdjwt`, and `presentation_sdjwt`.

For example:

```bash
go run . issue \
  --input ../../tests/input/credential-minimal.json \
  --key ../../tests/input/vm-ed25519.json \
  --feature credential_jose \
  --output ../../tests/output/credential-minimal.json
```

## Docker

### Building

To build the Docker image:

```bash
docker build -t decentralgabe .
```

### Running

To run the validator using Docker:

```bash
docker run -v $(pwd)/tests:/tests decentralgabe issue \
  --input /tests/input/credential-minimal.json \
  --key /tests/input/vm-ed25519.json \
  --feature credential_jose \
  --output /tests/output/credential-minimal.json
```

Make sure to mount the appropriate directories for input and output files.
