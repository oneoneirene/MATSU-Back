import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  createActivity,
  getActivities,
  getAllActivities,
  getActivity,
  editActivity,
  deleteActivity
} from '../controllers/activities.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createActivity)
router.get('/', getActivities)
router.get('/all', auth.jwt, admin, getAllActivities)
router.get('/:id', getActivity)
router.delete('/:id', auth.jwt, admin, deleteActivity)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, editActivity)

export default router
