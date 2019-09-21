import Giros from '../models/giros'
import Ciudades from '../models/ciudades'
import Departamentos from '../models/departamentos'
import Clientes from '../models/clientes'

export async function getGiros(req, res) {
  try {
    const giros = await Giros.findAll({
      /* attributes: { exclude: ['idCiudadEmisor', 'idCiudadReceptor', 'idClienteEmisor', 'idClienteReceptor'] }, */
      include: [{
        attributes: { exclude: ['idDepartamento'] },
        model: Ciudades, as: 'idCiudadEmisora',
        include: [{ model: Departamentos, as: 'idDepartamentos' }]
      }, { attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudadReceptora', include: [{ model: Departamentos, as: 'idDepartamentos' }] },
      { attributes: { exclude: ['idCiudad'] }, model: Clientes, as: 'idClienteEmisores', include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }] },
      { attributes: { exclude: ['idCiudad'] }, model: Clientes, as: 'idClienteReceptores', include: [{ attributes: { exclude: ['idDepartamento'] }, model: Ciudades, as: 'idCiudades', include: [{ model: Departamentos, as: 'idDepartamentos' }] }] }
      ]
    })
    res.json(giros)
  } catch (error) {
    res.json(error)
  }
}

export async function getOneGiro(req, res) {
  try {
    const { id } = req.params
    const giro = await Giros.findOne({
      where: { id },
      /* attributes: { exclude: ['idCiudadEmisor', 'idCiudadReceptor', 'idClienteEmisor', 'idClienteReceptor'] }, */
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

export async function createGiro(req, res) {
  try {
    const { fecha, estado, monto, idCiudadEmisor, idCiudadReceptor, idClienteEmisor, idClienteReceptor } = req.body
    await Giros.create({
      fecha, estado, monto, idCiudadEmisor, idCiudadReceptor, idClienteEmisor, idClienteReceptor
    }, {
      fields: ['fecha', 'estado', 'monto', 'idCiudadEmisor', 'idCiudadReceptor', 'idClienteEmisor', 'idClienteReceptor']
    })
    res.json({ message: 'Giro Creado' })
  } catch (error) {
    res.json(error)
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
    res.json(error)
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