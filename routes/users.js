import express from 'express'
import * as auth from '../middleware/auth.js'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  register,
  login,
  logout,
  extend, // 舊換新
  getUser,
  getAllUsers,
  deleteUser,
  editUser,
  editUsers
} from '../controllers/users.js'

const router = express.Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.patch('/', content('multipart/form-data'), auth.jwt, upload, editUser)
router.patch('/:id', content('application/json'), auth.login, editUsers)
router.delete('/logout', auth.jwt, logout)
router.post('/extend', auth.jwt, extend)
router.get('/', auth.jwt, getUser)
router.get('/all', getAllUsers)
router.delete('/:id', auth.jwt, admin, deleteUser)

export default router
