# Tomato - Food Ordering Portal

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for ordering food online. It features a user-facing frontend for browsing and purchasing food, and a backend to manage users, food items, and orders.

## Features

- **User Authentication**: Secure user registration and login functionality using JSON Web Tokens (JWT).
- **Food Catalog**: Browse a list of available food items fetched from the backend.
- **Shopping Cart**:
    - Add or remove items from the cart.
    - Cart state is persisted for both guest and logged-in users.
    - Guest carts are stored in `localStorage`.
    - Carts for logged-in users are saved to the database.
- **Dynamic UI**: The interface updates in real-time as items are added or removed from the cart.
- **Order Placement**: Users can proceed to checkout from their cart.

## Tech Stack

- **Frontend**:
  - React.js
  - React Router DOM
  - React Context API (for state management)
  - Axios (for API requests)
  - CSS3

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JSON Web Token (JWT) for authentication
  - CORS

## Project Structure

The repository is organized into three main parts:

```
/
|-- admin/        # Admin panel for managing the platform
|-- backend/      # Node.js/Express server and API
|-- frontend/     # React.js client-side application
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository.**

2.  **Backend Setup:**
    - Navigate to the `backend` directory: `cd backend`
    - Install dependencies: `npm install`
    - Create a `.env` file and add your `MONGO_URI` and `JWT_SECRET`.
    - Start the backend server: `npm run server`

3.  **Frontend Setup:**
    - Navigate to the frontend directory: `cd frontend/food-del`
    - Install dependencies: `npm install`
    - Start the frontend development server: `npm run dev`