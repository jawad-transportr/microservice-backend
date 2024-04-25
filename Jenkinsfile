pipeline {
    agent any // This specifies that the pipeline can run on any available agent

    tools {nodejs "Node LTS"}
        // Define environment variables
        environment {
        GH_TOKEN  = credentials('gittoken')
        GIT_LOCAL_BRANCH = 'main'
    }
    stages {
        // Use the sh command to run shell commands if you're on Linux or Mac, or bat on Windows
        stage('run install') {
            steps {
                sh 'npm install'
            }
        }
        // Build the application using Nest CLI
        stage('run  build') {
            steps {
                sh 'npm run build'
            }
        }
        // Running tests with coverage
        stage('run test') {
            steps {
                sh 'CONFIG_FILE=config-jenkins.yaml npm run test'
            }
        }
        // handles npm publishing analyzes commits to determine the version bump
        stage('release') {
            steps {
                sh 'npx semantic-release'
            }
        }
        // Building the Docker Image
        stage('containerize') {
            steps {
                sh 'bash containerize.sh'
            }
        }
        
    }
}
