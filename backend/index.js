const express = require("express");
const app = express();
const userModel = require("./model/userModel");
const cors = require("cors");
app.use(cors(
  {
    origin: ['https://crud-mern-stack-frontend.vercel.app/'],
    method: ["POST","GET"],
    Credentials: true
  }
));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running");
});
app.post("/create", async (req, res) => {
  const { name, userName, email } = req.body;
  try {
    let createUser = await userModel.create({ name, userName, email });
    res.status(201).send(createUser);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Read file
app.get("/read", async (req, res) => {
  try {
    let userRead = await userModel.find({});
    res.send(userRead);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// update file
app.put("/update/:id", async (req, res) => {
  try {
    let updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    let deletedUser = await userModel.findByIdAndDelete(req.params.id);
    res.send(deletedUser);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3000);
