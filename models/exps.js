import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入發文者']
  },
  description: {
    type: String,
    required: [true, '缺少心得內容']
  },
  image: {
    type: String
  },
  title: {
    type: String,
    required: [true, '請輸入心得標題']
  },
  sell: {
    type: Boolean,
    default: false
  },
  startDay: {
    type: Date,
    required: [true, '缺少開始日期']
  },
  endDay: {
    type: Date,
    required: [true, '缺少結束日期']
  }
  // category: {
  //   type: String,
  //   required: [true, '缺少分類欄位'],
  //   enum: {
  //     values: ['最新公告', '社區公告', '活動資訊', '徵才訊息', '心得分享'],
  //     message: '文章分類錯誤'
  //   }
  // }
  // post: {
  //   type: String,
  //   required: [true, '缺少文章內容']
  // },
  // title: {
  //   type: String,
  //   required: [true, '輸入文章標題']
  // },
  // reply: {
  //   type: String
  // },
}, { versionKey: false })

export default mongoose.model('exps', schema)
