const db=require('../sqlite/liteDb');
const { generateToken } = require("../authorization");
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');


module.exports = {
	post: (req, res) => {
		const {userName, password} = req.body;
		//decrypt password
		const privateKey = fs.readFileSync(path.resolve(__dirname,'../key/private.key'));
		const decryptedPassword = crypto.privateDecrypt({key:privateKey, padding:crypto.constants.RSA_PKCS1_PADDING}, Buffer.from(password,'base64')).toString();
		//MD5 encrypt password
		const md5Password = md5(decryptedPassword);
		//check password
		checkPass(userName, md5Password, function(ret1) {
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

function md5 (text) {
	return crypto.createHash('md5').update(text).digest('hex');
};
