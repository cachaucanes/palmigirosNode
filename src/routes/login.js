import { Router } from 'express'
import { login, logout } from '../controller/login.controller'

const router = Router()

router.post('/', login)
router.get('/logout', logout)

export default router