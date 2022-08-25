import acticles from '../models/articles.js'

export const createArticle = async (req, res) => {
  try {
    const result = await acticles.create({
      name: req.body.name,
      startDay: req.body.startDay,
      endDay: req.body.endDay,
      description: req.body.description,
      image: req.file?.path || '',
      sell: req.body.sell,
      title: req.body.title,
      category: req.body.category,
      reply: req.body.reply
    })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getArticles = async (req, res) => {
  try {
    const result = await acticles.find({ sell: true })
    console.log(result)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllArticles = async (req, res) => {
  try {
    const result = await acticles.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getArticle = async (req, res) => {
  try {
    const result = await acticles.findById(req.params.id)
    console.log(result)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editArticle = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      startDay: req.body.startDay,
      endDay: req.body.endDay,
      description: req.body.description,
      image: req.file?.path || '',
      sell: req.body.sell,
      title: req.body.title,
      category: req.body.category,
      reply: req.body.reply
    }
    if (req.file) data.image = req.file.path
    const result = await acticles.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const deleteArticle = async (req, res) => {
  try {
    await acticles.findByIdAndDelete(req.params.id)
    // await orders.deleteMany({user : req.params.id})
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
