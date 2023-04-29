const db = require("../../plugins/mysql");
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/STATUS");
const { resData, currentTime, isEmpty } = require("../../util/lib");
const moment = require("../../util/moment");

const getTotal = async () => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.PHONE}`;
    const [[{ cnt }]] = await db.execute(query);
    console.log(cnt);
    return cnt;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, currentTime);
  }
};
const getfareList = async (req) => {
  try {
    const fare = req.query.fare || 0;
    const len = parseInt(req.query.len) || 10;

    let where = "";
    if (fare) {
      where = `WHERE fare >= '${fare}'`;
    }
    const query = `SELECT * FROM ${TABLE.PHONE} ${where} order by fare desc limit 0, ${len}`;
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
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.PHONE} WHERE name=?`;
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
const phoneController = {
  create: async (req) => {
    const { phone, name, address, registration, fare } = req.body;
    if (
      isEmpty(phone) ||
      isEmpty(name) ||
      isEmpty(address) ||
      isEmpty(registration) ||
      isEmpty(fare)
    ) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }
    try {
      const query = `INSERT INTO phone (phone,  name, address, registration, fare) VALUES (?,?,?,?,?)`;
      const values = [phone, name, address, registration, fare];
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
    const list = await getfareList(req);
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
    const { phone, fare, address, registration } = req.body;
    if (
      isEmpty(fare) ||
      isEmpty(phone) ||
      isEmpty(name) ||
      isEmpty(address) ||
      isEmpty(registration)
    ) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }

    try {
      const query = `UPDATE ${TABLE.PHONE} SET phone=?, address=?, registration=?, fare=? WHERE name=?`;
      const values = [phone, address, registration, fare, name];
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
      const query = `DELETE FROM ${TABLE.PHONE} WHERE name = ?;`;
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
module.exports = phoneController;
