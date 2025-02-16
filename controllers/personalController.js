const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.templates = async (req, res) => {
  try {
    const templates = await prisma.template.findMany({
      where: {
        userId: req.body.userId,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
    return res.status(200).json(templates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
