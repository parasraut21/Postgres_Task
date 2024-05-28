# User-Wallet Manager API Documentation
## Introduction
- The User-Wallet Manager API provides endpoints to manage users and their wallet addresses.

## Base URL
- The base URL for accessing the API is /api.

## Endpoints
- 1. Users

- GET /api/users
Description: Retrieve a list of all users.
Response: Array of user objects.

- POST /api/users
Description: Create a new user.
Request Body:
name (string): The name of the user.
email (string): The email address of the user.
password (string): The password of the user.
Response: The created user object.

- GET /api/users/:id
Description: Retrieve a specific user by ID.
Response: The user object with the specified ID.

- PUT /api/users/:id
Description: Update an existing user.
Request Body: Same as the POST request.
Response: The updated user object.

- DELETE /api/users/:id
Description: Delete a user by ID.
Response: Status code indicating success or failure.

- 2. Wallet Addresses
- GET /api/walletAddresses
Description: Retrieve a list of all wallet addresses.
Response: Array of wallet address objects.

- POST /api/walletAddresses
Description: Create a new wallet address.
Request Body:
user_id (string): The ID of the user associated with the wallet address.
address (string): The wallet address.
Response: The created wallet address object.

- GET /api/walletAddresses/:id
Description: Retrieve a specific wallet address by ID.
Response: The wallet address object with the specified ID.

- PUT /api/walletAddresses/:id
Description: Update an existing wallet address.
Request Body: Same as the POST request.
Response: The updated wallet address object.

- DELETE /api/walletAddresses/:id
Description: Delete a wallet address by ID.
Response: Status code indicating success or failure.

## Setup Instructions
- To set up the User-Wallet Manager API, follow these steps:
- Clone the repository from GitHub.
- Navigate to the project directory.
- Install dependencies by running npm install.
- Start the development server with npm run dev.
- Access the API endpoints using the provided base URL.
