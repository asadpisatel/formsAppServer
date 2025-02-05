const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashSync, compareSync } = require("bcrypt");
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

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        role: true,
        status: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.blockUsers = async (req, res) => {
  try {
    const { emails } = req.body;

    const updatedUsers = await prisma.user.updateMany({
      where: {
        email: {
          in: emails,
        },
      },
      data: {
        status: "Blocked",
      },
    });

    return res.status(200).json(updatedUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
