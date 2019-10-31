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
      where: { idPermisos: id }
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
    const { idPermisos, descripcion, tabla } = req.body
    const permisos = await Permisos.create({
      idPermisos,
      descripcion,
      tabla
    }, {
      fields: ["idPermisos", "descripcion", "tabla"]
    })
    res.json({ message: 'Created Perfil', permisos })
  } catch (error) {
    res.json(error)
  }
}

export async function deletePermisos(req, res) {
  try {
    const { id } = req.params
    const rowPermisos = await Permisos.destroy({
      where: { idPermisos: id }
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
    const { id } = req.params
    const { idPermisos, descripcion, tabla } = req.body
    const searchPermiso = await Permisos.findOne({
      where: { idPermisos: id }
    })
    if (!searchPermiso) {
      res.status(404).json({ message: 'Not Found' })
      return 0
    }
    const updatePermiso = await Permisos.update({
      idPermisos,
      descripcion,
      tabla
    }, {
      where: { idPermisos: id }
    })
    res.json({ message: 'Updated Permiso', updatePermiso })
  } catch (error) {
    res.json(error)
  }
}