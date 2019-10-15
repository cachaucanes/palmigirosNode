import express, { json } from 'express' //npm i @babel/node -D 
import morgan from 'morgan'
import path from 'path'

//import Routes
import departamentosRoutes from './routes/departamentos'
import ciudadesRoutes from './routes/ciudades'
import clientesRoutes from './routes/clientes'
import girosRoutes from './routes/giros'
import perfilesRoutes from './routes/perfiles'
import usuariosRoutes from './routes/usuarios'

const app = express();

app.set('port', process.env.PORT || 3000)

//midlleware
app.use(morgan('dev'));
app.use(json());

//Golbal variables
app.use((req, res, next) => {

  next()
})

//Routes
app.use("/api/departamentos", departamentosRoutes)
app.use("/api/ciudades", ciudadesRoutes)
app.use("/api/clientes", clientesRoutes)
app.use("/api/giros", girosRoutes)
app.use("/api/perfiles", perfilesRoutes)
app.use("/api/usuarios", usuariosRoutes)

//public
app.use(express.static(path.join(__dirname, 'public')))


//starting server
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'))
})
