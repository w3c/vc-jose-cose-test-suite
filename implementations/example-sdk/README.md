## Running

To run the validator, use the following command structure:

```bash
./sample-vc-validator validate --input  --config '' --output 
```

For example:

```bash
./sample-vc-validator validate \
  --input ../../tests/input/valid-credential.json \
  --config '{"check":"identifier"}' \
  --output ../../tests/output/1-sample-impl.json
```

## Docker

### Building

To build the Docker image:

```bash
docker build -t sample-vc-validator .
```

### Running

To run the validator using Docker:

```bash
docker run -v $(pwd)/tests:/tests sample-vc-validator validate \
  --input /tests/input/valid-credential.json \
  --config '{"check":"identifier"}' \
  --output /tests/output/1-sample-impl.json
```

Make sure to mount the appropriate directories for input and output files.
