import { Router } from 'express'
import Perfiles from '../models/perfiles';
import Permisos from '../models/permisos';
import Usuarios from '../models/usuarios';

const router = Router()

/* Middleware para acceder a las rutas */
export const isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
    /* console.log("Usando", req.session);
    req.session.passport.user.nombres = 'gil'
    console.log("segundo ", req.session); */

  }
  res.status(401).json({ message: 'Unauthorized, log in to get started' })
}

/* Retornar datos del usuaio en session, cuando recargue la pagina en el frontend */
export const dataSessionUser = router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("DatosSessionAlRecargar ", req.session);
    res.json({ user: req.session.passport.user })
  }
})

/* Verificar si el perfil tiene los permisos*/
export const havePermissions = (idPermiso) => async (req, res, next) => {
  try {
    /*  */
    const userDB = await Usuarios.findOne({
      where: { id: req.session.passport.user.id }
    })
    if (userDB && userDB.idPerfiles === req.session.passport.user.idPerfiles) {
      const perfil = await Perfiles.findOne({
        attributes: ['id', 'descripcion'],
        where: { id: req.session.passport.user.idPerfiles },
        include: [{ model: Permisos }]
      })
      if (!perfil) {
        res.status(404).json({ message: 'Profile Not Found' })
      }
      const access = perfil.permisos.filter(permiso => (permiso.perfiles_has_permisos.permisosId === idPermiso))
      if (access.length > 0) {
        return next()
      }
      else {
        console.log("Unauthorized, Permission not found");
        res.status(404).json({ message: 'Unauthorized, Permission not found' })
      }
    } else {
      req.logout()
      res.status(401).json({ message: '404 Unauthorized, log in to get started' })
    }
    /*  */
  } catch (error) {
    res.status(500).json(error)
  }
}
