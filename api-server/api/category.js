const router = require("express").Router();
const categoryController = require("./_controller/categoryController");

// create
router.post("/", async (req, res) => {
  const result = await categoryController.create(req);
  res.json(result);
});

// list
router.get("/", async (req, res) => {
  const result = await categoryController.list(req);
  res.json(result);
});

// update
router.put("/:name", async (req, res) => {
  const result = await categoryController.update(req);
  res.json(result);
});

// delete
router.delete("/:name", async (req, res) => {
  const result = await categoryController.delete(req);
  res.json(result);
});

module.exports = router;
