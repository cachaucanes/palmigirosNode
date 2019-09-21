import { Router } from 'express'
import { getPerfiles, getOnePerfil } from '../controller/perfiles.controller'
const router = Router()

router.get('/', getPerfiles)
router.get('/:idPerfiles', getOnePerfil)

export default router