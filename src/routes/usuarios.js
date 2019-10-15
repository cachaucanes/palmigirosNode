import {Router} from 'express'
import {getUsuarios, getOneUsuario, createUsuario} from '../controller/usuarios.controller'
const router = Router()

router.get('/', getUsuarios)
router.get('/:id', getOneUsuario)
router.post('/', createUsuario)

export default router
