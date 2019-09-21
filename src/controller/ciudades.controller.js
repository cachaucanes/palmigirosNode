import Ciudades from '../models/ciudades'
import Departamentos from '../models/departamentos'

export async function getCiudades(req, res) {
  try {
    console.log('Controller')
    const ciudades = await Ciudades.findAll({
      attributes: {
        exclude: ['idDepartamento']
      },
      include: [{ model: Departamentos, as: 'idDepartamentos' }],
      order: [
        ['id', 'DESC']
      ]
    })
    res.json(ciudades)
  } catch (error) {
    res.status(500).json({
      message: error,
      data: {}
    })
  }
}

export async function getOneCiudades(req, res) {
  try {
    const { id } = req.params
    const ciudades = await Ciudades.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['idDepartamento']
      },
      include: [{ model: Departamentos, as: 'idDepartamentos' }]
    })
    res.json(ciudades)
  } catch (error) {
    res.json(error)
  }
}

export async function createCiudades(req, res) {
  try {
    const { ciudad, idDepartamento } = req.body
    const newCiudad = await Ciudades.create({
      ciudad,
      idDepartamento
    }, {
      fields: ['ciudad', 'idDepartamento']
    })
    res.json({ message: 'Ciudad Creada' })
  } catch (error) {
    res.json(error)
  }
}

export async function deleteCiudad(req, res) {
  try {
    const { id } = req.params
    const deleteRowCount = await Ciudades.destroy({
      where: {
        id
      }
    })
    res.json({
      message: 'Ciudad Eliminada',
      counts: deleteRowCount
    })
  } catch (error) {
    res.json(error)
  }
}

export async function updateCiudad(req, res) {
  try {
    const { id } = req.params
    const { idDepartamento, ciudad } = req.body//campos a actualizar
    const getCiudad = await Ciudades.findOne({ //Diferente metodo de busca
      //attributes: ['id', 'ciudad', 'idDepartamento'], //los datos que quiero obtener de esta consulta
      where: {
        id
      }
    })

    const ciudadUpdated = await Ciudades.update({
      idDepartamento,
      ciudad
    },
      {
        where: { id }
      })
    res.json({ message: 'Ciudad Updated', data: ciudadUpdated })
  } catch (error) {
    res.json(error)
  }
}
