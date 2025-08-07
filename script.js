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
        const response = await fetch('https://os-project-server.vercel.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            alert('Login failed: ' + (errorData.message || 'Unknown error'));
            return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token
        showDashboard(); // Show the dashboard after successful login
    } catch (error) {
        alert('Login failed: ' + error.message);
        console.error('Login error:', error);
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
        document.getElementById('user-name').innerText = decoded.name || 'User  ';
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
