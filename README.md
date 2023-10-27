
# Movie Review App

## Introduction

This is a full-stack web application that serves as a movie review platform similar to IMDb. It includes features such as user authentication, role-based access control, an admin panel to upload movies, and more. The app is built using the MERN (MongoDB, Express, React, Node.js) stack, along with other technologies like Tailwind, Mailtrap, Cloudinary, and Sendinblue.

## Features

- Role-based authentication (Admin & Normal User)
- User authentication with email verification
- Protected routes based on user roles
- Password reset functionality
- Cloud storage for images and videos
- Advanced MongoDB aggregation concepts
- Admin panel for managing movies
- Advanced forms with complex validation and live search fields
- Custom auto-scroll slider to feature movies
- Building the entire frontend with React functional components and Context API

## Tech Stack

- Frontend:
  - React (Functional Components)
  - Context API
  - Tailwind CSS

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Cloudinary (for cloud storage)

## Getting Started

Follow these steps to get the Movie Review App up and running on your local machine.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/movie-review-app.git
   cd movie-review-app
   ```

2. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Set up environment variables:**

   You will need to create a `.env` file in both the `frontend` and `backend` directories to configure your environment variables. Here's an example of what the `.env` files might contain:

   `.env` in the `frontend` directory:
   ```plaintext
   REACT_APP_API_URL=http://localhost:5000
   ```

   `.env` in the `backend` directory:
   ```plaintext
   PORT=5000
   JWT_SECRET=ankit-ka-server-secret
   Mongo_URI=mongodb://localhost:27017/review_app
   Nodemailer_user=your-email@example.com
   Nodemailer_pass=your-email-password
   cloud_name=your-cloudinary-cloud-name
   api_key=your-cloudinary-api-key
   api_secret=your-cloudinary-api-secret
 
   ```

4. **Run the development server:**

   In the `frontend` and `backend` directories, run:

   ```bash
   npm start
   nodemon start 
   ```

   This will start the development server for both the frontend and backend.

5. **Open your web browser and access the app:**

   The app should now be accessible at `http://localhost:3000`.

## Usage

Provide instructions on how to use the app, including how to sign up, log in, use the admin panel, and perform other essential tasks.

