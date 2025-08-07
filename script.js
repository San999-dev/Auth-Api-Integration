async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    const query = `
        mutation {
            login(email: "${email}", password: "${password}") {
                token
            }
        }
    `;

    try {
        const response = await fetch('https://your-graphql-endpoint.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.errors) {
            alert('Login failed: ' + data.errors[0].message);
            return;
        }

        localStorage.setItem('token', data.data.login.token); // Store the token
        showDashboard(); // Show the dashboard after successful login
    } catch (error) {
        alert('Login failed: ' + error.message);
        console.error('Login error:', error);
    }
}
