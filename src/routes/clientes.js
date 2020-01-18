import {Router} from 'express'
import { getClientes, getOneCliente, createCliente, deleteCliente , updateCliente} from '../controller/clientes.controller'
const router = Router()

router.get('/', getClientes)
router.get('/:id', getOneCliente)
router.post('/', createCliente)
router.delete('/:id', deleteCliente)
router.put('/:id', updateCliente)


export default router