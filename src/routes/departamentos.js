import { Router } from 'express'
import { createDepartamento, getDepartamentos, getOneDepartamento, deleteDepartamento, updateDepartamento } from '../controller/departamentos.controller'
import { havePermissions } from '../auth/auth'

const router = Router()

router.get('/', havePermissions(1), getDepartamentos)
router.get('/:id', havePermissions(1), getOneDepartamento)
router.post('/', havePermissions(2), createDepartamento)
router.delete('/:id', havePermissions(4), deleteDepartamento)
router.put('/:id', havePermissions(3), updateDepartamento)

export default router