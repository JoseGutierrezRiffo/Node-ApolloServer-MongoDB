import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (user, SECRET_KEY, expiresIn) => {
  const { id, name, username, email } = user;
  const payload = {
    id,
    name,
    username,
    email
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const register = async input => {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();
  console.log(newUser);

  const { email, username, password } = newUser;

  const emailExists = await User.findOne({ email });
  if (emailExists) throw new Error("El email ya se encuentra en uso.");

  const usernameExists = await User.findOne({ username });
  if (usernameExists) throw new Error("El username ya se encuentra en uso.");

  const salt = await bcrypt.genSaltSync(10);
  newUser.password = await bcrypt.hash(password, salt);

  try {
    const user = new User(newUser);
    user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const login = async input => {
  const { email, password } = input;
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (!userExists) throw new Error("Error en el usuario o contraseña");

  const passwordSuccess = await bcrypt.compare(password, userExists.password);
  if (!passwordSuccess) throw new Error("Error en el usuario o contraseña");

  return {
    token: createToken(userExists, process.env.SECRET_KEY, "24h")
  };
};
