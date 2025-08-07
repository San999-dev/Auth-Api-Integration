async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        const response = await axios.post('https://os-project-server.vercel.app/api/auth/login', {
            email,
            password
        });

        // Store the token in local storage
        localStorage.setItem('token', response.data.token);
        showDashboard(); // Show the dashboard after successful login
    } catch (error) {
        // Improved error handling
        if (error.response) {
            // The request was made and the server responded with a status code
            alert('Login failed: ' + (error.response.data.message || 'Unknown error'));
            console.error('Error response:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            alert('Login failed: No response from server.');
            console.error('Error request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an error
            alert('Login failed: ' + error.message);
            console.error('Error message:', error.message);
        }
    }
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('change-password-form').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
}

function showRegistration() {
    document.getElementById('registration-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('change-password-form').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
}

function showForgotPassword() {
    document.getElementById('forgot-password-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('change-password-form').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
}

function showDashboard() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        document.getElementById('user-name').innerText = decoded.name || 'User ';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('registration-form').style.display = 'none';
        document.getElementById('forgot-password-form').style.display = 'none';
        document.getElementById('change-password-form').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block'; // Show the dashboard
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    showLogin(); // Show the login form after logout
}

// Call showLogin on page load
window.onload = function() {
    showLogin(); // Show the login form by default
};
