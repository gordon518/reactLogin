const supertest = require('supertest');
const should = require('should');
const async = require('async');
const app = require('../app');

var request=supertest(app);
/* example to close server after testing
request
. get('/api/ping')
. expect(200)
. end(function(err, res) {
    if (err) throw err;
    console.log("succeeded in test");
    app.close();
});
*/
async.series([
    function(callback) {
        // do some stuff ...
        request.get('/api/ping').expect(200).then(response =>{
            response.body.success.should.equal(true);
            console.log("succeeded in test /api/ping");
            callback(null,1);
        });
    },
],
// //after all http url requests finished, then do this function
function(err, results) {
    console.log("test finished! result="+results.toString());
    app.close();
});
