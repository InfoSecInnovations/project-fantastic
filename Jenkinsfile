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
    GH_TOKEN = 'credentials(\'GH_TOKEN\')'
  }
}