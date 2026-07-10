import { generateToken } from "../data/token.js";

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email y contraseña son obligatorios.",
    });
  }
  if (email === "admin@gmail.com" && password === "12345") {
    const token = generateToken({ id: 1, email: email });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
}
