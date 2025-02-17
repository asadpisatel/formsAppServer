const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.checkTemplate = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    const template = await prisma.template.findUnique({
      where: { id },
      select: {
        userId: true,
        responses: {
          where: { userId },
          select: { id: true },
        },
      },
    });

    res.json({
      isAuthor: template.userId === userId,
      hasResponse: template.responses.length > 0,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
