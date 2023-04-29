const router = require("express").Router();
const dormitoryController = require("./_controller/dormitoryController");

// domitory list
router.get("/", async (req, res) => {
  const result = await dormitoryController.dormitorylist(req);
  res.json(result);
});

//customer list
router.get("/customer", async (req, res) => {
  const result = await dormitoryController.customerlist(req);
  res.json(result);
});

//customer id list
router.get("/customer/:id", async (req, res) => {
  const result = await dormitoryController.customeridlist(req);
  res.json(result);
});

// room list
router.get("/room", async (req, res) => {
  const result = await dormitoryController.roomlist(req);
  res.json(result);
});

//room number search
router.get("/room/:number", async (req, res) => {
  const result = await dormitoryController.roomidlist(req);
  res.json(result);
});

//room reservation select
router.get("/reservation", async (req, res) => {
  const result = await dormitoryController.reslist(req);
  res.json(result);
});

//room reservation select
router.get("/reservation/resable", async (req, res) => {
  const result = await dormitoryController.resablelist(req);
  res.json(result);
});

//room reservation select
router.get("/reservation/:id", async (req, res) => {
  const result = await dormitoryController.residList(req);
  res.json(result);
});

//예약하기
router.post("/reservation", async (req, res) => {
  const result = await dormitoryController.createres(req);
  res.json(result);
});

//예약 수정
router.put("/reservation/:id", async (req, res) => {
  const result = await dormitoryController.updateres(req);
  res.json(result);
});

//예약 취소
router.delete("/reservation/:id", async (req, res) => {
  const result = await dormitoryController.deleteres(req);
  res.json(result);
});

//예약 초기화
router.post("/reservation/truncate", async (req, res) => {
  const result = await dormitoryController.truncateres(req);
  res.json(result);
});

module.exports = router;
