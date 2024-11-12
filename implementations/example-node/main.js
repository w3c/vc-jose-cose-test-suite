#!/usr/bin/env node
import { program } from "commander";
import { readFile, writeFile } from 'node:fs/promises'

program
    .requiredOption("--input <input_file>", "Path to the input file within the container")
    .requiredOption("--config <config_json>", "JSON string containing test configuration")
    .requiredOption("--output <output_file>", "Path where the output should be written within the container")
    .action(async (options) => {
        const credential = await readFile(options.input).then(buffer => buffer.toString()).then(JSON.parse);
        const config = JSON.parse(options.config);

        const result = performChecks(credential, config)

        await writeFile(options.output, JSON.stringify({ result }), 'utf8');
    });

function performChecks(credential, config) {
    switch (config.check) {
        case "identifier":
            try {
                new URL(credential.id)
                return 'success';
            } catch (e) {
                console.warn(`Invalid URL: ${credential.id}`, e);
                return 'failure';
            }
        case "type":
            if (typeof credential.type === 'string' && credential.type === config.expected_type) return 'success';
            if (Array.isArray(credential.type) && credential.type.includes(config.expected_type)) return 'success';
            return 'failure';
        case "issuance_date":
            if (new Date(credential.issuanceDate).getTime() > 0) return 'success';
            return 'failure';
        default:
            console.error(`Unknown check: ${config.check}`);
            return TestResult.error;
    }
}

program.parse(process.argv);