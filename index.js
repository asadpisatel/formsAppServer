const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";

app.use(express.json());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(cookieParser());

app.use("/user", require("./routes/userRoute"));
app.use("/admin", require("./routes/adminRoute"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
