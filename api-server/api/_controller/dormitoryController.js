const db = require("../../plugins/mysql");
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/STATUS");
const { resData, currentTime, isEmpty } = require("../../util/lib");
const moment = require("../../util/moment");

const getdormitoryTotal = async () => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.DORMITORY}`;
    const [[{ cnt }]] = await db.execute(query);
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
const getroomTotal = async () => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.ROOM}`;
    const [[{ cnt }]] = await db.execute(query);
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
const getroomidTotal = async (req) => {
  try {
    const { number } = req.params;
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.ROOM} WHERE number=${number}`;
    const [[{ cnt }]] = await db.execute(query);
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
const getcustomerTotal = async () => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.CUSTOMER}`;
    const [[{ cnt }]] = await db.execute(query);
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
const getresTotal = async () => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.RESERVATION}`;
    const [[{ cnt }]] = await db.execute(query);
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
const getresableTotal = async (req) => {
  try {
    const { start_date, end_date } = req.query;
    const query = `SELECT COUNT(*) as cnt FROM ${TABLE.ROOM} WHERE id NOT IN (SELECT room_id FROM reservation WHERE start_date <= ${start_date} AND end_date >= ${end_date});`;
    const [[{ cnt }]] = await db.execute(query);
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
const getresidTotal = async (req) => {
  try {
    const id = req.params.id;
    const query = `SELECT COUNT(*) as cnt FROM ${TABLE.ROOM} WHERE id IN (SELECT room_id FROM  ${TABLE.RESERVATION} WHERE customer_id = ${id});`;
    const [[{ cnt }]] = await db.execute(query);
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
const getcustomeridTotal = async (req) => {
  try {
    const id = req.params.id;
    const query = `SELECT COUNT(*) as cnt FROM ${TABLE.CUSTOMER} WHERE id = ${id};`;
    const [[{ cnt }]] = await db.execute(query);
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
const getdormitoryList = async (req) => {
  try {
    const query = `SELECT * FROM ${TABLE.DORMITORY}`;
    const [rows] = await db.execute(query);
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(
      STATUS.E300.result,
      STATUS.E300.resultDesc,
      moment().format("LT")
    );
  }
};
const getcustomerList = async (req) => {
  try {
    const query = `SELECT * FROM ${TABLE.CUSTOMER}`;
    const [rows] = await db.execute(query);
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(
      STATUS.E300.result,
      STATUS.E300.resultDesc,
      moment().format("LT")
    );
  }
};
const getroomList = async (req) => {
  try {
    const query = `SELECT * FROM ${TABLE.ROOM}`;
    const [rows] = await db.execute(query);
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(
      STATUS.E300.result,
      STATUS.E300.resultDesc,
      moment().format("LT")
    );
  }
};
const getresList = async (req) => {
  try {
    const query = `SELECT * FROM ${TABLE.RESERVATION}`;
    const [rows] = await db.execute(query);
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(
      STATUS.E300.result,
      STATUS.E300.resultDesc,
      moment().format("LT")
    );
  }
};
const getroomidList = async (req) => {
  const { number } = req.params;
  try {
    let query = `SELECT * FROM ${TABLE.ROOM} WHERE number=${number}`;
    const [rows] = await db.execute(query);
    console.log(rows);
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, currentTime);
  }
};
const getcustomeridList = async (req) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM ${TABLE.CUSTOMER} WHERE id=${id}`;
    const [rows] = await db.execute(query);
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(
      STATUS.E300.result,
      STATUS.E300.resultDesc,
      moment().format("LT")
    );
  }
};
const getresableList = async (req) => {
  try {
    const { start_date, end_date } = req.query;
    const query = `SELECT * FROM ${TABLE.ROOM} WHERE id NOT IN (SELECT room_id FROM ${TABLE.RESERVATION} WHERE start_date <= '${start_date}' AND end_date >= '${end_date}');`;
    const [rows] = await db.execute(query);
    return rows;
  } catch (e) {
    return resData(
      STATUS.E300.result,
      STATUS.E300.resultDesc,
      moment().format("LT")
    );
  }
};
const getresidList = async (req) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM ${TABLE.ROOM} WHERE id IN (SELECT room_id FROM  ${TABLE.RESERVATION} WHERE customer_id = ${id});`;
    const [rows] = await db.execute(query);
    console.log(query);
    return rows;
  } catch (e) {
    return resData(
      STATUS.E300.result,
      STATUS.E300.resultDesc,
      moment().format("LT")
    );
  }
};

const dormitoryController = {
  //고시원 정보 조회하기
  dormitorylist: async (req) => {
    const totalCount = await getdormitoryTotal();
    const list = await getdormitoryList(req);
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

  //방 정보 조회하기
  roomlist: async (req) => {
    const totalCount = await getroomTotal();
    const list = await getroomList(req);
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

  //고객 정보
  customerlist: async (req) => {
    const totalCount = await getcustomerTotal();
    const list = await getcustomerList(req);
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

  //특정 고시원의 방 정보 조회하기
  roomidlist: async (req) => {
    const totalCount = await getroomidTotal(req);
    const list = await getroomidList(req);
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

  //특정 고객 정보 조회하기
  customeridlist: async (req) => {
    const totalCount = await getcustomeridTotal(req);
    const list = await getcustomeridList(req);
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

  //예약 정보 조회하기
  reslist: async (req) => {
    const totalCount = await getresTotal();
    const list = await getresList(req);
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

  //예약 가능한 방 정보 조회하기
  resablelist: async (req, res) => {
    const totalCount = await getresableTotal(req);
    const list = await getresableList(req);
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

  //특정 고객이 예약한 방 정보 조회하기
  residList: async (req) => {
    const totalCount = await getresidTotal(req);
    const list = await getresidList(req);
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

  //예약 정보 추가하기
  createres: async (req) => {
    const { room_id, customer_id, start_date, end_date } = req.body;
    if (isEmpty(room_id) || isEmpty(customer_id)) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }
    try {
      const query = `INSERT INTO ${TABLE.RESERVATION} (room_id, customer_id, start_date, end_date, status)
                     VALUES (?,?,?,?,'예약 완료')`;
      const values = [room_id, customer_id, start_date, end_date];
      const [result] = await db.execute(query, values);

      return resData(
        STATUS.S200.result,
        STATUS.S200.resultDesc,
        moment().format("LT")
      );
    } catch (e) {
      console.log(e.message);
      return resData(
        STATUS.E300.result,
        STATUS.E300.resultDesc,
        moment().format("LT")
      );
    }
  },

  //예약 정보 수정하기
  updateres: async (req) => {
    const { id } = req.params;
    const { newStartDate, newEndDate } = req.body;
    if (isEmpty(newStartDate) || isEmpty(newEndDate)) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }
    try {
      const query = `UPDATE ${TABLE.RESERVATION} SET start_date = ?, end_date = ? WHERE id = ?`;
      const values = [newStartDate, newEndDate, id];
      const [result] = await db.execute(query, values);
      console.log(result);
      return resData(
        STATUS.S200.result,
        STATUS.S200.resultDesc,
        moment().format("LT")
      );
    } catch (e) {
      console.log(e.message);
      return resData(
        STATUS.E300.result,
        STATUS.E300.resultDesc,
        moment().format("LT")
      );
    }
  },

  //예약 정보 삭제하기
  deleteres: async (req) => {
    const { id } = req.params;
    if (isEmpty(id)) {
      return resData(
        STATUS.E100.result,
        STATUS.E100.resultDesc,
        moment().format("LT")
      );
    }
    try {
      const query = `DELETE FROM ${TABLE.RESERVATION} WHERE id = ?`;
      const [result] = await db.execute(query, [id]);
      console.log(result);
      if (result.affectedRows === 1) {
        return resData(
          STATUS.S200.result,
          STATUS.S200.resultDesc,
          moment().format("LT")
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(
        STATUS.E300.resultDesc,
        SATAUS.E300.resultDesc,
        moment().format("LT")
      );
    }
  },

  //예약 초기화
  truncateres: async (req) => {
    try {
      const query = `TRUNCATE TABLE ${TABLE.RESERVATION};`;
      const [result] = await db.execute(query);
      console.log(result);
      return resData(
        STATUS.S200.result,
        STATUS.S200.resultDesc,
        moment().format("LT")
      );
    } catch (e) {
      console.log(e.message);
      return resData(
        STATUS.E300.result,
        STATUS.E300.resultDesc,
        moment().format("LT")
      );
    }
  },
};
module.exports = dormitoryController;
