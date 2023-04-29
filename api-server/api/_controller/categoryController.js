const db = require("../../plugins/mysql");
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/STATUS");
const { resData, currentTime, isEmpty } = require("../../util/lib");
const moment = require("../../util/moment");

const getTotal = async () => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.CATEGORY}`;
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
    const id = req.query.id || 0;
    const len = parseInt(req.query.len) || 10;

    let where = "";
    if (id) {
      where = `WHERE id >= '${id}'`;
    }
    const query = `SELECT * FROM ${TABLE.CATEGORY} ${where} order by id desc limit 0, ${len}`;
    console.log(query);
    const [rows] = await db.execute(query);
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, currentTime);
  }
};
const getSelectOne = async (id) => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.CATEGORY} WHERE name=?`;
    const values = [id];
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
const categoryController = {
  create: async (req) => {
    const { id, name, description } = req.body;
    if (isEmpty(id) || isEmpty(name) || isEmpty(description)) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }
    try {
      const query = `INSERT INTO category ( id, name, description ) VALUES (?,?,?)`;
      const values = [id, name, description];
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
    const { name } = req.params;
    const { newName, description } = req.body;
    if (isEmpty(newName) || isEmpty(name) || isEmpty(description)) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }

    try {
      const query = `UPDATE ${TABLE.CATEGORY} SET name=?, description=? WHERE name=?`;
      const values = [newName, description, name];
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
      const query = `DELETE FROM ${TABLE.CATEGORY} WHERE name = ?;`;
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
module.exports = categoryController;
