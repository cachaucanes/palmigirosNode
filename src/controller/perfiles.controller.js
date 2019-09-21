import Perfiles from '../models/perfiles'

export async function getPerfiles(req, res){
  try {
    const perfiles = await Perfiles.findAll({
      attributes: ['idPerfiles', 'descripcion']
    })
    res.json(perfiles)
  } catch (error) {
    res.json(error)
  }
}

export async function getOnePerfil(req, res){
  try {
    const {idPerfiles} = req.params
  const perfil = await Perfiles.findOne({
    attributes: ['idPerfiles', 'descripcion'],
    where: { idPerfiles },
    
  })
  res.json(perfil)
  } catch (error) {
    res.json(error)
  }
}