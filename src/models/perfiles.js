import Sequelize from 'sequelize'
import { sequelize } from '../database'
import Usuarios from './usuarios'
import Permisos from './permisos'
import Perfiles_has_permisos from './perfiles_has_permisos'

const Perfiles = sequelize.define('perfiles', {
  id: {
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

Perfiles.hasMany(Usuarios, {foreignKey: 'idPerfiles', sourceKey: 'id'})
Usuarios.belongsTo(Perfiles, { as: 'idPerfil', foreignKey: 'idPerfiles', sourceKey: 'id'})

//Aquí
Perfiles.belongsToMany(Permisos, {timestamps:  false, through: 'perfiles_has_permisos', foreignKey: 'perfilesId',  uniqueKey: 'my_custom_unique'})
Permisos.belongsToMany(Perfiles, {timestamps: false, through: 'perfiles_has_permisos', foreignKey: 'permisosId',  uniqueKey: 'my_custom_unique'})

export default Perfiles;