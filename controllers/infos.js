import infos from '../models/infos.js'

export const createInfo = async (req, res) => {
  try {
    const result = await infos.create({
      name: req.body.name,
      // price: req.body.price,
      description: req.body.description,
      image: req.file?.path || '',
      sell: req.body.sell,
      // category: req.body.category,1
      startDay: req.body.startDay,
      // endDay: req.body.endDay,
      title: req.body.title
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

export const getInfos = async (req, res) => {
  try {
    const result = await infos.find({ sell: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllInfos = async (req, res) => {
  try {
    const result = await infos.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getInfo = async (req, res) => {
  try {
    const result = await infos.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editInfo = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      // price: req.body.price,
      // description: req.body.description,
      // image: req.file?.path || '',
      sell: req.body.sell,
      // category: req.body.category,
      startDay: req.body.startDay,
      endDay: req.body.endDay,
      title: req.body.title
      // job: req.body.job,
      // jobtitle: req.body.jobtitle
    }
    if (req.file) data.image = req.file.path
    const result = await infos.findByIdAndUpdate(req.params.id, data, { new: true })
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

export const deleteInfo = async (req, res) => {
  try {
    await infos.findByIdAndDelete(req.params.id)
    // await orders.deleteMany({user : req.params.id})
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
