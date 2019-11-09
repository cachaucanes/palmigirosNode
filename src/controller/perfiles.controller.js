import Perfiles from '../models/perfiles'
import Permisos from '../models/permisos'

export async function getPerfiles(req, res) {
  try {
    const perfiles = await Perfiles.findAll({
      /* attributes: ['idPerfiles', 'descripcion'], */
      include: [{ model: Permisos }]
    })
    res.json(perfiles)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

export async function getOnePerfil(req, res) {
  try {
    const { idPerfiles } = req.params
    const perfil = await Perfiles.findOne({
      attributes: ['id', 'descripcion'],
      where: { id: idPerfiles },
      include: [{ model: Permisos }]
    })
    if (!perfil) {
      res.status(404).json({ message: 'Not Found' })
      return 0
    }
    res.json(perfil)
  } catch (error) {
    res.json(error)
  }
}

export async function createPerfil(req, res) {
  try {
    const { id, descripcion } = req.body
    const perfil = await Perfiles.create({
      id,
      descripcion
    }, {
      fields: ['id', 'descripcion']
    })
    res.json({ message: 'Perfil creado', created: perfil })
  } catch (error) {
    res.json(error)
  }
}

export async function deletePerfil(req, res) {
  try {
    const { idPerfiles } = req.params
    const deleteRows = await Perfiles.destroy({
      where: { id: idPerfiles }
    })
    if (!deleteRows) {
      res.status(404).json({ message: 'Not Found' })
      return 0
    }
    res.json({ message: 'Perfil deleted', rows: deleteRows })
  } catch (error) {
    res.json(error)
  }
}

export async function updatePerfil(req, res) {
  try {
    const { idPerfil } = req.params
    const { id, descripcion } = req.body

    const perfilSearch = await Perfiles.findOne({
      where: { id: idPerfil }
    })

    if (!perfilSearch) {
      res.status(404).json({ message: 'Profile not found' })
      return 0
    }
    const perfil = await Perfiles.update({
      id,
      descripcion
    }, {
      where: { id: idPerfil }
    })
    if (perfil < 1) {
      res.status(404).json({ message: 'Not Update' })
      return 0
    }
    res.json({ message: 'Perfil updated', rowUpdate: perfil })
  } catch (error) {
    res.json(error)
  }
}
//PerfilesHasPermisos (BelongsToMany)
export async function postPermisos(req, res) {
  try {
    const { idPerfil, idPermiso } = req.body
    const perfil = await Perfiles.findOne({
      where: { id: idPerfil }
    })
    if (!perfil) {
      res.json({ message: 'Perfil not found' })
      return 0
    }

    const permiso = await Permisos.findOne({
      where: { id: idPermiso }
    })
    if (!permiso) {
      res.json({ message: 'Permiso not found' })
      return 0
    }

    const permisosAdd = await perfil.addPermisos(permiso)

    res.json({ message: "Permisos agregados al perfil", permisosAdd })
  } catch (error) {
    res.json(error)
  }
}

export async function deletePermisos(req, res) {
  //Para enviar con metodo post
  /* const {idPerfil, idPermiso} = req.body */
  try {
    //por metodo Delete
    const { idPerfil, idPermiso } = req.params

    const perfil = await Perfiles.findOne({
      where: { id: idPerfil }
    })
    if (!perfil) {
      res.json({ message: 'Perfil not found' })
      return 0
    }
    const permisoRemoved = await perfil.removePermisos(idPermiso)
    res.json({ message: 'Permiso removido', permisoRemoved })
  } catch (error) {
    res.json(error)
  }
}