properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '5')), disableConcurrentBuilds()])

node {
    def workspace = pwd()
    try {
        stage ('Clone') {
        	checkout scm
        }
      	stage ('Deploy') {
      	    sh "npm init -y"
      	    sh "npm install serverless-domain-manager --save-dev"
      	    sh "npm install faas-grip"
      	    sh "serverless deploy"
      	}
    } catch (err) {
        currentBuild.result = 'FAILED'
        throw err
    }

}