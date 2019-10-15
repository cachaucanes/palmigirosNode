import Usuarios from '../models/usuarios'
import Perfiles from '../models/perfiles'

export async function getUsuarios(req, res) {
  try {
    const usuarios = await Usuarios.findAll({
      attributes: { exclude: ['idPerfiles'] },
      include: [{ model: Perfiles, as: 'idPerfil' }]
    })
    res.json(usuarios)
  } catch (error) {
    res.json(error)
  }
}

export async function getOneUsuario(req, res) {
  try {
    const { id } = req.params
    const usuario = await Usuarios.findOne({
      where: { id },
      attributes: { exclude: ['idPerfiles'] },
      include: [{ model: Perfiles, as: 'idPerfil' }]
    })
    res.json(usuario)
  } catch (error) {
    res.json(error)
  }
}


export async function createUsuario(req, res) {
  try {
    const { nombres, apellidos, num_documento, email, direccion, telefono, movil, password, activo, idPerfiles } = req.body;
    const usuario = await Usuarios.create({
      nombres,
      apellidos,
      num_documento,
      email,
      direccion,
      telefono,
      movil,
      password,
      activo,
      idPerfiles
    }, {
      fields: ['nombres', 'apellidos', 'num_documento', 'email', 'direccion', 'telefono', 'movil', 'password', 'activo', 'idPerfiles']
    })
    console.log(usuario.id)
    res.json({ message: 'Usuario creado', user: usuario })

  } catch (error) {
    res.json(error)
  }

}