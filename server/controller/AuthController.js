import User from "../models/user.js";
import bcrypt from "bcrypt";

const categories = [
  { label: "Travel", icon: "user" },
  { label: "Shopping", icon: "user" },
  { label: "Investment", icon: "user" },
  { label: "Bills", icon: "user" },
];

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "User already exists" });
    return;
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = await User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    categories,
  });
  await user.save();
  res.status(201).json({ message: "User is Created", user });
};
