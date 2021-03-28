import express from 'express'
import {config} from 'dotenv'
import hookRouter from './routers/hookRouter'

config()

const app = express()
app.use(express.json())

app.use('/hook', hookRouter)
app.use('/', (req, res) => {
    return res.sendStatus(404)
})

app.listen(3030, () => {
    console.log('online')
})