<p align="center">
 MICROSERVICES INITIALIZATION
</p>

## Description

This guide outlines the initial setup process for a microservices architecture using NestJS. It includes steps for creating directories, initializing projects, adding dependencies, and configuring services.

## Prerequisites

Before you begin, make sure you have installed:

Node.js
Yarn
Docker
Nest CLI

## Setup Steps

<b> Creating a Directory for Microservices </b>

Create and navigate into a new directory for your microservices:

```bash
$ mkdir MicroServicesFolder
$ cd MicroServicesFolder
```

<b> Initializing a New NestJS Project </b>

Initialize a new NestJS project within the current directory:

```bash
$ nest n .
```

<b> Adding Dependencies </b>

Add necessary runtime dependencies for the project:

```bash
$ yarn add @nestjs/config @nestjs/mapped-types @nestjs/microservices @nestjs/typeorm @transportruae/efcommon class-transformer class-validator helmet js-yaml kafkajs mysql2 nanoid pino typeorm typeorm-extension
```

<b> Adding Development Dependencies </b>

Add development-specific dependencies for versioning and testing:

```bash
$ yarn add -D @codedependant/semantic-release-docker @semantic-release/commit-analyzer @semantic-release/git @types/js-yaml semantic-release

```

<b> Copying Configuration Files </b>

Copy and organize configuration files within the project:

- ./src/config
  - /databases
    - mysql.datasource.ts
  - /jenkins
    - seeder-jenkins.runner.ts
    - teardown-jenkins.runner.ts
  - seeder.runner.ts
  - yaml-config.ts
  - main.ts
- .releaserc
- compose.yml
- config-sample.yaml (rename for testing and deployment configurations)
  - config-jenkins.yaml
  - config.yaml
- containerize.sh
- Dockerfile
- Dockerfile.development
- Jenkinsfile
- easyfleet-public.pem
- .env.example

<b> Generating a New Resource with NestJS CLI </b>

Generate a new resource for invoicing:

```bash
$ nest g resource newResource
```

<b> Adding Jest Configuration to package.json </b>

Update the Jest configuration in package.json for unit testing:

```js

"jest": {
    "globalTeardown": "<rootDir>/config/jenkins/teardown-jenkins.runner.ts",
    "globalSetup": "<rootDir>/config/jenkins/seeder-jenkins.runner.ts",
    "moduleNameMapper": {
        "^src/(.*)$": "<rootDir>/$1"
    },
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {"^.+\\.(t|j)s$": "ts-jest"},
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
}

```

<b> Starting Docker Compose Services </b>

Manage Docker services for setups like Kafka:

```bash
$ docker compose down
$ docker compose up
```

## Installation

```bash
$ yarn install
```

## Building the Application

```bash
$ yarn build
```

## Running the Application

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Build a Docker image for deployment:

```bash
$ yarn run dockerize
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
