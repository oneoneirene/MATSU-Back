import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '缺少活動名稱']
  },
  // price: {
  //   type: Number,
  //   min: [0, '行程價格錯誤'],
  //   required: [true, '缺少行程價格']
  // },
  startDay: {
    type: String,
    required: [true, '缺少開始日期']
  },
  endDay: {
    type: String,
    required: [true, '缺少結束日期']
  },
  image: {
    type: String
  },
  description: {
    type: String,
    required: [true, '缺少活動內容']
  },
  sell: {
    type: Boolean,
    default: false
  },
  start: {
    type: String,
    required: [true, '缺少開始日期']
  },
  end: {
    type: String,
    required: [true, '缺少結束日期']
  }
}, { versionKey: false })

export default mongoose.model('activities', schema)
