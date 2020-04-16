import { Router } from 'express'
import { getPerfiles, getOnePerfil, createPerfil, deletePerfil, updatePerfil, postPermisos, deletePermisos} from '../controller/perfiles.controller'
const router = Router()

router.get('/', getPerfiles)
router.get('/:idPerfiles', getOnePerfil)
router.post('/', createPerfil)
router.delete('/:idPerfiles', deletePerfil)

router.post('/add', postPermisos)
router.delete('/delete/:idPerfil/:idPermiso', deletePermisos)
router.put('/:idPerfil', updatePerfil)


export default router