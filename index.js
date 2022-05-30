__path = process.cwd();
var favicon = require('serve-favicon');
var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
    logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    database = require("./db/mongo"),
    db = database.get("short-link");
const PORT = process.env.PORT || 8080 || 5000 || 3000
var { color } = require('./lib/color.js')

var app = express()
var mainrouter = require('./routes/main'),
    apirouter = require('./routes/api')



app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(logger('dev'))
app.use(express.json())

app.use(favicon(__path +'/views/favico.ico'))
app.use(express.static("public"))



app.use('/', mainrouter);
app.use('/api', apirouter);

app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT,'green'))
})

module.exports = app
