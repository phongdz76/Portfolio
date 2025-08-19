pipeline {
    agent any
    
    environment {
        // ANSI Color Code
        RESET_COLOR = '\033[0m'
        RED = '\033[31m'
        GREEN = '\033[032m'
        BLUE = '\033[034m'
        YELLOW = '\033[033m'
        PURPLE = '\033[035m'

        // Project info
        APP_NAME = "wibu-portfolio"
        RELEASE = "1.0.0"
        GITHUB_URL = "https://github.com/phongdz76/Portfolio.git"

        // Docker info
        DOCKER_USER = "fleeforezz"
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_RELEASE_TAG = "${RELEASE}-${BUILD_NUMBER}"
        IMAGE_LATEST_TAG = "latest"
        IMAGE_BETA_TAG = "beta"
    }

    stages {
        stage('Clean up WorkSpace') {
            steps {
                echo "####################### ${RED}Clean up WorkSpace${RESET_COLOR} #######################"
                cleanWs()
            }
        }
        
        stage('Git Checkout') {
            steps {
                echo "####################### Git Checkout #######################"
                git branch: 'main', url: "${GITHUB_URL}"
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'Docker_Login', toolName: 'Docker', url: 'https://index.docker.io/v1/') {
                        echo "####################### ${BLUE}Docker build${RESET_COLOR} #######################"
                        sh "docker build --pull -t ${IMAGE_NAME}:${IMAGE_LATEST_TAG} ."
                    }
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'Docker_Login', toolName: 'Docker', url: 'https://index.docker.io/v1/') {
                        echo "####################### ${BLUE}Push Docker Image to Dockerhub Registry${RESET_COLOR} #######################"
                        sh "docker push ${IMAGE_NAME}:${IMAGE_LATEST_TAG}"
                    }
                }
            }
        }
        
        // stage('Deploy to server') {
        //     steps {
        //         sshagent(['production-srv']) {
        //             sh "ssh -o StrictHostKeyChecking=no -l ${SERVER_CONNECTION}  'sudo docker stop ${APP_NAME} || true && sudo docker rm ${APP_NAME} || true'"
        //             sh "ssh -o StrictHostKeyChecking=no -l ${SERVER_CONNECTION} 'sudo docker run -p 9463:9463 -d --name ${APP_NAME} --restart unless-stopped ${IMAGE_NAME}'"
        //         }
        //     }
        // }
        
        // stage('Deploy to Kubernetes') {
        //     steps {
        //         echo "####################### ${PURPLE}Deploy to Kubernetes${RESET_COLOR} #######################"
        //         script {
        //             dir('Kubernetes') { 
        //                 withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'k8s', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
        //                     sh 'kubectl apply -f manifest.yml'
        //                     sh 'kubectl get svc'
        //                     sh 'kubectl get all'
        //                 }
        //             }
        //         }
        //     }
        // }
    }
    
    post {
        always {
            emailext attachLog: true, 
            subject: "${currentBuild.result}",
            body: "Project: ${env.JOB_NAME}<br/>" +
            "Build Number: ${env.BUILD_NUMBER}<br/>" +
            "Docker Image Tag: ${IMAGE_RELEASE_TAG}<br/>" +
            "URL: ${env.BUILD_URL}<br/>",
            to: 'fleeforezz@gmail.com',
            attachmentsPattern: 'trivyfs.txt, trivyimage.txt'
        }
    }
}
