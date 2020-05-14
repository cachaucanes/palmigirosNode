import { Router } from 'express'
import Perfiles from '../models/perfiles';
import Permisos from '../models/permisos';

const router = Router()

/* Middleware para acceder a las rutas */
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized, log in to get started' })
}

/* Retornar datos del usuaio en session, cuando recargue la pagina en el frontend */
export const dataSessionUser = router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Session usando", req.session);
    res.json({ user: req.session.passport.user })
  }
})

/* Verificar si el perfil tiene los permisos*/
export const havePermissions = (permiso) => async (req, res, next) => {
  try {
    const perfil = await Perfiles.findOne({
      attributes: ['id', 'descripcion'],
      where: { id: req.session.passport.user.idPerfiles },
      include: [{ model: Permisos }]
    })
    if (!perfil) {
      res.status(404).json({ message: 'Profile Not Found' })
    }
    const access = perfil.permisos.filter(perfil => (perfil.perfiles_has_permisos.permisosId === permiso))
    if (access.length > 0) {
      return next()
    }
    else {
      console.log("Unauthorized, Permission not found");      
      res.status(404).json({ message: 'Unauthorized, Permission not found' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
