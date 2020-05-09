import 'dotenv/config'
import '@babel/polyfill' /* evitar error al hacer build */

import express, { json } from 'express' //npm i @babel/node -D 
import morgan from 'morgan'
import path from 'path'
import cors from 'cors' //Comunicacion entre servidores
import session from 'express-session'
import passport from 'passport'

//import Routes
import departamentosRoutes from './routes/departamentos'
import ciudadesRoutes from './routes/ciudades'
import clientesRoutes from './routes/clientes'
import girosRoutes from './routes/giros'
import perfilesRoutes from './routes/perfiles'
import usuariosRoutes from './routes/usuarios'
import permisosRoutes from './routes/permisos'
import loginRoutes from './routes/login'
import authRouter from './routes/auth'

const app = express();

import './config/passport'
import { isAuthenticated } from './auth/auth'

app.set('port', process.env.PORT || 4000)

//midlleware
app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

//Golbal variables
app.use((req, res, next) => {
  next()

})

//Routes
/* app.use("/", (req, res) => {
  res.send("<h1 style='font-size: 40px;text-align:center;margin-top: 7em'>HELLO WORLD!!</h1>")
}) */
app.use("/api/departamentos", isAuthenticated, departamentosRoutes)
app.use("/api/ciudades", isAuthenticated, ciudadesRoutes)
app.use("/api/clientes", isAuthenticated, clientesRoutes)
app.use("/api/giros", isAuthenticated, girosRoutes)
app.use("/api/perfiles", isAuthenticated, perfilesRoutes)
app.use("/api/usuarios", isAuthenticated, usuariosRoutes)
app.use("/api/permisos", isAuthenticated, permisosRoutes)
app.use("/api/login", loginRoutes) //Loguear
app.use("/api/auth", authRouter) //Retornar datos de session si la hay
//public
app.use(express.static(path.join(__dirname, 'public')))


//starting server
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'))
})
