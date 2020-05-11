import {Router} from 'express'

const router = Router()
import { getPermisos, getOnePermisos, createPermisos, deletePermisos, updatePermisos} from '../controller/permisos.controller'
import { havePermissions } from '../auth/auth'

router.get('/', havePermissions(18), getPermisos)
router.get('/:id', havePermissions(18), getOnePermisos)
router.post('/', havePermissions(17), createPermisos)
router.delete('/:idPermisos', havePermissions(20), deletePermisos)
router.put('/:idPermisos', havePermissions(19), updatePermisos)

export default router