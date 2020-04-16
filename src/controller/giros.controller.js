import Giros from '../models/giros'
import Ciudades from '../models/ciudades'
import Departamentos from '../models/departamentos'
import Clientes from '../models/clientes'

export async function getGiros(req, res) {
  try {
    const giros = await Giros.findAll({
      attributes: { exclude: ['idCiudadEmisor', 'idCiudadReceptor', 'idClienteEmisor', 'idClienteReceptor'] },
      include: [{
        attributes: { exclude: ['idDepartamento'] },
        model: Ciudades, as: 'idCiudadEmisora',
        include: [{ model: Departamentos, as: 'idDepartamentos' }]
      }, { attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudadReceptora', include: [{ model: Departamentos, as: 'idDepartamentos' }] },
      { attributes: { exclude: ['idCiudad'] }, model: Clientes, as: 'idClienteEmisores', include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }] },
      { attributes: { exclude: ['idCiudad'] }, model: Clientes, as: 'idClienteReceptores', include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }] }
      ]
    })
    res.json({ giros })
  } catch (error) {
    res.json(error)
  }
}

export async function getOneGiro(req, res) {
  try {
    const { id } = req.params
    const giro = await Giros.findOne({
      where: { id },
      attributes: { exclude: ['idCiudadEmisor', 'idCiudadReceptor', 'idClienteEmisor', 'idClienteReceptor'] },
      include: [{
        attributes: { exclude: ['idDepartamento'] },
        model: Ciudades, as: 'idCiudadEmisora',
        include: [{ model: Departamentos, as: 'idDepartamentos' }]
      }, { attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudadReceptora', include: [{ model: Departamentos, as: 'idDepartamentos' }] },
      { attributes: { exclude: ['idCiudad'] }, model: Clientes, as: 'idClienteEmisores', include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }] },
      { attributes: { exclude: ['idCiudad'] }, model: Clientes, as: 'idClienteReceptores', include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }] }
      ]
    })
    res.json(giro)
  } catch (error) {
    res.json(error)
  }
}


export async function getGiroFindByCcReceptor(req, res) {
  try {
    const { cc } = req.params        
    const giros = await Giros.findAll({      
      attributes: { exclude: ['idCiudadEmisor', 'idCiudadReceptor', 'idClienteEmisor', 'idClienteReceptor'] },
      include: [{
        attributes: { exclude: ['idDepartamento'] },
        model: Ciudades, as: 'idCiudadEmisora',
        include: [{ model: Departamentos, as: 'idDepartamentos' }]
      }, { attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudadReceptora', include: [{ model: Departamentos, as: 'idDepartamentos' }] },
      { attributes: { exclude: ['idCiudad'] }, model: Clientes, as: 'idClienteEmisores' , include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }] },
      { attributes: { exclude: ['idCiudad'] }, model: Clientes, as: 'idClienteReceptores',  where:{numeroDocumento: cc}, include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }] }
      ]
    })
    if(giros.length > 0){
      res.json({giros, message: 'Search success giro'})
    }else{
      res.status(404).json({giros, message: 'Giro not found'})
    }
    
  } catch (error) {
    res.status(500).json({error, message: error.message})
  }
}


export async function createGiro(req, res) {
  try {
    const { estado, monto, idCiudadEmisor, idCiudadReceptor, idClienteEmisor, idClienteReceptor } = req.body
    const fecha = new Date()
    const resGiro = await Giros.create({
      fecha, estado, monto, idCiudadEmisor, idCiudadReceptor, idClienteEmisor, idClienteReceptor
    }, {
      fields: ['fecha', 'estado', 'monto', 'idCiudadEmisor', 'idCiudadReceptor', 'idClienteEmisor', 'idClienteReceptor']
    })

    const giro = await Giros.findOne({
      where: { id: resGiro.id },
      attributes: { exclude: ['idCiudadEmisor', 'idCiudadReceptor', 'idClienteEmisor', 'idClienteReceptor'] },
      include: [{
        attributes: { exclude: ['idDepartamento'] },
        model: Ciudades, as: 'idCiudadEmisora',
        include: [{ model: Departamentos, as: 'idDepartamentos' }]
      }, { attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudadReceptora', include: [{ model: Departamentos, as: 'idDepartamentos' }] },
      { attributes: { exclude: ['idCiudad'] }, model: Clientes, as: 'idClienteEmisores', include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }] },
      { attributes: { exclude: ['idCiudad'] }, model: Clientes, as: 'idClienteReceptores', include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }] }
      ]
    })
    res.json({ giro, message: 'Giro Creado' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export async function deleteGiro(req, res) {
  try {
    const { id } = req.params
    const girosCountRow = await Giros.destroy({
      where: { id }
    })
    res.json({ message: 'Giro Eliminado', count: girosCountRow })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export async function updateGiro(req, res) {
  try {
    const { id } = req.params
    const { fecha, estado, monto, idCiudadEmisor, idCiudadReceptor, idClienteEmisor, idClienteReceptor } = req.body
    const girosCountRow = await Giros.update({
      fecha,
      estado,
      monto,
      idCiudadEmisor,
      idCiudadReceptor,
      idClienteEmisor,
      idClienteReceptor
    }, {
      where: { id }
    })
    res.json({ message: 'Giro Actualizado', count: girosCountRow })
  } catch (error) {
    res.json(error)
  }
}

export async function updateEstadoGiro(req, res) {
  const { id } = req.params
  const { estado } = req.body
  try {
    Giros.update({
      estado
    }, {
      where: { id }
    })
    res.json({ message: 'Updated status giro' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}