import {Router} from 'express'
import { sessionUser } from '../controller/auth.controller'

const router = Router()

router.get("/", sessionUser)


export default router