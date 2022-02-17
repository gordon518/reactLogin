const express = require("express");
const url = require("url");
const router = express.Router();
const db=require('./sqlite/liteDb');
const { checkToken } = require("./authorization");

/*
Convension over config, it's stupid to config every URL calls in router.
By this function, system will automatically process every URL requests, and dispatch requests to relevant processor in api folder.
For example: for the URL call of "/api/login", system will dispatch this call to the file of "/api/login.js".
By this convension, we can get rid of config of every URL calls.
*/
const passUrl = ['/login'];
router.all("*",  (req, res) => {  // runs on ALL requests
    var pathname = url.parse(req.url).pathname;
    console.log("router() About to the URL Path of " + pathname);
    if(!~passUrl.findIndex(item => pathname === item)) {
        const token = req.headers.token;
        if(token) {
            checkToken(token, function(ret) {
                if (ret.err) {
                    return res.json({ err: "token invalid" });
                }
                //console.log("verify decoded", ret.userName);
                checkDb(token, ret, function(ret2) {
                    if(!ret2.err) {
                        req.userName=ret.userName;
                        nextProcess(req, res, pathname);        
                    } else {
                        return res.json({ ret2 });
                    }
                });
            });
        } else {
            return res.json({ err: "no token" });
        }
    } else {
        nextProcess(req, res, pathname);
    }
});

const nextProcess = (req, res, pathname) => {
    try {
        //dynamically load the js file base on the url path
        var handler = require("./api/" + pathname);
        //make sure we got a correct instantiation of the module
        //route to the right method in the module based on the HTTP action
        if(req.method.toLowerCase() == 'get' && typeof handler["get"] == 'function') {
            handler["get"](req, res);
            return;
        } else if (req.method.toLowerCase() == 'post' && typeof handler["post"] == 'function') {
            handler["post"](req, res);
            return;
        } else if (req.method.toLowerCase() == 'put' && typeof handler["put"] == 'function') {
            handler["put"](req, res);
            return;
        } else if (req.method.toLowerCase() == 'delete' && typeof handler["delete"] == 'function') {
            handler["delete"](req, res);
            return;
        }
    } catch(err) {
        console.log("router(): exception instantiating handler: " + err.stack);
    }
    console.log("router(): No request handler found for " + pathname);
    res.status(404).json({
        err: "router(): No request handler found for " + pathname
    });
}

function checkDb(token, payload, fn) {
	db.query("select * from user where username=?",[payload.userName],function(ret) {
        if(!ret.err) {
            if(ret.rows.length==1) {
                let row=ret.rows[0];
                if(row["token"]==token) {
                    fn(ret);
                } else {
                    ret.err="token is expired";
                    fn(ret);
                }
            } else {
                ret.err="This user of "+payload.userName+" not exist in database";
                fn(ret);
            }
        } else {
            fn(ret);
        }
    });
}
/*
// delay mili-seconds
function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue; 
    }
}
*/

module.exports = router;