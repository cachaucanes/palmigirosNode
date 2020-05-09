import { Router } from 'express'
import { createDepartamento, getDepartamentos, getOneDepartamento, deleteDepartamento, updateDepartamento } from '../controller/departamentos.controller'
import { isAuthenticated } from '../auth/auth'

const router = Router()

router.get('/', getDepartamentos)
router.get('/:id', getOneDepartamento)

router.post('/', createDepartamento)

router.delete('/:id', deleteDepartamento)

router.put('/:id', updateDepartamento)

export default router