import Sequelize from 'sequelize'
import { sequelize } from '../database'

const Perfiles = sequelize.define('perfiles', {
  idPerfiles: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export default Perfiles;