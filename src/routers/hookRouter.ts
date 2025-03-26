import express, { Router } from 'express'
import multer from 'multer'
import hookController from '../controllers/hookController.js'

const hookRouter: Router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

hookRouter.post('/', upload.single('thumb'), hookController.handlePlexWebhook)

export default hookRouter