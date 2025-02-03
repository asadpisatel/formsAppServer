const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashSync } = require("bcrypt");
const salt = 10;

exports.createUser = async (req, res) => {
  try {
    if (await prisma.user.findUnique({ where: { email: req.body.email } })) {
      return res.status(409).json({ error: `Email is already registered` });
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
