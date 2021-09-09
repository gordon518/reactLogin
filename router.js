const express = require("express");
//const adminCtrl = require("../controller/admin/index");
const router = express.Router();

// 函数实现，参数 delay 单位 毫秒 ；
function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        // 使用  continue 实现；
        continue; 
    }
}

router.post("/login", (req, res) => {
    const {userName, password} = req.body;
    const session = req.session;
	//sleep(3000);
    if(userName === "admin" && password === "admin") {
        if(session) {
            if(session.userInfo) {
                res.json({
                    retCode: -1,
                    retMsg: "您已登录过了"
                })
            }
            else {
                session.userInfo = {
                    userName,
                    password
                }
                res.json({
                    retCode: 0,
                    retInfo: {}
                })
            }
        }
        else {
            res.json({
                retCode: -1,
                retMsg: "尚无session"
            })
        }
    }
    else {
        res.json({
            retCode: -1,
            retMsg: "用户名或密码错误"
        })
    }
})

router.post("/logout", (req, res) => {
    req.session.userInfo = null;
    res.json({
        retCode: 0,
        retInfo: {}
    })
})

router.get("/useInfo", (req, res) => {
    const session = req.session;
    if(session.userInfo) {
		res.json({
			retCode: 0,
            userInfo: session.userInfo
        })
	}
	else
	{
		res.json({
			retCode: 0,
            userInfo: {}
        })
	}
})

module.exports = router;