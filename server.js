const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const SECRET_KEY = "supersecretkey";

let users = []; // In-memory storage

app.use(cors());
app.use(bodyParser.json());

// Register
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = { name, email, password };
  users.push(newUser);
  const token = jwt.sign({ email, name }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Protected route
app.get("/api/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ message: "Profile data", user: decoded });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
