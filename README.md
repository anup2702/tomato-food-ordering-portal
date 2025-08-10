# Tomato Food Ordering Portal

A modern, responsive full-stack MERN (MongoDB, Express, React, Node.js) food ordering web application.

## Features

- User authentication (JWT)
- Browse/search menu and categories
- Add/remove items to cart (guest and logged-in users)
- Place orders and view order history
- Admin panel for managing food and orders
- Responsive design for desktop and mobile
- Clean, modern UI

## Screenshots

<!-- Add your screenshots here if available -->

## Tech Stack

- **Frontend:** React.js, React Router DOM, Context API, Axios, CSS3
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, CORS

## Project Structure

```
/
|-- admin/        # Admin panel for managing the platform
|-- backend/      # Node.js/Express server and API
|-- frontend/     # React.js client-side application
```

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)

### Installation & Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/anup2702/tomato-food-ordering-portal.git
    cd tomato-food-ordering-portal
    ```

2. **Backend Setup:**
    - Navigate to the backend directory: `cd backend`
    - Install dependencies: `npm install`
    - Create a `.env` file and add your `MONGO_URI` and `JWT_SECRET`.
    - Start the backend server: `npm run server` or `node server.js`

3. **Frontend Setup:**
    - Navigate to the frontend directory: `cd frontend/food-del`
    - Install dependencies: `npm install`
    - Start the frontend development server: `npm run dev`

4. **Admin Panel Setup (optional):**
    - Navigate to the admin directory: `cd admin`
    - Install dependencies: `npm install`
    - Start the admin panel: `npm run dev`

5. Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view the app in your browser.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)