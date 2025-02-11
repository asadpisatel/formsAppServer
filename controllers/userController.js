const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

exports.createUser = async (req, res) => {
  try {
    if (await prisma.user.findUnique({ where: { email: req.body.email } })) {
      return res.status(409).json({ error: "Email is already registered" });
    }
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashSync(req.body.password, salt),
      },
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role, status: newUser.status },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(401).json({ error: "Email not registered" });
    }

    if (!compareSync(req.body.password, user.password)) {
      return res.status(403).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, status: user.status },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  return res.status(200).json({ message: "Logged out" });
};

exports.getMe = (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  res.json(req.user);
};
