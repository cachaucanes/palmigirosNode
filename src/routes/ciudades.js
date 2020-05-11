import { Router } from 'express'
import { getCiudades, getOneCiudades, createCiudades, deleteCiudad, updateCiudad } from '../controller/ciudades.controller'
import { havePermissions } from '../auth/auth';

const router = Router()

router.get('/', havePermissions(5), getCiudades)
router.get('/:id', havePermissions(5), getOneCiudades)
router.post('/', havePermissions(6), createCiudades)
router.delete('/:id', havePermissions(8), deleteCiudad)
router.put('/:id', havePermissions(7), updateCiudad)

export default router;