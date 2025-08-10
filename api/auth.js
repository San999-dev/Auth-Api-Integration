const jwt = require("jsonwebtoken");

const SECRET_KEY = "supersecretkey";
let users = [];

export default function handler(req, res) {
  const { method } = req;

  if (method === "POST" && req.url.includes("/register")) {
    const { name, email, password } = req.body;
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = { name, email, password };
    users.push(newUser);
    const token = jwt.sign({ email, name }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  }

  if (method === "POST" && req.url.includes("/login")) {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  }

  if (method === "GET" && req.url.includes("/profile")) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      return res.json({ user: decoded });
    });
  }

  res.status(404).json({ message: "Not found" });
}
