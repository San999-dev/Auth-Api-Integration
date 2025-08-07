document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  document.getElementById('user-info').textContent = `Hello, ${payload.name || payload.email || 'User'}!`;

  document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
  });
});
