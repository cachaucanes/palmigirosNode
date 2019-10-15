import Sequelize from 'sequelize'
import { sequelize } from '../database'
import Perfiles from './perfiles'

const Usuarios = sequelize.define('usuarios', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombres: {
    type: Sequelize.STRING,
    allowNull: false    
  },
  apellidos: {
    type: Sequelize.STRING,
    allowNull: false
  },
  num_documento: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  direccion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: false
  },
  movil: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  activo: {
    type: Sequelize.BOOLEAN    
  },
  idPerfiles: {
    type: Sequelize.STRING,
    references: {
      model: Perfiles,
      key: 'idPerfiles',
      as: 'idPerfil'
    }
  }
},{
  timestamps: false
})

export default Usuarios