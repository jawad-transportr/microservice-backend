// Import necessary functions and types from the NestJS configuration and TypeORM modules
import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, createDatabase } from 'typeorm-extension';

// Import a function to load YAML configuration, which contains database settings
import yamlConfig from '../yaml-config';

// Define a function that returns TypeORM module options combined with seeder options
const config = (): TypeOrmModuleOptions & SeederOptions => {
  const ymlLoader = yamlConfig(); // Load the YAML configuration
  return ymlLoader.db.mysql; // Return the MySQL configuration part
};

// Register the above configuration function under the name 'MYSQL' for dependency injection
export default registerAs('MYSQL', () => config());

// Define an asynchronous function to create the database if it doesn't exist
export const createDB = async () => {
  let db: any = config(); // Load database configuration
  await createDatabase({
    ifNotExist: true, // Only create the database if it does not already exist
    options: {
      // Database connection options
      type: db.type,
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
    },
  });
};

// Define a function to return data source options, which include TypeORM connection settings and seeder options
export const getDataSourceOptions = (): DataSourceOptions & SeederOptions => {
  const options: DataSourceOptions = { ...config() } as DataSourceOptions &
    SeederOptions; // Spread the database configuration into TypeORM options
  return options;
};
