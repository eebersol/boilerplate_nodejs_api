'use strict'

// Basic  Security modules
const helmet         = require('helmet');        
const compression    = require('compression'); 
const cors           = require('cors');  

const fs             = require('fs');
const http        = require('http');
const winston        = require('winston');
const express        = require('express');
const app            = express();
const routes         = require('./routes')
const config         = require('./config/config.json');
const middleware     = require('./modules/middlewares');
const dir            = './logs';
require('./db/mongo.js');
const bodyParser     = require('body-parser');

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.File({
      filename: './logs/errors.log',
      level: 'error'
    })
  ]
});

const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false,
  exposedHeaders: ['x-auth-token']
};

app.use(compression());
app.use(helmet());
app.use(cors(corsOption));

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', middleware.logs, routes);

app.get('/', (req, res) =>  {
	res.status(200).json({"message":"Welcome to your App ! =) "});
});

let httpsServer = http.createServer(app)

app.use(function(req, res, next) {
  if (!req.meta.route) {
    let err = new Error('Page not found')
    err.status = 404
    return next (err);
  }
  next();
});
app.use(function(err, req, res, next) {
  let message = "[Error][" + req.meta.date + "][" + req.meta.on 
        + "][Platform " + req.meta.platform 
        + "][Device " + req.meta.device + "][" + req.meta.ip 
        + "] Request method " + req.meta.method + " on " + req.meta.route 
        + " body -> " + JSON.stringify(req.meta.body) 
        + " -> Status " + (err.status || 500) 
        + " Error: " + (err.message || "Server crash")
 logger.error(message)
    if (err.message)
      return res.status(err.status || err.code || 500).send({error: err.message})
    return res.status(500).send({error: "Le serveur a mal"})
});

httpsServer.listen(config.port, config.host);

module.exports = httpsServer;
