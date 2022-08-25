import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import './passport/passport.js'
import userRouter from './routes/users.js'
import productsRouter from './routes/products.js'
import activitiesRouter from './routes/activities.js'
import communitiesRouter from './routes/community.js'
import infosRouter from './routes/infos.js'
import expsRouter from './routes/exps.js'
import articlesRouter from './routes/articles.js'
mongoose.connect(process.env.DB_URL)

const app = express()

app.use(cors({
  origin (origin, callback) {
    if (origin === undefined || origin.includes('github') || origin.includes('localhost')) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed'), false)
    }
  }
}))
app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '請求被拒' })
})

app.use(express.json())
app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '請求格式錯誤' })
})

app.use('/users', userRouter)
app.use('/job', productsRouter)
app.use('/act', activitiesRouter)
app.use('/community', communitiesRouter)
app.use('/info', infosRouter)
app.use('/exp', expsRouter)
app.use('/article', articlesRouter)

app.all('*', (req, res) => {
  res.status(404).send({ success: false, message: '找不到' })
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running')
})
