async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
            alert(`Login failed: ${errorData.message || 'Unknown error'}`);
            return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token
        showDashboard(); // Show the dashboard after successful login
    } catch (error) {
        alert('An error occurred while logging in. Please try again later.');
        console.error(error);
    }
}
