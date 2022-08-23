import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  createInfo,
  getInfos,
  getAllInfos,
  getInfo,
  editInfo,
  deleteInfo
} from '../controllers/infos.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createInfo)
router.get('/', getInfos)
router.get('/all', auth.jwt, admin, getAllInfos)
router.get('/:id', getInfo)
router.delete('/:id', auth.jwt, admin, deleteInfo)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, editInfo)

export default router
