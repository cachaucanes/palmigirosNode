import Perfiles from '../models/perfiles'
import Permisos from '../models/permisos'

export async function getPerfiles(req, res) {
  try {
    const perfiles = await Perfiles.findAll({
      /* attributes: ['idPerfiles', 'descripcion'], */
      include: [{ model: Permisos }]
    })
    res.json({ perfiles, message: 'Search success' })
  } catch (error) {
    res.json(error)
  }
}

export async function getOnePerfil(req, res) {
  try {
    const { idPerfiles } = req.params
    const perfil = await Perfiles.findOne({
      attributes: ['id', 'descripcion'],
      where: { id: idPerfiles },
      /* include: [{ model: Permisos }] */
    })
    if (!perfil) {
      res.status(404).json({ message: 'Not Found' })
      return 0
    }
    res.json({ perfil, message: 'Success search Profile' })
  } catch (error) {
    res.status(500).json(error)
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
    res.json({ message: 'Perfil creado', perfil })
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
    res.status(500).json(error)
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
      res.status(404).json({ message: 'Profile exist' })
      return 0
    }
    const perfil = await Perfiles.update({
      id,
      descripcion
    }, {
      where: { id: idPerfil }
    })
    console.log(perfil);

    if (perfil > 0) {
      res.json({ message: 'Perfil updated' })
    }
    else {
      res.status(404).json({ message: 'Profile Not Update' })
    }

  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}



//PerfilesHasPermisos (BelongsToMany)
export async function postPermisos(req, res) {
  try {
    const { idPerfil, permisos } = req.body
    let permisosAdd = []
    const perfil = await Perfiles.findOne({
      where: { id: idPerfil }
    })
    if (!perfil) {
      res.json({ message: 'Perfil not found' })
      return 0
    }
    if (permisos.length > 0) {
      permisos.map(async permiso => {
        const permisoFind = await Permisos.findOne({
          where: { id: permiso.id }
        })
        if (permisoFind) {
          try {
            const permisoAdd = await perfil.addPermisos(permisoFind)
            if (permisoAdd) {
              permisosAdd.push(permiso.id)
              if (permisosAdd.length === permisos.length) {

                const dateUpdatePerfil = await Perfiles.findOne({
                  where: { id: idPerfil },
                  include: [{ model: Permisos }]
                })
                res.json({ perfil: dateUpdatePerfil, message: `${permisosAdd.length} ${permisosAdd.length > 1 ? 'Permisos' : 'Permiso'} agregados al perfil` })
              }
            } else {
              if (permisosAdd.length === permisos.length) {
                const dateUpdatePerfil = await Perfiles.findOne({
                  where: { id: idPerfil },
                  include: [{ model: Permisos }]
                })
                res.json({ perfil: dateUpdatePerfil, message: `${permisosAdd.length} ${permisosAdd.length > 1 ? 'Permisos' : 'Permiso'} agregados al perfil` })
              }
            }
          } catch (error) {
            res.json(error)
          }
        } else {
          res.json({ message: 'Permiso not found' })
        }
      })
    }
  } catch (error) {
    res.json(error)
  }
}

export async function deletePermisos(req, res) {

  //Para enviar con metodo post
  const { idPerfil, permisos } = req.body
  let permisosDeleted = []
  try {
    const perfil = await Perfiles.findOne({
      where: { id: idPerfil }
    })
    if (perfil) {
      permisos.map(async permiso => {
        try {
          const permisoRemoved = await perfil.removePermisos(permiso.id)
          if (permisoRemoved) {
            permisosDeleted.push(permiso.id)
            if (permisosDeleted.length === permisos.length) {
              const permisosUpdate = await Perfiles.findOne({
                where: { id: idPerfil },
                include: [{ model: Permisos }]
              })
              res.json({ perfil: permisosUpdate, message: `${permisosDeleted.length} ${permisosDeleted.length > 1 ? 'Permisos Eliminados' : 'Permiso eliminado'}` })
            }
          } else {
            if (permisosDeleted.length === permisos.length) {
              const permisosUpdate = await Perfiles.findOne({
                where: { id: idPerfil },
                include: [{ model: Permisos }]
              })
              res.json({ perfil: permisosUpdate, message: `${permisosDeleted.length} ${permisosDeleted.length > 1 ? 'Permisos Eliminados' : 'Permiso eliminado'}` })
            }
          }
        } catch (error) {
          res.json(error)
        }
      })
    } else {
      res.status(404).json({ message: 'Perfil not found' })
    }
  } catch (error) {
    res.json(error)
  }
}