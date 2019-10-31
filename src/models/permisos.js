import Sequelize from 'sequelize'
import { sequelize } from '../database'

import Perfiles_has_permisos from './perfiles_has_permisos'
import Perfiles from './perfiles'

const Permisos = sequelize.define('permisos', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  descripcion: {
    type: Sequelize.STRING
  },
  tabla: {
    type: Sequelize.STRING
  }
},{
  timestamps: false
})

export default Permisos;

