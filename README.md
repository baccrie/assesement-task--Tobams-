## Overview

The project includes a basic CRUD API for managing a collection of books. It is implemented using Node.js with Express.js and includes functionality for creating, reading, updating, and deleting books. Additionally, it handles file uploads for book cover images and integrates with MongoDB for data storage.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete books.
- **File Uploads**: Supports cover image uploads with file size limitations.
- **Error Handling**: Custom error handling for various types of errors including validation and database errors.
- **Documentation**: Swagger UI for API documentation.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Joi (for validation)
- Swagger UI (for API documentation)
- File Upload Handling

## Project Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Make sure you have MongoDB installed and running. You can download it from [mongodb.com](https://www.mongodb.com/try/download/community).

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/baccrie/tobams-intern-assessement
   cd tobams-intern-assessement
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` File**

   Create a `.env` file in the root directory and add your environment variables:

   ```
   MONGO_URI=mongodb://localhost:27017/your-database-name
   PORT=5000
   ```

4. **Run the Application**

   To start the application, use:

   ```bash
   npm start
   ```

   The server will be running on `http://localhost:5000`.

### Project Structure

- `src/`

  - `app.ts` - Main application file.
  - `model/`
    - `Book.ts` - Mongoose model for books.
  - `controller/` - Controllers for handling requests.
  - `middleware/` - Custom middleware (e.g., for file uploads).
  - `router/` - Route definitions.
  - `db/`
    - `connect.ts` - Database connection setup.

- `dist/` - Compiled JavaScript files.

- `tsconfig.json` - TypeScript configuration.

- `README.md` - Project documentation.

## API Endpoints

### 1. Create a Book

- **Endpoint**: `POST /books`
- **Request Body**:

  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "published_date": "2024-07-30",
    "ISBN": "123-456-789"
  }
  ```

- **Response**:

  ```json
  {
    "_id": "unique-id",
    "title": "Book Title",
    "author": "Author Name",
    "published_date": "2024-07-30T00:00:00.000Z",
    "ISBN": "123-456-789",
    "coverImage": "",
    "__v": 0
  }
  ```

### 2. Update Book Cover Picture

- **Endpoint**: `PATCH /books/cover-image/:id`
- **Request Parameters**: `id` (Book ID)

  ### Request Body

- **Form-data Parameters:**

  - `coverImage` (required) — The new cover image file. The file should be sent as multipart form-data. Acceptable formats include `.jpg`, `.png`, `.jpeg`, etc.

    - **Type:** File (multipart/form-data)
    - **Content-Type:** image/jpeg, image/png, etc.
    - **Description:** The image file to be uploaded max 0f 10MB.

- **Response**:

  ```json
  {
    "_id": "unique-id",
    "title": "Book Title",
    "author": "Author Name",
    "published_date": "2024-07-30T00:00:00.000Z",
    "ISBN": "123-456-789",
    "coverImage": "http://example.com/new-cover.jpg",
    "__v": 0
  }
  ```

### 3. Get All Books

- **Endpoint**: `GET /books`
- **Response**:

  ```json
  [
    {
      "_id": "unique-id-1",
      "title": "Book Title 1",
      "author": "Author Name 1",
      "published_date": "2024-07-30T00:00:00.000Z",
      "ISBN": "123-456-789",
      "coverImage": "http://example.com/cover1.jpg",
      "__v": 0
    },
    ...
  ]
  ```

### 4. Get a Single Book

- **Endpoint**: `GET /books/:id`
- **Request Parameters**: `id` (Book ID)
- **Response**:

  ```json
  {
    "_id": "unique-id",
    "title": "Book Title",
    "author": "Author Name",
    "published_date": "2024-07-30T00:00:00.000Z",
    "ISBN": "123-456-789",
    "coverImage": "http://example.com/cover.jpg",
    "__v": 0
  }
  ```

### 5. Update a Book

- **Endpoint**: `PUT /books/:id`
- **Request Parameters**: `id` (Book ID)
- **Request Body**:

  ```json
  {
    "title": "Updated Book Title",
    "author": "Updated Author Name",
    "published_date": "2024-07-30T00:00:00.000Z",
    "ISBN": "123-456-789"
  }
  ```

- **Response**:

  ```json
  {
    "_id": "unique-id",
    "title": "Updated Book Title",
    "author": "Updated Author Name",
    "published_date": "2024-07-30T00:00:00.000Z",
    "ISBN": "123-456-789",
    "coverImage": "http://example.com/cover.jpg",
    "__v": 0
  }
  ```

### 6. Delete a Book

- **Endpoint**: `DELETE /books/:id`
- **Request Parameters**: `id` (Book ID)
- **Response**:

  ```json
  {
    "message": "Book deleted successfully"
  }
  ```

## Testing

### Unit and Integration Tests

- **Framework**: Jest was used with Supertest for testing the endpoints
- **Running Tests**:

  ```bash
  npm run test
  ```

- **Test Files**: Located in the `tests` directory.

### Example Test Case

Here is an example of a simple test case using Jest and Supertest:

```typescript
import request from "supertest";
import app from "../src/app";

describe("Books API", () => {
  it("should create a new book", async () => {
    const response = await request(app).post("/books").send({
      title: "New Book",
      author: "Author Name",
      published_date: "2024-07-30T00:00:00.000Z",
      ISBN: "123-456-789",
      coverImage: "http://example.com/cover.jpg",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe("New Book");
  });
});
```

## Contributing

If you would like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Submit a pull request with a description of your changes.

## You can checkout the live swagger docs using the link below
