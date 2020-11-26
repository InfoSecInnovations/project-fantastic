pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'npm i'
      }
    }
    stage('publish') {
      steps {
        sh '''git config --global user.email "sebyihi@yahoo.fr"
git config --global user.name "sebovzeoueb"
git remote set-url origin https://sebovzeoueb:$GH_TOKEN@github.com/InfoSecInnovations/project-fantastic.git

npx lerna publish patch --yes'''
      }
    }
  }
  environment {
    GH_TOKEN = '590b520d22e08f9b3fd42fe50baf2e7f2752dffc'
  }
}