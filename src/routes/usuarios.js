import {Router} from 'express'
import {getUsuarios, getOneUsuario, createUsuario, deleteUsuario, updateUsuario} from '../controller/usuarios.controller'
const router = Router()

router.get('/', getUsuarios)
router.get('/:id', getOneUsuario)
router.post('/', createUsuario)
router.delete('/:id', deleteUsuario)
router.put('/:id', updateUsuario)

export default router
