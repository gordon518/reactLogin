const db=require('../sqlite/liteDb');
const { generateToken } = require("../authorization");

module.exports = {
	post: (req, res) => {
		const {userName, password} = req.body;
		checkPass(userName, password, function(ret1) {
			if(!ret1.err) {
				const token = generateToken({ userName: userName });
				console.log(token);
				saveToken(userName,token,function(ret2){
					if(!ret2.err) {
						res.json({
							err: null,
							token: token
						});				
					} else {
						res.json(ret2);
					}
				});
			} else {
				res.json(ret1);
			}
		});
	}
};

function checkPass(userName, password, fn) {
	const sql="select * from user where username=? and password=?";
	db.query(sql,[userName, password],function(ret) {
		if(!ret.err) {
			if(ret.rows.length==1) {
				fn(ret);
			} else {
				ret.err="Username or password error";
				fn(ret);
			}
		} else {
			fn(ret);
		}
	});
}

function saveToken(userName, token, fn) {
	db.exec("update user set token=? where username=?",[token, userName], function(ret) {
		fn(ret);
	});
}