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
        localStorage.setItem('token', data.token);
        showDashboard();
    } else {
        alert('Login failed. Please check your credentials.');
    }
}

async function handleRegistration(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch('https://os-project-server.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert('Registration successful! You can now log in.');
        showLogin();
    } else {
        alert('Registration failed. Please try again.');
    }
}

async function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('forgot-email').value;

    const response = await fetch('https://os-project-server.vercel.app/api/auth/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (response.ok) {
        alert('Password reset link sent to your email.');
        showLogin();
    } else {
        alert('Failed to send reset link. Please try again.');
    }
}

async function handleChangePassword(event) {
    event.preventDefault();
    const newPassword = document.getElementById('new-password').value;

    const token = localStorage.getItem('token');
    const response = await fetch('https://os-project-server.vercel.app/api/auth/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
    });

    if (response.ok) {
        alert('Password changed successfully!');
        showDashboard();
    } else {
        alert('Failed to change password. Please try again.');
    }
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
        document.getElementById('dashboard').style.display = 'block';
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('toggle-password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    togglePasswordIcon.innerText = passwordInput.type === 'password' ? '🙈' : '👁️';
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('change-password-form').style.display = 'none';
}

function showRegistration() {
    document.getElementById('registration-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('change-password-form').style.display = 'none';
}

function showForgotPassword() {
    document.getElementById('forgot-password-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('change-password-form').style.display = 'none';
}
