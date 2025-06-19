# Expense Tracker

This is a full-stack expense tracker application with a React frontend and a Node.js/Express backend. It allows users to add and view their expenses.

## Features

*   **Add Expenses:** Users can add new expenses with a description and amount.
*   **View Expenses:** Users can view a list of all their expenses, sorted by date.
*   **RESTful API:** A well-defined API for managing expenses.

## Tech Stack

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Axios:** A promise-based HTTP client for the browser and Node.js.
*   **CSS:** For styling the user interface.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express:** A fast, unopinionated, minimalist web framework for Node.js.
*   **PostgreSQL:** A powerful, open-source object-relational database system.
*   **TypeScript:** For type-safe backend code.
*   **dotenv:** A zero-dependency module that loads environment variables from a `.env` file.
*   **cors:** A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm
*   PostgreSQL

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/ArnavMandal/expense-tracker.git
    ```
2.  **Install NPM packages for the server**
    ```sh
    cd server
    npm install
    ```
3.  **Install NPM packages for the client**
    ```sh
    cd ../client
    npm install
    ```
4.  **Set up environment variables**

    Create a `.env` file in the `server` directory and add the following:

    ```
    PORT=5000
    DB_USER=your_db_user
    DB_HOST=localhost
    DB_NAME=expense_tracker
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    ```

5.  **Create the database**

    In your PostgreSQL instance, create a new database named `expense_tracker`.

6.  **Run the application**
    *   To start the server, run the following command in the `server` directory:
        ```sh
        npm run dev
        ```
    *   To start the client, run the following command in the `client` directory:
        ```sh
        npm start
        ```

## Things Learned

Building this project is a great way to learn and practice the following skills:

*   **Full-Stack Development:** Understanding how the frontend and backend work together.
*   **API Development:** Designing and building a RESTful API with Express.
*   **Database Management:** Setting up and interacting with a PostgreSQL database.
*   **TypeScript:** Using TypeScript in both the frontend and backend for better code quality and maintainability.
*   **React Hooks:** Using `useState` and `useEffect` to manage state and side effects in a React application.
*   **Environment Variables:** Managing configuration and secrets using `.env` files.
*   **Git and GitHub:** Using Git for version control and collaborating on GitHub. 