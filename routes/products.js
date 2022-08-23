import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  createProduct,
  getProducts,
  getAllProducts,
  getProduct,
  editProduct,
  deleteProduct
} from '../controllers/products.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createProduct)
router.get('/', getProducts)
router.get('/all', auth.jwt, admin, getAllProducts)
router.get('/:id', getProduct)
router.delete('/:id', auth.jwt, admin, deleteProduct)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, editProduct)

export default router
