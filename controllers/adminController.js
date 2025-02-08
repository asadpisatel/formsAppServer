const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

exports.unblockUsers = async (req, res) => {
  try {
    const { emails } = req.body;

    const updatedUsers = await prisma.user.updateMany({
      where: {
        email: {
          in: emails,
        },
      },
      data: {
        status: "Active",
      },
    });

    return res.status(200).json(updatedUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const { emails } = req.body;

    const updatedUsers = await prisma.user.deleteMany({
      where: {
        email: {
          in: emails,
        },
      },
    });

    return res.status(200).json(updatedUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.makeAdminUsers = async (req, res) => {
  try {
    const { emails } = req.body;

    const updatedUsers = await prisma.user.updateMany({
      where: {
        email: {
          in: emails,
        },
      },
      data: {
        role: "ADMIN",
      },
    });

    return res.status(200).json(updatedUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.removeAdminUsers = async (req, res) => {
  try {
    const { emails } = req.body;

    const updatedUsers = await prisma.user.updateMany({
      where: {
        email: {
          in: emails,
        },
      },
      data: {
        role: "USER",
      },
    });

    return res.status(200).json(updatedUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
