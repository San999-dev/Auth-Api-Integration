🔐 Static Token-Based Authentication (Frontend)

📖 Overview

This is a static web application that implements token-based authentication entirely in the frontend.
It includes the following features:

1.User Registration

2.User Login

3.Forgot Password

4.Change Password

5.Dashboard / Welcome Screen

6.Token Storage and Validation

Logout

The app uses a mock API implemented via localStorage for demonstration purposes, simulating real API authentication.

A token is generated upon login, stored locally, and validated on every page load.

🎯 Features
Authentication Screens:

Login – Enter credentials to authenticate.

Register – Create a new user account.

Forgot Password – Recover password via registered email.

Change Password – Update existing password.

Dashboard – View a personalized welcome message.

Logout – Clear token and return to login.

🔑 Token Format

When a user logs in successfully, a JWT-like token is generated and stored in localStorage under the key authToken.

📂 Project Structure

index.html   → Main HTML file with all screens

style.css    → Styling for the UI (can also be embedded in HTML)

script.js     → Logic for authentication, token handling, and UI switching
⚙️ How It Works

Register

User details are stored in browser’s localStorage.

Login

Credentials are verified against stored users.

If valid, a token is generated
Token is saved in localStorage.

Token Validation

On page load, token is decoded.

If token is valid and not expired → User is auto-logged in.

If expired or invalid → User is logged out.

Forgot Password

Retrieves password for registered email (localStorage-based mock).

Logout

Clears token from localStorage and returns to login screen.

🚀 Running the Project
Clone or download the repository.

Open index.html in your browser.

No backend required – works fully in frontend.

📌 Notes
This project simulates token-based authentication.

In a production environment, use a real backend API to generate and validate tokens securely.

Never store sensitive information (like passwords) in plain text in localStorage in real applications.

🖼 UI Features
Responsive design

Gradient background

Show/Hide Password Toggle

Clean and modern look

Single-page multi-screen navigation


