import {existingUserDetail, createUser } from "../../../helpers/db";
import {hashPassword} from '../../../helpers/auth'
async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { name,email,phone,password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }
  const obj1={
    email: email
  };
   const existingUser = await existingUserDetail(obj1);
   console.log(existingUser);
  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }
  const hashedPassword = await hashPassword(password);
  const obj={
    name:name,
    email: email,
    phone:phone,
    password: hashedPassword,
  };
  const result = await createUser(obj);

  res.status(201).json({ message: "Created user!" });
}

export default handler;
