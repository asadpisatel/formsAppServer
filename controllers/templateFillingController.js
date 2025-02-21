const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createResponse = async (req, res) => {
  try {
    const { templateId, userId, ...responses } = req.body;

    const template = await prisma.response.create({
      data: {
        templateId,
        userId,
        ...responses,
      },
    });

    res.status(201).json(template);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
