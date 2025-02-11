# Contact Management API
This is a Node.js & Express.js backend application for managing contacts. It provides API endpoints for creating, retrieving, updating, and deleting contacts. The project follows best practices, including input validation (Express Validator), database interactions (MongoDB with Mongoose), authentication, and testing using Jest & Supertest.

## Features
- `RESTful API` for contact management
- MongoDB with `Mongoose` for database operations
- `Express Validator` for request validation
- `Jest & Supertest` for unit testing
- `CORS` enabled to support frontend integration
- Environment variables for secure configuration

## Setup & Installation
### Prerequisites
- `Node.js`
- `npm` (Node Package Manager)
- `Express.js` for server-side framework.
- `MongoDB` or Mongoose for database interactions.
- `dontenv` for environment variables
- `express-validator` for data validation.
- `Body-parser` or `express.json()` for parsing incoming request bodies.
- `Nodemon` for development (optional).
- `Jest` and `supertest`for unit testing.

``` sh
npm install express nodemon mongoose dotenv body-parser express-validator jest supertest
```

### Clone the Repository
```sh
git clone https://github.com/yourusername/contact_manager.git
cd contact-api
```
###  Install Dependencies
``` sh
npm install
```
### Set Up Environment Variables
  Create a .env file in the root directory and configure it:

``` env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/contactDB  # Replace with your MongoDB connection string
MONGO_URI_TEST=mongodb://localhost:27017/contactDB  # Replace with your Test MongoDB connection string for unit tests
```
### Start the Server
``` sh
 npm start 
```

# API Endpoints
### Create a Contact
### POST /api/contacts
#### Request:
``` json
{
  "name": "xyz",
  "email": "xyz@example.com",
  "phone": "4400778899",
  "address": "123 Street, UK"
}
```

#### Response

``` json
{
  "success": true,
  "message": "Contact created successfully",
  "contact": {
    "name": "xyz",
    "email": "xyz@example.com",
    "phone": "4400778899",
    "address": "123 Street, UK",
    "_id": "67aafd944c0f8f980207398f",
    "createdAt": "2025-02-11T07:34:44.777Z",
    "updatedAt": "2025-02-11T07:34:44.777Z",
    "__v": 0
  }
}

```

### Get All Contacts
### GET /api/contacts
#### Response:
``` json 
{
  "success": true,
  "message": "Contacts retrieved successfully",
  "totalContacts": 6,
  "contacts": [
    {
      "_id": "67aa3d5921c737a2159bc37b",
      "name": "David",
      "email": "david@example.com",
      "phone": "6655447788",
      "address": "king david street, India",
      "createdAt": "2025-02-10T17:54:33.234Z",
      "updatedAt": "2025-02-10T17:54:33.234Z",
      "__v": 0
    },
    {
      "_id": "67aa449784c25f827c09e4d4",
      "name": "Joe",
      "email": "joe@example.com",
      "phone": "6655449988",
      "address": "st Peters villa, India",
      "createdAt": "2025-02-10T18:25:27.341Z",
      "updatedAt": "2025-02-10T18:25:27.341Z",
      "__v": 0
    },
    {...},
    {...},
    ...
  ]
}

```

### Get a Contact by ID
### GET /api/contacts/:id
#### Response:

``` json
{
      "_id": "67aa449784c25f827c09e4d4",
      "name": "Joe",
      "email": "joe@example.com",
      "phone": "6655449988",
      "address": "st Peters villa, India",
      "createdAt": "2025-02-10T18:25:27.341Z",
      "updatedAt": "2025-02-10T18:25:27.341Z",
      "__v": 0
}
```

### Update a Contact by ID
### PUT /api/contacts/:id
#### Request:

``` json 
{
  "name": "John Updated",
  "email": "johnupdated@example.com"
}
```

### Response 
``` json
{
  "success": true,
  "message": "Contact updated successfully",
  "updatedContact": { "id": "xyz123", "name": "John Updated" }
}
```

### Delete a Contact
### DELETE /api/contacts/:id
#### Response:

``` json 
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

## Running Unit Tests
### We use Jest & Supertest for testing.
#### To run tests, execute:
``` sh
npm test
```
### Example test case (contact.test.js):
``` js
const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

let contactId;
process.env.NODE_ENV = "test";

describe("Contact API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  // 1.Test for creating a new contact
  test("Should create a new contact", async () => {
    const newContact = {
      name: "Sophie",
      email: "sophie@example.com",
      phone: "8847895647",
      address: "123 Street, City",
    };

    const response = await request(app).post("/contacts").send(newContact);

    expect(response.status).toBe(201);
    expect(response.body.contact).toHaveProperty("name", "Sophie");

    contactId = response.body.contact._id;
  });

  // 2.Test for fetching all contacts
  test("Should fetch all contacts or filter contacts using search query", async () => {
    ...
  });

  // 3.Test for fetching a single contact
  test("Should fetch a single contact by ID", async () => {
    ...
  });

  // 4.Test for updating a contact by ID
  test("Should update a contact by ID", async () => {
    ...
  });

  // 5.Test for deleting a contact by ID
  test("Should delete a contact by ID", async () => {
    ...
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

```

## Deployment
### Deploying on `Render` (Free)
- Push your code to `GitHub`
- Go to Render.com → `Create a new Web Service`
- Connect your `GitHub repository`
- Set Build Command: `npm install`
- Set Start Command: `npm start`
- Add `Environment Variables` in Render's settings
- Click Deploy 

## Thought Process & Design Considerations
- Data Validation: Used express-validator to sanitize and validate inputs.
- Error Handling: Implemented structured error messages with proper HTTP status codes.
- Security: Enabled CORS for frontend communication
- Testing: Used Jest & Supertest to ensure API correctness.
- Deployment: Tested on Render for easy scalability.