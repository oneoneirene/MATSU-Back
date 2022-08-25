import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入投稿者名稱']
  },
  description: {
    type: String,
    required: [true, '請輸入投稿內容']
  },
  image: {
    type: String
  },
  title: {
    type: String,
    required: [true, '請輸入投稿標題']
  },
  sell: {
    type: Boolean,
    default: true
  },
  startDay: {
    type: Date,
    required: [true, '請輸入開始日期']
  },
  endDay: {
    type: Date,
    required: [true, '請輸入結束時間']
  },
  category: {
    type: String,
    required: [true, '缺少分類欄位'],
    enum: {
      values: ['最新公告', '社區公告', '活動資訊', '徵才訊息', '旅遊心得'],
      message: '文章分類錯誤'
    }
  },
  reply: {
    type: String
  }
}, { versionKey: false })

export default mongoose.model('articles', schema)
