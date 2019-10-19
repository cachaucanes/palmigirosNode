import { Router } from 'express'
import { getPerfiles, getOnePerfil, createPerfil, deletePerfil, updatePerfil} from '../controller/perfiles.controller'
const router = Router()

router.get('/', getPerfiles)
router.get('/:idPerfiles', getOnePerfil)
router.post('/', createPerfil)
router.delete('/:idPerfiles', deletePerfil)
router.put('/:id', updatePerfil)

export default router