// Import the readFileSync function from the (filesystem) module to read files
import { readFileSync } from 'fs';

// Import the entire 'js-yaml' module to parse YAML files
import * as yaml from 'js-yaml';

// Import the join function from the 'path' module to safely concatenate paths
import { join } from 'path';

// Import the config function from the 'dotenv' package to load environment variables from a .env file
import { config } from 'dotenv';

// Execute the config function to load environment variables from the .env file into process.env
config();

// Define a constant for the YAML configuration filename, read from an environment variable
const YAML_CONFIG_FILENAME = process.env.CONFIG_FILE;

// Export a default function that loads and parses the YAML configuration file
export default () => {
  return yaml.load(
    readFileSync(join(getConfigPath(), YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>; // Type assertion for TypeScript, assuming the YAML content is an object
};

// Export a function to determine the configuration path, either from the current working directory or from a command line argument
export function getConfigPath(){
  let configPath = process.cwd(); // Start with the current working directory as the default configuration path
  const configIndex = process.argv.findIndex((arg: string) => /^\-\-config=/.test(arg)); // Find the index of the command-line argument specifying a config path
  if (configIndex > -1) { // If a config path is specified in the command-line arguments
    configPath = process.argv[configIndex]; // Get the argument
    configPath = configPath.replace("--config=", ""); // Remove the "--config=" prefix to isolate the path
  }
  return configPath; // Return the determined path
}
