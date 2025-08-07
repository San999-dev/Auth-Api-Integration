document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://os-project-server.vercel.app/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error('Invalid credentials');

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    window.location.href = 'welcome.html';
  } catch (err) {
    document.getElementById('error-msg').textContent = 'Login failed. Please try again.';
  }
});
