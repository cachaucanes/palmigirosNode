import Sequelize from 'sequelize'
import { sequelize } from '../database'
import Usuarios from './usuarios'

const Perfiles = sequelize.define('perfiles', {
  idPerfiles: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  timestamps: false
})

Perfiles.hasMany(Usuarios, {foreignKey: 'idPerfiles', sourceKey: 'idPerfiles'})
Usuarios.belongsTo(Perfiles, { as: 'idPerfil', foreignKey: 'idPerfiles', sourceKey: 'idPerfiles'})

export default Perfiles;