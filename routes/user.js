const router = require("express").Router();
const User = require("../models/addUser");

//Add content
router.post("/", async (req, res) => {
  const { emg, title } = req.body;
  const user = new User(title, emg);
  await user.save();
  res.status(200).json({
    message: "Aded is sucsessfully",
    data: user,
  });
});

// get All content
router.get("/", async (req, res) => {
  const user = await User.getAll();
  res.status(200).json({
    data: user,
  });
});

// get by id 
router.get("/:id", async (req, res) => {
  const user = await User.getById(req.params.id);
  res.status(200).json({
    user,
  });
});

//delete by id
router.delete("/delete/:id", async (req, res) => {
  const user = await User.deleted(req.params.id);
  res.status(200).json({ message: "User deleted successfully.", data: user });
});

module.exports = router;
