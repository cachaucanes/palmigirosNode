import {Router} from 'express'

const router = Router()
import {getGiros, getOneGiro, createGiro, updateGiro, deleteGiro} from '../controller/giros.controller'

router.get('/', getGiros)
router.get('/:id', getOneGiro)
router.post('/', createGiro)
router.put('/:id', updateGiro)
router.delete('/:id', deleteGiro)


export default router;