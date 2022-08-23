import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  createCommunity,
  getCommunities,
  getAllCommunities,
  getCommunity,
  editCommunity,
  deleteCommunity
} from '../controllers/community.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createCommunity)
router.get('/', getCommunities)
router.get('/all', auth.jwt, admin, getAllCommunities)
router.get('/:id', getCommunity)
router.delete('/:id', auth.jwt, admin, deleteCommunity)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, editCommunity)

export default router
