const db=require('../sqlite/liteDb');
const { checkToken } = require("../authorization");

module.exports = {
	post: (req, res) => {
		res.json({err:null, userName: req.userName});
	}
};

