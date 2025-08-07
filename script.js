async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://os-project-server.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token
        showDashboard(); // Show the dashboard after successful login
    } else {
        alert('Login failed. Please check your credentials.');
    }
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

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('change-password-form').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
}

// Other functions (showRegistration, showForgotPassword, etc.) remain the same
