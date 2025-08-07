# Auth-Api-Integration
This is a static web authentication interface that integrates with an external authentication API. It allows users to log in, decode their token, and view a personalized welcome screen. Built with HTML, CSS, and JavaScript, this project requires no backend setup.

#Project Features
✅ Login form connected to external API
✅ JWT token handling (store, decode, and display user info)
✅ Responsive, clean user interface
✅ Logout functionality
✅ Built using only vanilla HTML, CSS, and JS

#🔗 API Details
Base URL:
https://os-project-server.vercel.app/
Login Endpoint:
POST /auth/login

#🧪 How It Works
1.User enters email and password on the login page.
2.On submit, the login form sends a POST request to the external API.
3.If authenticated, a JWT token is returned and stored in localStorage.
4.User is redirected to welcome.html, where the token is decoded.

#📝 Folder Structure
authenticated-website/
├── css/
│   └── styles.css
├── js/
│   ├── login.js
│   └── welcome.js
├── login.html
└── welcome.html

#🔐 Token Format
This app uses a standard JWT (JSON Web Token). The payload is decoded using:
js
Copy
Edit
JSON.parse(atob(token.split('.')[1]))



User’s name or email is extracted from the token and displayed.

The Logout button clears the token and redirects back to login.
