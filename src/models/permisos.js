import Sequelize from 'sequelize'
import { sequelize } from '../database'

const Permisos = sequelize.define('permisos', {
  idPermisos : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false
  },
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tabla: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  timestamps: false
})

export default Permisos