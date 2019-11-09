import Permisos from '../models/permisos'
import Perfiles from '../models/perfiles'

export async function getPermisos(req, res) {
  try {
    const permisos = await Permisos.findAll({
      /* include: {model: Perfiles, as: 'idPerfil'} */
      /* include: [{
        model: Perfiles, as: 'idPerfil'        
      }] */
    })
    res.json(permisos)
  } catch (error) {
    res.json(error)
  }
}

export async function getOnePermisos(req, res) {
  try {
    const { id } = req.params
    const permisos = await Permisos.findOne({
      where: { id }
    })
    if (permisos == null) {
      res.status(404).json({ message: 'Not Found' })
      return 0
    }
    res.json(permisos)
  } catch (error) {
    res.json(error)
  }
}

export async function createPermisos(req, res) {
  try {
    const { id, descripcion, tabla } = req.body
    const permisos = await Permisos.create({
      id,
      descripcion,
      tabla
    }, {
      fields: ["id", "descripcion", "tabla"]
    })
    res.json({ message: 'Created Perfil', permisos })
  } catch (error) {
    res.json(error)
  }
}

export async function deletePermisos(req, res) {
  try {
    const { idPermisos } = req.params
    const rowPermisos = await Permisos.destroy({
      where: { id: idPermisos}
    })
    if (rowPermisos < 1) {
      res.status(404).json({ message: 'Not Found' })
      return 0
    }
    res.json({ message: 'Deleted Permiso', rowPermisos })
  } catch (error) {
    res.json(error)
  }
}

export async function updatePermisos(req, res) {
  try {
    const { idPermisos } = req.params
    const { id, descripcion, tabla } = req.body
    const searchPermiso = await Permisos.findOne({
      where: { id: idPermisos }
    })
    if (!searchPermiso) {
      res.status(404).json({ message: 'Not Found' })
      return 0
    }
    const updatePermiso = await Permisos.update({
      id,
      descripcion,
      tabla
    }, {
      where: { id: idPermisos }
    })
    res.json({ message: 'Updated Permiso', updatePermiso })
  } catch (error) {
    res.json(error)
  }
}