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
    if(clientes){      
      res.json({clientes, message: 'Success'})    
    }
    else{
      res.status(404).json({clientes: {}, message: "User Not found"})      
    }        
  } catch (error) {    
    res.json(error)
  }
}
export async function getClienteFindByCC(req, res) {
  try {
    const { numeroDocumento } = req.params
    const clientes = await Clientes.findOne({
      where: { numeroDocumento },
      attributes: {
        exclude: ['idCiudad']
      },
      include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }]
    })
    if(clientes){      
      res.json({clientes, message: 'Search Success'})    
    }
    else{
      res.status(404).json({clientes: {}, message: "Client Not found"})      
    }        
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

    //fetch para enviar datos completos del cliente creado
    const cliente = await Clientes.findOne({
      where: { id: clienteCreate.id },
      attributes: {
        exclude: ['idCiudad']
      },
      include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }]
    })

    res.json({ message: 'Save client', cliente })
  } catch (error) {
    res.status(500).json({error, message: error.message})
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
    res.status(500).json({ message: 'Error', error })
  }
}

export async function updateCliente(req, res) {
  try {
    const { id } = req.params
    const { numeroDocumento, nombres, apellidos, telefono, idCiudad } = req.body
    const searchCliente = await Clientes.findOne({
      where: { id }
    })
    if (!searchCliente) {
      res.status(404).json({ message: 'Not Found' })
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

    if (countCiudadesRow > 0) {
      const clientes = await Clientes.findOne({
        where: { id },
        attributes: {
          exclude: ['idCiudad']
        },
        include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }]
      })
      res.json({ message: 'Cliente Update', clientes })
    }else{
      res.json({ message: 'Sin Cambios', clientes: countCiudadesRow })
    }

  } catch (error) {
    res.status(500).json({error, message: error.message})
  }
}


