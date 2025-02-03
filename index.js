const express = require("express");

const app = express();

app.use(express.json());

app.use("/user", require("./routes/userRoute"));

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
