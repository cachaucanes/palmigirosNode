import {Router} from 'express'

const router = Router()
import {getGiros, getOneGiro, createGiro, updateGiro, deleteGiro, updateEstadoGiro, getGiroFindByCcReceptor} from '../controller/giros.controller'
import { havePermissions } from '../auth/auth'

router.get('/', havePermissions(13), getGiros)
router.get('/cedula/:cc', havePermissions(13), getGiroFindByCcReceptor)
router.get('/:id', havePermissions(13), getOneGiro)
router.post('/', havePermissions(14), createGiro)
router.put('/:id', havePermissions(15), updateGiro)
router.put('/status/:id', havePermissions(15), updateEstadoGiro)
router.delete('/:id', havePermissions(16), deleteGiro)

export default router;