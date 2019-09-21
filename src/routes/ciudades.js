import { Router } from 'express'
import { getCiudades, getOneCiudades, createCiudades, deleteCiudad, updateCiudad } from '../controller/ciudades.controller'

const router = Router()

router.get('/', getCiudades)
router.get('/:id', getOneCiudades)
router.post('/', createCiudades)
router.delete('/:id', deleteCiudad)
router.put('/:id', updateCiudad)

export default router;