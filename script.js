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
        showWelcomeScreen();
    } else {
        alert('Login failed. Please check your credentials.');
    }
}

function showWelcomeScreen() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        document.getElementById('user-name').innerText = decoded.name || 'User ';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('welcome-screen').style.display = 'block';
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('welcome-screen').style.display = 'none';
}
