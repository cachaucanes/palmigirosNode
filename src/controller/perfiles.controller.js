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
      attributes: ['id', 'descripcion'],
      where: { id: idPerfiles },
      include: [{model: Permisos}]
    })
    if(!perfil){
      res.status(404).json({message: 'Not Found'})
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
    if(!deleteRows){
      res.status(404).json({message: 'Not Found'})
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
    if(perfil < 1){
      res.status(404).json({message: 'Not Update'})
      return 0
    }
    res.json({ message: 'Perfil updated', rowUpdate: perfil })
  } catch (error) {
    res.json(error)
  }
}