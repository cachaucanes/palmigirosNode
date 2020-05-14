import Usuarios from '../models/usuarios'
import passport from 'passport'

export async function login(req, res, next) {
  const {email, password} = req.body
  if(!email || !password){
    return res.status(404).json({message: "Ingrese email y password"})
  }
  
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.json(info)
    }
    if (!user) {
      return res.status(404).json(info)
    }
    req.logIn(user, (err) => {
      if (!err) {
        console.log("Infooo", info, req.session.passport.user);
        return res.status(200).json(info)
      } else {
        return res.json(info)
      }
    })

  })(req, res, next)
}

export async function logout(req, res) {
  console.log("entro aqui");
  /* req.logOut(); */
  req.logout()
  /* req.session.destroy() */
  console.log("Termino Session", req.session);
  res.status(200).json({ message: 'Logout success' })
}