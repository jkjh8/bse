import express from 'express'
import http from 'http'
import https from 'https'

import fs from 'fs'

const HTTP_PORT = 3000
const HTTPS_PORT = 3443

const options = {
  key: fs.readFileSync('ssl/minica-key.pem'),
  cert: fs.readFileSync('ssl/minica.pem')
}

const app = express()

// Default route for server status
app.get('/', (req, res) => {
  res.json({
    message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}`
  })
})

// Create an HTTP server.
http.createServer(app).listen(HTTP_PORT)

// Create an HTTPS server.
https.createServer(options, app).listen(HTTPS_PORT)

export default app
