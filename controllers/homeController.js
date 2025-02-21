const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getLatestTemplates = async (req, res) => {
  try {
    const templates = await prisma.template.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
      select: {
        id: true,
        title: true,
        description: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json(templates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
