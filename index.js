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

const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

var app = express()
var mainrouter = require('./routes/main'),
    apirouter = require('./routes/api')



function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(favicon(__path +'/views/favico.ico'))
app.use(express.static("public"))
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
app.use('/', mainrouter);
app.use('/api', apirouter);


app.get('/short', (req, res) => {
    res.sendFile(__dirname + '/views/short.html')
})

app.use('/short/delete/:id', async (req, res) => {
    db.findOne({
        delete: req.params.id
    }).then((result) => {
        if (result == null) return res.status(404).json({
            status: false,
            message: "ID not found"
        })
        if (req.method == "POST") {
            db.findOneAndDelete({
                delete: req.params.id
            }).then((result) => {
                if (result == null) return res.sendStatus(404)
                else res.redirect('/')
            })
        } else res.sendFile(__dirname + '/views/delete.html')
    })
})
app.get('/short/:id', async (req, res, next) => {
    db.findOne({
        id: req.params.id
    }).then((result) => {
        if (result == null) return next()
        else res.redirect(result.url)
    })
})

app.post('/short/create', async (req, res) => {
    const url = req.body.url,
        costum = req.body.costum

    if (!url) return res.status(400).json({
        status: false,
        message: "Masukkan parameter url"
    })

    if (!isUrl(url)) return res.status(400).json({
        status: false,
        message: "Harap masukkan url parameter yang valid"
    })
    const id = costum ? costum : makeid(4)
    const delete_id = makeid(18)
    const check = await db.findOne({
        id
    })
    if (check) return res.status(400).json({
        status: false,
        message: "Id tersebut sudah ada, silahkan coba lagi atau ganti dengan yang lain"
    })

    db.insert({
        id,
        url,
        delete: delete_id
    }).then(() => res.status(200).json({
        status: true,
        message: "Happy Nice Day",
        result: {
            id,
            delete: delete_id
        }
    })).catch((err) => {
        console.log(err)
        res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    })
})
app.use(function (req, res, next) {
    res.sendStatus(404)
})
app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT,'green'))
})

module.exports = app
