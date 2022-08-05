import path from 'path'
import express from 'express'
import api from './api'

const router = express.Router()

// const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER)

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render(path.join(publicFolder, 'spa', 'index.js'))
// })

router.use('/api', api)

export default router
