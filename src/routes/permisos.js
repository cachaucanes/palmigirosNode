import {Router} from 'express'

const router = Router()
import { getPermisos, getOnePermisos, createPermisos, deletePermisos, updatePermisos} from '../controller/permisos.controller'

router.get('/', getPermisos)
router.get('/:id', getOnePermisos)
router.post('/', createPermisos)
router.delete('/:idPermisos', deletePermisos)
router.put('/:idPermisos', updatePermisos)

export default router