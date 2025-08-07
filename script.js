async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
