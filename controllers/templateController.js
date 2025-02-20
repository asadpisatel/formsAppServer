const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createTemplate = async (req, res) => {
  try {
    const { title, description, topic, userId, ...questions } = req.body;

    const template = await prisma.template.create({
      data: {
        title,
        description,
        topic,
        userId,
        ...questions,
      },
    });

    res.status(201).json(template);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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

    return res.json({
      isAuthor: template.userId === userId,
      hasResponse: template.responses.length > 0,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getGeneralSettings = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await prisma.template.findUnique({
      where: { id },
      select: {
        title: true,
        description: true,
        topic: true,
      },
    });

    return res.status(200).json(template);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateGeneralSettings = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, description, topic } = req.body;

    const updatedTemplate = await prisma.template.update({
      where: { id },
      data: { title, description, topic },
    });

    return res.status(200).json({ template: updatedTemplate });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getQuestions = async (req, res) => {
  const { id } = req.params;

  try {
    const template = await prisma.template.findUnique({
      where: { id: id },
    });

    return res.status(200).json(template);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateQuestions = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    await prisma.template.update({
      where: { id: id },
      data: updateData,
    });

    return res.status(200).json({ message: "Questions updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
