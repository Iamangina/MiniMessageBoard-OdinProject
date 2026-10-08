# Mini Message Board

A simple message board built with **Node.js, Express, EJS, and PostgreSQL**.

The project started as a basic Express application where messages were stored temporarily in an in-memory JavaScript array. It was then extended to use **PostgreSQL** as a persistent database, allowing messages to remain available even after the server is restarted.

## Features

* Display all messages on the main page
* Add new messages using a form
* Store messages in PostgreSQL
* View individual message details
* Display the message author, content, and creation date
* Server-side form handling with Express
* Persistent data storage
* Environment variables for database configuration

## Technologies

* **Node.js** – JavaScript runtime
* **Express** – web application framework
* **EJS** – server-side templating engine
* **PostgreSQL** – relational database for persistent message storage
* **node-postgres (`pg`)** – PostgreSQL client for Node.js
* **dotenv** – loads environment variables from `.env`

## Project Structure

```text
MiniMessageBoard-OdinProject/
├── db/
│   ├── pool.js
│   ├── queries.js
│   └── populatedb.js
├── routes/
│   └── indexRouter.js
├── views/
│   ├── partials/
│   ├── index.ejs
│   ├── form.ejs
│   └── message.ejs
├── app.js
├── package.json
├── package-lock.json
└── .gitignore
```

## Routes

### `GET /`

Displays all messages stored in the PostgreSQL database.

Each message contains:

* Author
* Message text
* Date it was created
* A link to view the individual message

### `GET /new`

Displays the form used to create a new message.

### `POST /new`

Processes the submitted form and saves the new message to PostgreSQL.

After successfully creating a message, the user is redirected back to the main page.

### `GET /message/:id`

Displays a single message based on its database ID.

## Database

The application uses **PostgreSQL** instead of storing messages in a JavaScript array.

The `messages` table contains:

```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL,
  text VARCHAR(255) NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

The database connection is configured through the `DATABASE_URL` environment variable.

Example:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

The actual `.env` file is not committed to the repository because it contains sensitive database credentials.

## Database Queries

Database operations are separated from the routes and handled through functions such as:

* `getAllMessages()` – retrieves all messages
* `getMessageById(id)` – retrieves a single message
* `insertMessage(username, text)` – creates a new message

Parameterized SQL queries are used when inserting and retrieving data to avoid directly putting user input into SQL statements.

## Message Persistence

Originally, messages were stored in a JavaScript array:

```javascript
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  }
];
```

This meant that all messages disappeared whenever the server was restarted.

The project was later migrated to PostgreSQL. Messages are now stored permanently in the database, so restarting the Express server does not remove them.

## Date Handling

The database automatically records the creation time using:

```sql
added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

The date is then formatted when it is displayed in the EJS templates.

For example:

```javascript
new Date(message.added).toLocaleDateString('en-GB')
```

## Environment Variables

Database credentials are stored in `.env` rather than directly in the source code.

The `.gitignore` file includes:

```gitignore
node_modules/
.env
```

This prevents database credentials and installed dependencies from being pushed to GitHub.

## Learning Goals

This project demonstrates several fundamental concepts of backend web development:

* Creating an Express application
* Using Express routing
* Rendering dynamic pages with EJS
* Handling HTML forms
* Working with `req.body`
* Using Express middleware
* Creating REST-style routes
* Connecting Node.js to PostgreSQL
* Writing SQL queries from Node.js
* Using environment variables
* Separating database logic from route logic
* Persisting application data in a relational database
* Using database-generated IDs to access individual records

## Project Background

This project was created as part of **The Odin Project – NodeJS curriculum**.

It combines the original Mini Message Board exercise with the later PostgreSQL/database concepts introduced in the NodeJS course.

The final version demonstrates the transition from a simple in-memory Express application to a backend application with persistent PostgreSQL storage.
