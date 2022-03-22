// tutorial src = https://www.youtube.com/watch?v=SccSCuHhOw0&t=726s



// This is the library I am using to build the server
const express = require('express')
// Creatting the server
const app = express()

// rendering static files / best pratice to use the public folder #so far
app.use(express.static('public'))

// this is the view engine... ejs is the closest to html format
// this line has been depricated with line 11
// just keeping it for reference
app.set('view engine', 'ejs')


const get_ip = require('ipware')().get_ip;
app.use(function(req, res, next) {
    const ip_info = get_ip(req);
    console.log(ip_info);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
})
app.get('/', (request, response, next) => (
    
    response.render('index')
))

//app is listing on port 3000
app.listen(3000)