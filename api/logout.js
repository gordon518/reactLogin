const path=require('path');
const db=require('../sqlite/liteDb');

module.exports = {
	post: (req, res) => {
		//destroy token
		let userName = req.userName;
		setDbToLogout(userName, function(ret) {
			if(!ret.err) {
				res.json({
					err: null,
					retInfo: {}
				});	
			} else {
				res.json(ret);
			}
		});
	}
};

function setDbToLogout(userName, fn) {
	db.exec("update user set token=null where username=?",[userName],function(ret) {
		fn(ret);
	});
}