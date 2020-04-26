import express, { json } from 'express' //npm i @babel/node -D 
import morgan from 'morgan'
import path from 'path'
import cors from 'cors' //Comunicacion entre servidores

//import Routes
import departamentosRoutes from './routes/departamentos'
import ciudadesRoutes from './routes/ciudades'
import clientesRoutes from './routes/clientes'
import girosRoutes from './routes/giros'
import perfilesRoutes from './routes/perfiles'
import usuariosRoutes from './routes/usuarios'
import permisosRoutes from './routes/permisos'
import loginRoutes from './routes/login'

const app = express();

app.set('port', process.env.PORT || 4000)

//midlleware
app.use(cors())
app.use(morgan('dev'));
app.use(json());

//Golbal variables
app.use((req, res, next) => {

  next()
})

//Routes
/* app.use("/", (req, res) => {
  res.send("<h1 style='font-size: 40px;text-align:center;margin-top: 7em'>HELLO WORLD!!</h1>")
}) */
app.use("/api/departamentos", departamentosRoutes)
app.use("/api/ciudades", ciudadesRoutes)
app.use("/api/clientes", clientesRoutes)
app.use("/api/giros", girosRoutes)
app.use("/api/perfiles", perfilesRoutes)
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/permisos", permisosRoutes)
app.use("/api/login", loginRoutes)
//public
app.use(express.static(path.join(__dirname, 'public')))


//starting server
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'))
})
