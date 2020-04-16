import {Router} from 'express'
import { getClientes, getOneCliente, createCliente, deleteCliente , updateCliente, getClienteFindByCC} from '../controller/clientes.controller'
const router = Router()

router.get('/', getClientes)
router.get('/:id', getOneCliente)
router.get('/cc/:numeroDocumento', getClienteFindByCC)
router.post('/', createCliente)
router.delete('/:id', deleteCliente)
router.put('/:id', updateCliente)


export default router