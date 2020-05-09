import passport from 'passport'
import { Strategy } from 'passport-local'

import Usuarios from '../models/usuarios'
import { matchPassword } from '../controller/usuarios.controller'

passport.use(new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await Usuarios.findOne({
      where: {
        email
      }
    })
    if (user) {
      if (await matchPassword(password, user.password)) {        
        
        const {id, nombres,apellidos,idPerfiles} = user
        const userSession = Object.assign({id, nombres, apellidos, idPerfiles})
        return done(null, user, { message: 'Success Login', user: userSession })
      } else {
        return done(null, null, { message: 'Not match pass' })
      }
    }
    else {
      return done(null, null, { message: 'user not found' })
    }
  } catch (error) {
    return done(error, null)
  }
}))

passport.serializeUser((user, done) => {
  const {id, nombres,apellidos, idPerfiles} = user
  const userSession = Object.assign({id, nombres, apellidos, idPerfiles})
  done(null, userSession)
})

passport.deserializeUser(async (id, done) => {
  const data = await Usuarios.findOne({
    where: { id: id.id }
  })
  if (data) {
    return done(null, data.id)
  }
  return done(null, false)


  /*  await Usuarios.findOne({where: {id}}),(err,user)=> {
     console.log("Descerializado",  user);
     
    done(err, user);
  }  */
});





