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
