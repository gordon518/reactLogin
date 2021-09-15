const path=require('path');

module.exports = {
	get: (req, res) => {
		const session = req.session;
		if(session.userInfo) {
			res.json({
				err: null,
				userInfo: session.userInfo
			})
		}
		else
		{
			res.json({
				err: null,
				userInfo: {}
			})
		}	
	},
};
