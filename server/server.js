const express = require("express");
const app = express();
const barRouter = require("./routes/bar");
const concessionRouter = require("./routes/concession");
const cors = require("cors");

app.use(express.json());
app.use(cors());

require("dotenv").config();
const { PORT } = process.env;

app.get("/", (req, res) => {
  res.json({ message: "Test" });
});

app.use("/bar", barRouter);
app.use("/concession", concessionRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log("Press CTRL + C to stop server");
});
