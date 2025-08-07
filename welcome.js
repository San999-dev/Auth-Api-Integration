function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

(function () {
  const token = localStorage.getItem("token");
  if (!token) return (window.location.href = "index.html");

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    document.getElementById("user-info").textContent = `Hello, ${payload.email}`;
  } catch {
    logout();
  }
})();
