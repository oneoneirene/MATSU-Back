import express from 'express'
import admin from '../middleware/admin.js'
import * as auth from '../middleware/auth.js'
import {
  createOrder,
  getMyOrders,
  getAllOrders
} from '../controllers/orders.js'

const router = express.Router()

router.post('/', auth.jwt, createOrder)
router.get('/', auth.jwt, getMyOrders)
router.get('/all', auth.jwt, admin, getAllOrders)

export default router
