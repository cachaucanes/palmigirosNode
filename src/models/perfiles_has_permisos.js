/* import Sequelize from 'sequelize'
import {sequelize} from '../database'
import Permisos from './permisos'
import Perfiles from './perfiles'

const Perfiles_has_permisos = sequelize.define('perfiles_has_permisos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  idPerfiles: {
    type: Sequelize.INTEGER,
    references: {
      model: Perfiles,
      key: 'idPerfiles'
    }
  },
  idPermisos: {
    type: Sequelize.INTEGER,
    references: {
      model: Permisos,
      key: 'idPermisos'
    }
  }
},{
  timestamps: false
})

export default Perfiles_has_permisos */