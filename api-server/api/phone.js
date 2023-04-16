const router = require("express").Router();
const phoneController = require("./_controller/phoneController");

// create
router.post("/", async (req, res) => {
  const result = await phoneController.create(req);
  res.json(result);
});

// list
router.get("/", async (req, res) => {
  const result = await phoneController.list(req);
  res.json(result);
});

// update
router.put("/:name", async (req, res) => {
  const result = await phoneController.update(req);
  res.json(result);
});

// delete
router.delete("/:name", async (req, res) => {
  const result = await phoneController.delete(req);
  res.json(result);
});

module.exports = router;
