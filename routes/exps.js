import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  createExp,
  getExps,
  getAllExps,
  getExp,
  editExp,
  deleteExp
} from '../controllers/exps.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createExp)
router.get('/', getExps)
router.get('/all', auth.jwt, admin, getAllExps)
router.get('/:id', getExp)
router.delete('/:id', auth.jwt, admin, deleteExp)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, editExp)

export default router
