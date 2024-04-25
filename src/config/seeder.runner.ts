// Import necessary TypeORM and TypeORM Extension classes for data source management and seeding
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { getDataSourceOptions } from './databases/mysql.datasource';
import yamlConfig from './yaml-config';

// Import function to create a database if it does not exist, from TypeORM Extension
import { createDatabase } from 'typeorm-extension';

// Define an asynchronous function to be the default export of this module
export default async () => {
  const config = yamlConfig(); // Load YAML configuration

  let db = config.db.mysql; // Extract MySQL database config from the loaded configuration

  // Create the database if it does not exist using the specified database configuration
  await createDatabase({
    ifNotExist: true,
    options: {
      type: db.type, // Database type (e.g., 'mysql')
      host: db.host, // Database host address
      port: db.port, // Database port
      username: db.username, // Database username
      password: db.password, // Database password
      database: db.database, // Database name
    },
  });

  // Create a new data source instance with the database configuration
  const dataSource = new DataSource(db as DataSourceOptions & SeederOptions);

  // Initialize the data source to establish the connection
  await dataSource.initialize();

  // The following commented code would potentially be used for seeding roles into the database
  // const rolesRepository =  dataSource.getRepository(Role);
  // let roles = config.seeders.roles
  // await rolesRepository.createQueryBuilder()
  // .insert()
  // .values(roles)
  // .orIgnore()
  // .execute();

  // Destroy the data source connection to clean up resources
  await dataSource.destroy();
};
