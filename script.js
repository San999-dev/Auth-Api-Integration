function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://os-project-server.vercel.app/api/auth/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            localStorage.setItem('token', data.token); // Store the token
            showDashboard(); // Show the dashboard after successful login
        } else {
            const errorData = JSON.parse(xhr.responseText);
            alert('Login failed: ' + (errorData.message || 'Unknown error'));
        }
    };

    xhr.onerror = function() {
        alert('An error occurred while logging in. Please try again later.');
    };

    xhr.send(JSON.stringify({ email, password }));
}
