import { config } from 'dotenv'
import express from 'express'
import hookRouter from './routers/hookRouter.js'

config()

const app = express()
app.use(express.json())

app.use('/hook', hookRouter)
app.use('/health', (req, res) => {
  return res.send('healthy')
})
app.use('/', (req, res) => {
  return res.sendStatus(404)
})

app.listen(3030, () => {
  console.log('🚀  Server ready at: http://localhost:3030')
})