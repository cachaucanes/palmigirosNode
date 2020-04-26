import Usuarios from '../models/usuarios'
import Perfiles from '../models/perfiles'
import bcrypt from 'bcryptjs'
 
export async function getUsuarios(req, res) {
  try {
    const usuarios = await Usuarios.findAll({
      attributes: { exclude: ['idPerfiles'] },
      include: [{ model: Perfiles, as: 'idPerfil' }]
    })
    res.json({ message: 'Search Success', usuarios })
  } catch (error) {
    res.status(500).json(error)
  }
}

export async function getOneUsuario(req, res) {
  try {
    const { id } = req.params
    const user = await Usuarios.findOne({
      where: { id },
      attributes: { exclude: ['idPerfiles'] },
      include: [{ model: Perfiles, as: 'idPerfil' }]
    })
    if (user) {
      res.json({ message: 'Search Succes', user })
    } else {
      res.status(404).json({ message: 'User Not Found', user: {} })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

async function encrypPassword (password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export async function matchPassword(password, passwordBd){    
  return await bcrypt.compare(password, passwordBd)
}

export async function createUsuario(req, res) {
  try {
    const { nombres, apellidos, num_documento, email, direccion, telefono, movil, password, activo, idPerfiles } = req.body;
    const userfindCC = await Usuarios.findOne({ //verificar unique num_documento
      where: {
        num_documento
      },
      attributes: { exclude: ['id', 'nombres', 'apellidos', 'idPerfiles', 'telefono', 'movil', 'password', 'activo', 'direccion'] },
    })
    if (userfindCC) {
      return res.status(404).json({ message: 'The num_Documento is already registered', user: {} })
    }

    const userfindEmail = await Usuarios.findOne({ //verificar unique email
      where: {
        email
      },
      attributes: { exclude: ['id', 'nombres', 'apellidos', 'idPerfiles', 'telefono', 'movil', 'password', 'activo', 'direccion'] },
    })

    if (userfindEmail) {
      return res.status(404).json({ message: 'The email is already registered', user: {} })
    }
    const newPassword = await encrypPassword(password)
    console.log(newPassword);
      
    const newuser = await Usuarios.create({
      nombres,
      apellidos,
      num_documento,
      email,
      direccion,
      telefono,
      movil,
      password: newPassword,
      activo,
      idPerfiles
    }, {
      fields: ['nombres', 'apellidos', 'num_documento', 'email', 'direccion', 'telefono', 'movil', 'password', 'activo', 'idPerfiles']
    })    
    const user = await Usuarios.findOne({
      where: { id: newuser.id },
      attributes: { exclude: ['idPerfiles'] },
      include: [{ model: Perfiles, as: 'idPerfil' }]
    })
    res.json({ message: 'Usuario creado', user })

  } catch (error) {
    res.status(500).json(error)
  }
}

export async function deleteUsuario(req, res) {
  try {
    const { id } = req.params
    const countRowUser = await Usuarios.destroy({
      where: { id }
    })

    console.log(countRowUser);

    if (countRowUser) {
      res.json({ message: 'Deleted Usuario' })
    } else {
      res.status(404).json({ message: 'Not Found' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export async function updateUsuario(req, res) {
  try {
    const { id } = req.params
    const { nombres, apellidos, num_documento, email, direccion, telefono, movil, password, activo, idPerfiles } = req.body
    const searchUser = await Usuarios.findOne({
      where: { id }
    })
    if (!searchUser) {
      res.status(404).json({ message: 'Not Found' })
      return 0
    }
    const countUserRow = await Usuarios.update({
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
      where: { id }
    })
    res.json({ message: 'Updated User', countUserRow })
  } catch (error) {
    res.json(error)
  }
}