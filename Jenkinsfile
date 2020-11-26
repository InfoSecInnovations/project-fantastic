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
        sh 'npx lerna publish patch --yes'
      }
    }
  }
}