import { registerUser, loginUser } from "../services/authServices.js";
import { generateToken } from "../auth/jwt.js";

//register an user
export async function register(req, res, next) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required!" });
    }

    const newUser = await registerUser({ email, password, role });
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
}

//login and user
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
