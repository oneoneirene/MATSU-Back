import communities from '../models/community.js'

export const createCommunity = async (req, res) => {
  try {
    const result = await communities.create({
      name: req.body.name,
      // price: req.body.price,
      description: req.body.description,
      image: req.file?.path || '',
      sell: req.body.sell,
      // category: req.body.category,
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

export const getCommunities = async (req, res) => {
  try {
    const result = await communities.find({ sell: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllCommunities = async (req, res) => {
  try {
    const result = await communities.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getCommunity = async (req, res) => {
  try {
    const result = await communities.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editCommunity = async (req, res) => {
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
    }
    if (req.file) data.image = req.file.path
    const result = await communities.findByIdAndUpdate(req.params.id, data, { new: true })
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

export const deleteCommunity = async (req, res) => {
  try {
    await communities.findByIdAndDelete(req.params.id)
    // await orders.deleteMany({user : req.params.id})
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
