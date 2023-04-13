const router = require("express").Router();
const mealController = require("./_controller/mealController");

// create
router.post("/", async (req, res) => {
  const result = await mealController.create(req);
  res.json(result);
});

// list
router.get("/", async (req, res) => {
  const result = await mealController.list(req);
  res.json(result);
});

// update
router.put("/:day", async (req, res) => {
  const result = await mealController.update(req);
  res.json(result);
});

// delete
router.delete("/:day", async (req, res) => {
  const result = await mealController.delete(req);
  res.json(result);
});

module.exports = router;
