const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/submit-form", (req, res) => {
  const formData = req.body;
  console.log("Form Data:", formData);
  res.send("Form submission successful");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
