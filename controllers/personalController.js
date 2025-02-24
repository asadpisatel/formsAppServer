const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.templates = async (req, res) => {
  try {
    const templates = await prisma.template.findMany({
      where: {
        userId: req.user.id,
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

exports.deleteTemplates = async (req, res) => {
  try {
    const { ids } = req.body;

    const updatedTemplates = await prisma.template.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return res.status(200).json(updatedTemplates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
