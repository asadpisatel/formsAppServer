const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const clearAuthCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, role: true, status: true },
    });

    if (!user) {
      clearAuthCookie(res);
      return res.status(401).json({ error: "User not found" });
    }

    if (user.status === "Blocked") {
      clearAuthCookie(res);
      return res.status(403).json({ error: "User is blocked" });
    }

    req.user = user;
    next();
  } catch (err) {
    clearAuthCookie(res);
    return res.status(403).json({ error: "Invalid token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    clearAuthCookie(res);
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
