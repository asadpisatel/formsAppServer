const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createResponse = async (req, res) => {
  try {
    const { templateId, userId, ...answers } = req.body;

    const response = await prisma.response.create({
      data: {
        templateId,
        userId,
        ...answers,
      },
    });

    res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
