const db = require("../../plugins/mysql");
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/STATUS");
const { resData, currentTime, isEmpty } = require("../../util/lib");
const moment = require("../../util/moment");

const getTotal = async () => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.GOODS}`;
    const [[{ cnt }]] = await db.execute(query);
    console.log(cnt);
    return cnt;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, currentTime);
  }
};
const getGoodsList = async (req) => {
  try {
    const cnt = req.query.startDate || 0;
    const len = parseInt(req.query.len) || 10;

    let where = "";
    if (cnt) {
      where = `WHERE goods_cnt >= '${cnt}'`;
    }
    const query = `SELECT * FROM ${TABLE.GOODS} ${where} order by goods_id desc limit 0, ${len}`;
    console.log(query);
    const [rows] = await db.execute(query);
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, currentTime);
  }
};
const getSelectOne = async (name) => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.GOODS} WHERE goods_name=?`;
    const values = [name];
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
const goodsController = {
  create: async (req) => {
    const { id, name, cnt, price } = req.body;
    if (isEmpty(id) || isEmpty(name) || isEmpty(cnt) || isEmpty(price)) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }
    try {
      const query = `INSERT INTO goods ( goods_id, goods_name, goods_cnt, goods_price ) VALUES (?,?,?,?)`;
      const values = [id, name, cnt, price];
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
    const list = await getGoodsList(req);
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
    const { name } = req.params;
    const { id, cnt, price } = req.body;
    if (isEmpty(id) || isEmpty(name) || isEmpty(cnt) || isEmpty(price)) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }

    try {
      const query = `UPDATE ${TABLE.GOODS} SET goods_id=?, goods_cnt=?, goods_price=? WHERE goods_name=?`;
      const values = [id, cnt, price, name];
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
    const { name } = req.params;
    if (isEmpty(name)) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }
    const cnt = await getSelectOne(name);
    try {
      if (!cnt) {
        return resData(
          STATUS.E100.result,
          STATUS.E100.resultDesc,
          moment().format("LT")
        );
      }
      const query = `DELETE FROM ${TABLE.GOODS} WHERE goods_name = ?;`;
      const values = [name];
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
module.exports = goodsController;
