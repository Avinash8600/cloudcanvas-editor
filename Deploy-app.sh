#!/bin/bash

#------------------------------------------
# Project: Cloud Canvas Editor
# Purpose: Deploy Static Web Application
# Note : Deploying the app using shell scripting and error handling
#------------------------------------------


app_clone()
{

	if [[ -d "cloudcanvas-editor" ]]; then
		echo "Project directory already exists. Skipping clone."
	else
		echo "Cloning the Web application here..."
       		git clone https://github.com/Avinash8600/cloudcanvas-editor.git
	fi
}

app_deploy()
{
        echo "Starting local server on port 8000. Please check"
        python3 -m http.server 8000
}

echo "************************************ DEPLOYMENT STARTED ************************************"

# Calling the functions with error handling

app_clone

cd cloudcanvas-editor || exit

if ! app_deploy; then

        echo "Deployment failed. Install required dependencies."
fi

echo "************************************ DEPLOYMENT DONE ************************************"
