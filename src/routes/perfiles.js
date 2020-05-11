import { Router } from 'express'
import { getPerfiles, getOnePerfil, createPerfil, deletePerfil, updatePerfil, postPermisos, deletePermisos} from '../controller/perfiles.controller'
import { havePermissions } from '../auth/auth'
const router = Router()

router.get('/', havePermissions(21), getPerfiles)
router.get('/:idPerfiles', havePermissions(21), getOnePerfil)
router.post('/', havePermissions(22), createPerfil)
router.delete('/:idPerfiles', havePermissions(24), deletePerfil)
router.put('/:idPerfil', havePermissions(23), updatePerfil)
/* Add or Delete permisos al perfil */
router.post('/add',  postPermisos)
router.delete('/delete/:idPerfil/:idPermiso', deletePermisos)



export default router