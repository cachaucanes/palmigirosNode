import {Router} from 'express'
import { getClientes, getOneCliente, createCliente, deleteCliente , updateCliente, getClienteFindByCC} from '../controller/clientes.controller'
import { havePermissions } from '../auth/auth'
const router = Router()

router.get('/', havePermissions(9), getClientes)
router.get('/:id', havePermissions(9), getOneCliente)
router.get('/cc/:numeroDocumento', havePermissions(9), getClienteFindByCC)
router.post('/', havePermissions(10), createCliente)
router.delete('/:id', havePermissions(12), deleteCliente)
router.put('/:id', havePermissions(11), updateCliente)


export default router