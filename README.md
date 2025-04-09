# Bookstore Backend

## Tech Stack

- Typescript
- Node.js
- NestJS
- PostgreSQL
- Prisma
- Docker
- Swagger

## Setup Instructions

1.  **Clone the Repository**
    ```
    git clone https://github.com/sid-sg/Bookstore.git
    cd Bookstore
    ```
2.  **Create Environment File**
    Create a `.env` file in the root directory and add the following variables:
    ```
    DATABASE_URL="your_database_connection_string"
    JWT_SECRET="your_jwt_secret"
    ```
    Replace `"your_database_connection_string"` and `"your_jwt_secret"` with your actual database URL and a secure secret key.

3.  **Run with Docker Compose**
    Ensure Docker is installed and running on your system. Then, execute the following command in the project root:
    ```
    docker-compose up --build
    ```

## Swagger Documentation

To access the API documentation and interactively test the endpoints, navigate to the following URL in your browser after starting the application:
`http://localhost:3000/api`

## API Endpoints

The following endpoints are available:

-   `POST /auth/signup` - User sign up
-   `POST /auth/login` - User login
-   `GET /books/` - Retrieve a list of all books
-   `GET /books/{id}` - Retrieve a specific book by its ID
-   `GET /books/search` - Search for books 
-   `GET /books/sort` - Sort books 
-   `GET /books/filter` - Filter books
-   `POST /books/new` - Add a new book (requires authentication).
-   `PATCH /books/{id}` - Update an existing book by ID (requires authentication)
-   `DELETE /books/{id}` - Delete a book by ID (requires authentication)

*Please refer to the Swagger documentation available at `http://localhost:3000/api` for sample requests*

## Assumptions
- Prisma migrations are already run before building

- The app listens on port 3000

- .env file has necessary environment variables and are loaded in the Docker container

