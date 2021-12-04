# fotodex
A basic single page application to find and hang on to your favorite images from popular a photo sharing API.

A demo instance should be hosted soon and will be posted here. For now, a local setup is required.

The app is composed of a containerized frontend and api service, together with a mongo db instance for very basic persistence.

The frontend is a React single page app. The api service is a simple flask server which relies on a local mongo db instance via docker volume mapping.

A basic docker-compose setup is used for deploy configuration.

The docker-compose setup is also configured for real-time development. Note that the React assets are not yet bundled and deployed separately, rather this still relies on the dev server to run as a small project.

See [Future Improvements](#Future).

## Motivation

## Installation

## Usage

## Credits

## <a id="Future"></a> Future Improvements
