import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '缺少名稱欄位']
  },
  // price: {
  //   type: Number,
  //   min: [0, '價格格式錯誤'],
  //   required: [true, '缺少價格欄位']
  // },
  description: {
    type: String
  },
  image: {
    type: String
  },
  sell: {
    type: Boolean,
    default: false
  },
  startDay: {
    type: Date,
    required: [true, '缺少張貼日期']
  },
  endDay: {
    type: Date,
    required: [true, '缺少下架日期']
  },
  phone: {
    type: String
  },
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
  job: {
    type: String,
    required: [true, '缺少工作內容']
  },
  jobtitle: {
    type: String,
    required: [true, '缺少工作名稱']
  }
}, { versionKey: false })

export default mongoose.model('products', schema)
