const db = require("../../plugins/mysql");
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/STATUS");
const { resData, currentTime, isEmpty } = require("../../util/lib");
const moment = require("../../util/moment");

const getTotal = async () => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.MEAL}`;
    const [[{ cnt }]] = await db.execute(query);
    console.log(cnt);
    return cnt;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, currentTime);
  }
};
const getList = async (req) => {
  try {
    const startDate = req.query.startDate || 2023 - 04 - 13;
    const len = parseInt(req.query.len) || 10;

    let where = "";
    if (startDate) {
      where = `WHERE day >= '${startDate}'`;
    }
    const query = `SELECT * FROM ${TABLE.MEAL} ${where} order by day desc limit 0, ${len}`;
    console.log(query);
    const [rows] = await db.execute(query);
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, currentTime);
  }
};
const getSelectOne = async (day) => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.MEAL} WHERE day=?`;
    const values = [day];
    const [[{ cnt }]] = await db.execute(query, values);
    return cnt;
  } catch (e) {
    console.log(e.message);
    return resData(
      STATUS.E300.result,
      STATUS.E300.resultDesc,
      moment().format("LT")
    );
  }
};
const mealController = {
  create: async (req) => {
    const { day, main, soup, kimchi, rice, side1, side2 } = req.body;
    if (
      isEmpty(day) ||
      isEmpty(main) ||
      isEmpty(soup) ||
      isEmpty(kimchi) ||
      isEmpty(rice)
    ) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }
    try {
      const query = `INSERT INTO meal (day,  main, soup, kimchi, rice, side1, side2) VALUES (?,?,?,?,?,?,?)`;
      const values = [day, main, soup, kimchi, rice, side1, side2];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData(
          STATUS.S200.result,
          STATUS.S200.resultDesc,
          moment().format("LT")
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(
        STATUS.E300.result,
        STATUS.E300.resultDesc,
        moment().format("LT")
      );
    }
  },

  list: async (req) => {
    const totalCount = await getTotal();
    const list = await getList(req);
    if (totalCount > 0 && list.length) {
      return resData(
        STATUS.S200.result,
        STATUS.S200.resultDesc,
        moment().format("LT"),
        { totalCount, list }
      );
    } else {
      return resData(
        STATUS.S201.result,
        STATUS.S201.resultDesc,
        moment().format("LT")
      );
    }
  },

  update: async (req) => {
    const { day } = req.params;
    const { main, soup, kimchi, rice, side1, side2 } = req.body;
    if (
      isEmpty(day) ||
      isEmpty(main) ||
      isEmpty(soup) ||
      isEmpty(kimchi) ||
      isEmpty(rice) ||
      isEmpty(side1) ||
      isEmpty(side2)
    ) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }

    try {
      const query = `UPDATE ${TABLE.MEAL} SET main =?, soup=?, kimchi=?, rice=?, side1=?, side2=? WHERE day=?`;
      const values = [main, soup, kimchi, rice, side1, side2, day];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData(
          STATUS.S200.result,
          STATUS.S200.resultDesc,
          moment().format("LT")
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(
        STATUS.E300.result,
        STATUS.E300.resultDesc,
        moment().format("LT")
      );
    }
  },
  delete: async (req) => {
    const { day } = req.params;
    if (isEmpty(day)) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }
    const cnt = await getSelectOne(day);
    try {
      if (!cnt) {
        return resData(
          STATUS.E100.result,
          STATUS.E100.resultDesc,
          moment().format("LT")
        );
      }
      const query = `DELETE FROM ${TABLE.MEAL} WHERE day = ?;`;
      const values = [day];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData(
          STATUS.S200.result,
          STATUS.S200.resultDesc,
          moment().format("LT")
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(
        STATUS.E300.result,
        STATUS.E300.resultDesc,
        moment().format("LT")
      );
    }
    return rows;
  },
};
module.exports = mealController;
