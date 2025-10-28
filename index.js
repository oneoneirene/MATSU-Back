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

// 🔹 連接 MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

const app = express()

// 🔹 CORS 設定
const allowedOrigins = [
  'https://oneoneirene.github.io', 
  'http://localhost:5173'          
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed'), false)
    }
  }
}));

// 🔹 解析 JSON
app.use(express.json())

// 🔹 路由
app.use('/users', userRouter)
app.use('/job', productsRouter)
app.use('/act', activitiesRouter)
app.use('/community', communitiesRouter)
app.use('/info', infosRouter)
app.use('/exp', expsRouter)
app.use('/article', articlesRouter)

// 🔹 404
app.all('*', (req, res) => {
  res.status(404).send({ success: false, message: '找不到' })
})

// 🔹 啟動 server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
