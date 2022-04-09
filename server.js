// tutorial src = https://www.youtube.com/watch?v=SccSCuHhOw0&t=726s



// This is the library I am using to build the server
const express = require('express')

// UA parser npm ua-parser-js
const parser = require('ua-parser-js');
// Creatting the server
const app = express()

// rendering static files / best pratice to use the public folder #so far
app.use(express.static('public'))

// this is the view engine... ejs is the closest to html format
// this line has been depricated with line 13
// just keeping it for reference
app.set('view engine', 'ejs')


const get_ip = require('ipware')().get_ip;
const test1 = require('ipware')().get_trusted_ip;
app.use(function(req, res, next) {
    const ip_info = get_ip(req);
    const test_1 = test1(req)
    let ua = parser(req.headers['user-agent'])
    console.log(ip_info, 'Test 1',test_1, req.ip, ua);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
})
app.get('/', (request, response, next) => (
    
    response.render('index')
))
require('dotenv').config({ path: './TEST.env'})

console.log(process.env.IP_INFO_TOKEN)

//app is listing on port 3000
app.listen(3000)

