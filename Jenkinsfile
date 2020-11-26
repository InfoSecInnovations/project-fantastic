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
git config --global user.name "Sebastian Boutin Blomfield"

npx lerna publish patch --yes'''
      }
    }
  }
}