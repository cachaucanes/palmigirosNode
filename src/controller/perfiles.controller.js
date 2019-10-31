import Perfiles from '../models/perfiles'
import Permisos from '../models/permisos'

export async function getPerfiles(req, res) {
  try {
    const perfiles = await Perfiles.findAll({
      /* attributes: ['idPerfiles', 'descripcion'], */
      include: [{model: Permisos}]      
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
      attributes: ['idPerfiles', 'descripcion'],
      where: { idPerfiles },

    })
    res.json(perfil)
  } catch (error) {
    res.json(error)
  }
}

export async function createPerfil(req, res) {
  try {
    const { idPerfiles, descripcion } = req.body
    const perfil = await Perfiles.create({
      idPerfiles,
      descripcion
    }, {
      fields: ['idPerfiles', 'descripcion']
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
      where: { idPerfiles }
    })
    res.json({ message: 'Perfil deleted', rows: deleteRows })
  } catch (error) {
    res.json(error)
  }
}

export async function updatePerfil(req, res) {
  try {

    const { id } = req.params
    const { idPerfiles, descripcion } = req.body

    const perfilSearch = await Perfiles.findOne({
      where: { idPerfiles: id }
    })

    if (!perfilSearch) {      
      res.status(404).json({ message: 'Profile not found' })
      return 0
    }
    const perfil = await Perfiles.update({
      idPerfiles,
      descripcion
    }, {
      where: { idPerfiles: id }
    })
    res.json({ message: 'Perfil updated', rowUpdate: perfil })
  } catch (error) {
    res.json(error)
  }
}