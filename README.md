Participant Management Application

## Description

This application is designed to manage participants in a system. It allows you to add, update, retrieve, and soft-delete participants.

## Installation

```bash
# Clone the repository
git clone https://github.com/magols88/SRV-CA.git

# Navigate to the project directory
cd SRV-CA

# Install dependencies
npm install
```

## Usage

# Start the application

```bash
npm start

```

## API Endpoints

- `GET /participants`: Returns all participants in the database.
- `GET /participants/details`: Returns the personal details of all active participants.
- `GET /participants/details/deleted`: Returns the details of all soft-deleted participants.
- `GET /participants/details/:email`: Returns the personal details of the active participant with the provided email.
- `GET /participants/details/work/:email`: Returns the work details of the active participant with the provided email.
- `GET /participants/details/home/:email`: Returns the home details of the active participant with the provided email.
- `POST /participants/add`: Adds a new participant.
- `DELETE /participants/:email`: Soft-deletes the participant with the provided email.
- `PUT /participants/:email`: Updates the participant with the provided email.

## .env

```bash
CYCLIC_DB=lonely-clam-slacksCyclicDB
CYCLIC_APP_ID=lonely-clam-slacks
CYCLIC_APP_SECRET='14e1f834bc15b82421ed802b9518041eaebc3722f3e6a3392986c0551f6706dc9c6ca761bb6f5444ba19bf2242fa34e90be16b58333eb1684f39a12f0b190d30'
```

## Cyclic.sh app

- https://lonely-clam-slacks.cyclic.app/

## Postman Documentation

- https://documenter.getpostman.com/view/30423924/2s9Yyy9K6A
