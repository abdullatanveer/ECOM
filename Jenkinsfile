pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    // Build backend Docker image
                    dir('backend') {
                        docker.build('backend-image') // Replace 'backend-image' with your image name
                    }

                    // Build frontend Docker image
                    dir('frontend') {
                        docker.build('frontend-image') // Replace 'frontend-image' with your image name
                    }
                }
            }
        }
        stage('Run Docker Compose') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }
}
