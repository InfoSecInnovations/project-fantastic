pipeline {
  agent {
    node {
      label 'Node'
    }

  }
  stages {
    stage('publish') {
      steps {
        sh 'npm i'
        sh 'npx lerna publish --yes'
      }
    }
  }
}