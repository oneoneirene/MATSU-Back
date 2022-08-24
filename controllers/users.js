import users from '../models/users.js'
import exps from '../models/exps.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const password = req.body.password
  if (!password) {
    return res.status(400).send({ success: false, message: '缺少密碼欄位' })
  }
  if (password.length < 4) {
    return res.status(400).send({ success: false, message: '密碼必須 4 個字以上' })
  }
  if (password.length > 20) {
    return res.status(400).send({ success: false, message: '密碼必須 20 個字以下' })
  }
  if (!password.match(/^[A-Za-z0-9]+$/)) {
    return res.status(400).send({ success: false, message: '密碼格式錯誤' })
  }
  req.body.password = bcrypt.hashSync(password, 10)
  try {
    await users.create(req.body)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已存在' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const login = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id }, process.env.SECRET, { expiresIn: '7 days' })
    req.user.tokens.push(token)
    await req.user.save()
    console.log('5555')
    res.status(200).send({
      success: true,
      message: '',
      result: {
        token,
        account: req.user.account,
        email: req.user.email,
        role: req.user.role,
        cart: req.user.cart.length,
        image: req.file?.path || ''
      }
    })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const extend = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex(token => token === req.token)
    const token = jwt.sign({ _id: req.user._id }, process.env.SECRET, { expiresIn: '5s' })
    req.user.tokens[idx] = token
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: token })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getUser = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: '',
      result: {
        account: req.user.account,
        email: req.user.email,
        name: req.user.name,
        _id: req.user._id,
        image: req.file?.path || '',
        // cart: req.user.cart.length,
        role: req.user.role
        // 文章
        // category: req.user.category,
        // title: req.user.title,
        // post: req.user.post,
        // reply: req.user.reply
      }
    })
  } catch (error) {
    res.status(500).send({ success: false, message: error })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const result = await users.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    await users.findByIdAndDelete(req.params.id)
    // await orders.deleteMany({user : req.params.id})
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// export const editUser = async (req, res) => {
//   console.log(req.body)
//   try {
//     const data = {
//       name: req.body.name,
//       image: req.file?.path || ''
//     }
//     // if (req.file) data.image = req.file.path
//     const result = await users.findByIdAndUpdate(req.params.id, data, { new: true })
//     res.status(200).send({ success: true, message: '', result })
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       console.log('1234')
//       const key = Object.keys(error.errors)[0]
//       const message = error.errors[key].message
//       return res.status(400).send({ success: false, message })
//     } else {
//       res.status(500).send({ success: false, message: '伺服器錯誤' })
//     }
//   }
// }

export const editUser = async (req, res) => {
  try {
    console.log(req.body)
    const result = await users.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          // $ 代表符合陣列搜尋條件的索引
          name: req.body.name,
          account: req.body.account,
          email: req.body.email,
          image: req.file?.path || ''
        }
      }
    )
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editUsers = async (req, res) => {
  try {
    await users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          // $ 代表符合陣列搜尋條件的索引
          name: req.body.name,
          account: req.body.account,
          email: req.body.email,
          image: req.file?.path || ''
        }
      }
    )
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
// collection
export const getCollection = async (req, res) => {
  try {
    const result = await users.findById(req.user._id, 'collections').populate('collections.exp')
    res.status(200).send({ success: true, message: '', result: result.collections })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const addCollection = async (req, res) => {
  try {
    // 驗證商品
    const result = await exps.findById(req.body.exp)
    // 沒找到或已下架
    if (!result || !result.sell) {
      return res.status(404).send({ success: false, message: '商品不存在' })
    }
    // 找購物車有沒有這個商品
    const idx = req.user.collections.findIndex(item => item.product.toString() === req.body.exp)
    if (idx < 0) {
      req.user.collections.push({
        exp: req.body.exp,
        quantity: req.body.quantity
      })
    }
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: req.user.collections.length })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: error })
    }
  }
}

export const deleteCollection = async (req, res) => {
  // console.log('1234')
  console.log(req.params.id)
  console.log(users)
  try {
    await users.findOneAndUpdate(
      { _id: req.user._id, 'collections.exp': req.params.id },
      {
        $pull: {
          collections: { exp: req.params.id }
        }
      })
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: error })
  }
}
