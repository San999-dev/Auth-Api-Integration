const jwt = require("jsonwebtoken");

const SECRET_KEY = "supersecretkey";
let users = []; // Temporary in-memory storage

module.exports = (req, res) => {
  const { method, url, headers, body } = req;

  // Parse JSON body (Vercel needs manual parse sometimes)
  let data = {};
  try {
    data = typeof body === "string" ? JSON.parse(body) : body;
  } catch {}

  if (url === "/api/register" && method === "POST") {
    const { name, email, password } = data;
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = { name, email, password };
    users.push(newUser);
    const token = jwt.sign({ email, name }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  }

  if (url === "/api/login" && method === "POST") {
    const { email, password } = data;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  }

  if (url === "/api/profile" && method === "GET") {
    const authHeader = headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      return res.json({ user: decoded });
    });
  }

  return res.status(404).json({ message: "Not found" });
};
