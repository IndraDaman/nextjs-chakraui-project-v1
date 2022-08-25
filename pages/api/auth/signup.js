import { existingUser, createUser } from "../../../helper/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password } = data;

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

  const existingUser = await existingUser("users", { email: email });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  const result = await createUser("users", {
    email: email,
    password: hashedPassword,
  });
  console.log(result);
  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
