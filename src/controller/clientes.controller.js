import Clientes from '../models/clientes'
import Ciudades from '../models/ciudades'
import Departamentos from '../models/departamentos'


export async function getClientes(req, res) {
  try {
    const clientes = await Clientes.findAll({
      attributes: { exclude: ['idCiudad'] },
      include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }]
    })
    res.json(clientes)
  } catch (error) {
    res.json(error)
  }
}

export async function getOneCliente(req, res) {
  try {
    const { id } = req.params
    const clientes = await Clientes.findOne({
      where: { id },
      attributes: {
        exclude: ['idCiudad']
      },
      include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }]
    })
    res.json(clientes)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

export async function createCliente(req, res) {
  try {
    const { numeroDocumento, nombres, apellidos, telefono, idCiudad } = req.body
    const clienteCreate = await Clientes.create({
      numeroDocumento,
      nombres,
      apellidos,
      telefono,
      idCiudad
    }, {
      fields: ['numeroDocumento', 'nombres', 'apellidos', 'telefono', 'idCiudad']
    })
    res.json({ message: 'Cliente Creado'})
  } catch (error) {
    res.json(error)
  }
}

export async function deleteCliente(req, res) {
  try {
    const { id } = req.params
    const clienteCountRow = await Clientes.destroy({
      where: { id }
    })
    res.json({ message: 'Cliente Eliminado', count: clienteCountRow })
  } catch (error) {
    res.json(error)
  }
}

export async function updateCliente(req, res) {
  try {
    const { id } = req.params
    const { numeroDocumento, nombres, apellidos, telefono, idCiudad } = req.body
    const searchCliente =  await Clientes.findOne({
      where: { id }
    })
    if(!searchCliente){
      res.status(404).json({message: 'Not Found'})
      return 0
    }
    const countCiudadesRow = await Clientes.update({
      numeroDocumento,
      nombres,
      apellidos,
      telefono,
      idCiudad
    }, {
      where: { id }
    })
    res.json({ message: 'Cliente Update', data: countCiudadesRow })
  } catch (error) {
    res.json(error)
  }
}


