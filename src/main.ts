// Import necessary classes from the NestJS core package
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';

// Import the root module of the application
import { AppModule } from './app.module';

// Import the ValidationPipe class used for request data validation
import { ValidationPipe } from '@nestjs/common';

// Import custom middleware and interceptors from a common package
import {
  HttpExceptionFilter, // Error handling filter that logs errors through Kafka and returns an error response
  RoleGuard, // Middleware for role-based access control
  TransformInterceptor, // Interceptor to encapsulate and standardize API responses
} from '@transportruae/efcommon';

// Import YAML configuration utility
import yamlConfig from './config/yaml-config';

// Import dotenv for environment variable management
import { config } from 'dotenv';

// Import Helmet for security enhancements by setting various HTTP headers
import helmet from 'helmet';

// Import package.json for accessing metadata like app version
var pjson = require('../package.json');

// Define an asynchronous bootstrap function to setup the NestJS application
async function bootstrap() {
  // Load environment variables
  config();

  const yConfig = yamlConfig(); // Load configuration from a YAML file
  const app = await NestFactory.create(AppModule); // Create an instance of the application using the AppModule

  // Apply global validation pipes with transformation enabled
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Apply a global interceptor that formats the response structure
  app.useGlobalInterceptors(new TransformInterceptor());

  // Get the HTTP adapter for handling exceptions
  const httpAdapterHost = app.get(HttpAdapterHost);

  // Apply a global exception filter that logs errors to Kafka and formats error responses
  app.useGlobalFilters(
    new HttpExceptionFilter(
      httpAdapterHost,
      yConfig.kafka,
      `${pjson.name}:${pjson.version}`,
    ),
  );

  // Get the Reflector utility for inspecting metadata in guards
  const reflector = app.get(Reflector);

  // Apply a global guard for role-based access control
  app.useGlobalGuards(new RoleGuard(reflector));

  // Use Helmet to enhance application security
  app.use(helmet());

  // Start any configured microservices
  await app.startAllMicroservices();

  app.setGlobalPrefix(yamlConfig().prefix);

  // Determine the port to listen on from environment variables or YAML configuration
  const port = parseInt(process.env.PORT) || parseInt(yConfig.http.port);

  // Start listening for incoming requests on the determined port
  await app.listen(port);
}

// Execute the bootstrap function to start the application
bootstrap();
