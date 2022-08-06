import path from 'path'
import fs from 'fs'
import { loggerArr as log } from '../logger'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import https from 'https'
import httpLogger from 'morgan'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initPass from './api/users/passport'
import session from 'express-session'
import routes from './routes'

// ports
const HTTP_PORT = 3000
const HTTPS_PORT = 3443

// 인증서
const options = {
  key: process.env.DEV
    ? fs.readFileSync(path.join('ssl', 'minica-key.pem'))
    : fs.readFileSync(
        path.join(path.dirname(__dirname), 'ssl', 'minica-key.pem')
      ),
  cert: process.env.DEV
    ? fs.readFileSync(path.join('ssl', 'minica.pem'))
    : fs.readFileSync(path.join(path.dirname(__dirname), 'ssl', 'minica.pem'))
}
const app = express()

// middleware
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, origin)
    },
    credentials: true
  })
)
app.use(httpLogger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
    },
    store: MongoStore.create({
      mongoUrl: `mongodb://127.0.0.1:27017/bs`
    })
  })
)

// passport
initPass()
app.use(passport.initialize())
app.use(passport.session())

// router
const pf = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER, 'spa')
app.use(express.static(pf))
app.get('/', function (req, res, next) {
  res.sendfile(path.join(pf, 'index.html'))
})

// router
app.use('/api', routes)

// Create an HTTP server.
http.createServer(app).listen(HTTP_PORT, () => {
  log(3, 'server', `HTTP Server start on port ${HTTP_PORT}`)
})

// Create an HTTPS server.
https.createServer(options, app).listen(HTTPS_PORT, () => {
  log(3, 'server', `HTTPS Server start on port ${HTTPS_PORT}`)
})
