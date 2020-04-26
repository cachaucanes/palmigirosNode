import Usuarios from '../models/usuarios'
import { matchPassword } from './usuarios.controller'


export async function login(req, res) {
  const { email, password } = req.body
  const userfindEmail = await Usuarios.findOne({
    where: {
      email
    },
    attributes: { exclude: ['nombres', 'apellidos', 'idPerfiles', 'telefono', 'movil', 'activo', 'direccion'] }
  })
  if (userfindEmail) {
    if (await matchPassword(password, userfindEmail.password)) {
      res.json({ message: 'login succesfull', user: userfindEmail.id })
    } else {
      res.status(404).json({ message: 'Password is no valid', user: {} })
    }
  }
  else {
    res.status(404).json({ message: 'User not found', user: {} })
  }
}

export async function logout(req, res){
  res.json({message: 'received'})
}