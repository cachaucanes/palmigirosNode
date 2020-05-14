import {Router} from 'express'
import {getUsuarios, getOneUsuario, createUsuario, deleteUsuario, updateUsuario} from '../controller/usuarios.controller'
import { havePermissions } from '../auth/auth'
const router = Router()

router.get('/', havePermissions(27), getUsuarios)
router.get('/:id', havePermissions(27), getOneUsuario)
router.post('/', havePermissions(28), createUsuario)
router.delete('/:id', havePermissions(30), deleteUsuario)
router.put('/:id', havePermissions(29), updateUsuario)

export default router
