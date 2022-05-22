const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

// app.use(cors());

const corsOptions = {
  origin: "http://localhost:4000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json({ extended: true }));

const port = process.env.port || 4000;

app.use("/api/notes", require("./routes/notes"));
app.use("/api/categories", require("./routes/categories"));

app.listen(port, "0.0.0.0", () => {
  console.log(`the server is running on the port ${port}`);
});
