import { Router } from 'express'
import { getCiudades, getOneCiudades, createCiudades, deleteCiudad, updateCiudad } from '../controller/ciudades.controller'
import Perfiles from '../models/perfiles';
import Permisos from '../models/permisos';

const router = Router()

export const havePermissions = async (req, res, next) => {

  try {
    const perfil = await Perfiles.findOne({
      attributes: ['id', 'descripcion'],
      where: { id: req.session.passport.user.idPerfiles },
      include: [{ model: Permisos }]
    })
    if (!perfil) {
      res.status(404).json({ message: 'Profile Not Found' })
    }

    const access = perfil.permisos.filter(perfil => (perfil.perfiles_has_permisos.permisosId === 6))
    if (access.length > 0) {
      return next()
    }
    else {
      res.status(404).json({ message: 'Unauthorized, Permission not found' })
    }

    /* res.status(404).json({ message: 'Unauthorized, Permission not found' })   */
  } catch (error) {
    res.status(500).json(error)
  }
};


router.get('/', havePermissions, getCiudades)
router.get('/:id', getOneCiudades)
router.post('/', createCiudades)
router.delete('/:id', deleteCiudad)
router.put('/:id', updateCiudad)

export default router;