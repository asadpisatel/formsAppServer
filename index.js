const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", require("./routes/userRoute"));

const port = process.env.PORT | 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
