import express, {Router} from 'express'
import hookController from '../controllers/hookController'
import multer from 'multer'

let hookRouter: Router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

hookRouter.post('/', upload.single('thumb'), hookController.handlePlexWebhook)

export default hookRouter