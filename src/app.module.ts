// Import necessary decorators and types from the NestJS common module
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
  RequestMethod,
} from '@nestjs/common';

// Import the application's main controller
import { AppController } from './app.controller';

// Import the application's main service
import { AppService } from './app.service';

// Import functions to create a database and get database options from the MySQL datasource configuration
import {
  createDB,
  getDataSourceOptions,
} from './config/databases/mysql.datasource';

// Import the TypeOrmModule for integration with TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Import Kafka module and authentication middleware from a custom package
import { KafkaModule, AuthMiddlewareMixin } from '@transportruae/efcommon';

// Import a function to run data seeders
import seederRunner from './config/seeder.runner';

// Import configuration handling utilities for managing YAML configurations
import yamlConfig, { getConfigPath } from './config/yaml-config';
import { SampleModule } from './sample/sample.module';

// Decorator that marks a class as a module, and provides metadata that Nest makes use of to organize the application structure
@Module({
  imports: [
    // Async import of the TypeORM module with a factory that initializes the database and fetches its configuration
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await createDB();
        return getDataSourceOptions();
      },
    }),
    // Kafka module initialization with settings from the YAML configuration
    KafkaModule.forRoot(yamlConfig().kafka),
    SampleModule,
  ],
  controllers: [AppController], // List of controllers declared in this module
  providers: [AppService], // List of providers declared in this module
})
export class AppModule implements OnApplicationBootstrap, NestModule {
  // Lifecycle hook that is called once the application has fully started
  onApplicationBootstrap() {
    // Run the seeder to populate the database with initial data
    seederRunner();
  }

  // Method to configure middleware in this module's context
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   // Apply the authentication middleware to all routes in the application
    //   .apply(AuthMiddlewareMixin(yamlConfig(), getConfigPath()))
    //   .forRoutes('*');
  }
}
