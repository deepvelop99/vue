const router = require("express").Router();
const goodsController = require("./_controller/goodsController");

// create
router.post("/", async (req, res) => {
  const result = await goodsController.create(req);
  res.json(result);
});

// list
router.get("/", async (req, res) => {
  const result = await goodsController.list(req);
  res.json(result);
});

// update
router.put("/:name", async (req, res) => {
  const result = await goodsController.update(req);
  res.json(result);
});

// delete
router.delete("/:name", async (req, res) => {
  const result = await goodsController.delete(req);
  res.json(result);
});

module.exports = router;
