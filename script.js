// Authentication App using Fetch API

// Function to handle user login
function loginUser (username, password) {
  const url = "https://example.com/api/login"; // Replace with your API endpoint

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Login successful:", data);
      // Handle successful login (e.g., redirect or store token)
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Function to handle user registration
function registerUser (username, password) {
  const url = "https://example.com/api/register"; // Replace with your API endpoint

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Registration successful:", data);
      // Handle successful registration (e.g., redirect to login)
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Example usage
document.getElementById("loginButton").addEventListener("click", function() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  loginUser (username, password);
});

document.getElementById("registerButton").addEventListener("click", function() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  registerUser (username, password);
});
