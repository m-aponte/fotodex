# fotodex
A basic single page application to find and hang on to your favorite images from popular a photo sharing API.

A demo instance should be hosted soon and will be posted here. For now, a local setup is required.

The app is composed of a containerized frontend and api service, together with a mongo db instance for very basic persistence.

The frontend is a React single page app. The api service is a simple flask server which relies on a local mongo db instance via docker volume mapping.

A basic docker-compose setup is used for deploy configuration.

The docker-compose setup is also configured for real-time development. Note that the React assets are not yet bundled and deployed separately, rather this still relies on the dev server to run as a small project.

See [Future Improvements](#Future).

## Motivation
This app was built to get some practical experience connecting a frontend app written in ReactJS with backend Python Flask server that would persist data with a realistic but simple DB (thus the local mongo instance). The purpose of the simple dockerized development and deployment provide experience setting up a practical full stack developer workflow.

Basically, the goal was to practice a simple but realistic full stack web dev flow using JavaScript, Python, Docker, React, NPM, MongoDB, Git, etc.

## Installation
- Clone this repository.
- Make sure you have a local Docker server installed and running.
- From the top-level directory of the repository, bring the app up with `docker-compose up`. This should map a local volume in the directory for your mongo instance to persist your app data (depending on your OS, you may need to allow the docker container permission to create and edit files in the repository folder).

## Usage
The app should walk you through basic usage. Play around!
TODO: Add some screens with explanation of app usage.

## Credits
Photos are currently provided by the [Unsplash API](https://unsplash.com/) (and credited to the appropriate contributors in the app).
The base design and implementation of the project is built by me, participating in a bootcamp which is an [excellent course](https://stashchuk.com/full-stack-web-development-bootcamp) provided by instructor [Bogdan Stashchuk](https://github.com/bstashchuk).

## <a id="Future"></a> Future Improvements
- Productionize the React application to bundle and serve assets in a production-ready server such as nginx.
- Add unit tests for the flask server and the react application.
- Add an e2e test framework with some end-to-end driver based testing to simulate real users for final acceptance of changes.
- Integrate a CI pipeline with travis-ci or jenkins.
- Deploy a demo instance for users to test before installing locally.
- Integrate a basic user system to allow multiple users to sign up and use the same app instance.
- Add sharing functionality.
