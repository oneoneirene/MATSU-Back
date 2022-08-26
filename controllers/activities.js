import activities from '../models/activities.js'

export const createActivity = async (req, res) => {
  try {
    const result = await activities.create({
      name: req.body.name,
      startDay: req.body.startDay,
      endDay: req.body.endDay,
      description: req.body.description,
      image: req.file?.path || '',
      sell: req.body.sell,
      poster: req.body.poster,
      link: req.body.link
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

export const getActivities = async (req, res) => {
  try {
    const result = await activities.find({ sell: true })
    console.log(result)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllActivities = async (req, res) => {
  try {
    const result = await activities.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getActivity = async (req, res) => {
  try {
    const result = await activities.findById(req.params.id)
    console.log(result)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editActivity = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      startDay: req.body.startDay,
      endDay: req.body.endDay,
      description: req.body.description,
      sell: req.body.sell,
      image: req.file?.path || '',
      poster: req.body.poster,
      link: req.body.link
    }
    if (req.file) data.image = req.file.path
    const result = await activities.findByIdAndUpdate(req.params.id, data, { new: true })
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

export const deleteActivity = async (req, res) => {
  try {
    await activities.findByIdAndDelete(req.params.id)
    // await orders.deleteMany({user : req.params.id})
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
