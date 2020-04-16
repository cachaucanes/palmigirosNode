import {Router} from 'express'

const router = Router()
import {getGiros, getOneGiro, createGiro, updateGiro, deleteGiro, updateEstadoGiro, getGiroFindByCcReceptor} from '../controller/giros.controller'

router.get('/', getGiros)
router.get('/cedula/:cc', getGiroFindByCcReceptor)
router.get('/:id', getOneGiro)

router.post('/', createGiro)
router.put('/:id', updateGiro)
router.put('/status/:id', updateEstadoGiro)
router.delete('/:id', deleteGiro)


export default router;