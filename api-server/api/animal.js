const router = require("express").Router();
const animalController = require("./_controller/animalController");

// create
router.post("/", async (req, res) => {
  const result = await animalController.create(req);
  res.json(result);
});

// list
router.get("/", async (req, res) => {
  const result = await animalController.list(req);
  res.json(result);
});

// update
router.put("/:id", async (req, res) => {
  const result = await animalController.update(req);
  res.json(result);
});

// delete
router.delete("/:id", async (req, res) => {
  const result = await animalController.delete(req);
  res.json(result);
});

module.exports = router;
