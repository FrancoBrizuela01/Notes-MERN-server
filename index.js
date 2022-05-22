const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());

app.use(express.json({ extended: true }));

const port = process.env.port || 4000;

app.use("/api/notes", require("./routes/notes"));
app.use("/api/categories", require("./routes/categories"));

app.listen(port, "0.0.0.0", () => {
  console.log(`the server is running on the port ${port}`);
});
