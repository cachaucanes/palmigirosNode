import Sequelize from 'sequelize'

import { sequelize } from '../database'
import Departamentos from './departamentos'
import Clientes from './clientes';
import Giros from './giros';

const Ciudades = sequelize.define('ciudades', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  ciudad: {
    type: Sequelize.TEXT
  },
  idDepartamento: {
    type: Sequelize.INTEGER,
    references: {
      model: Departamentos,
      key: 'id',
      as: 'idDepartamento'
    }  
  }
},{
  timestamps: false
});
/* RELACIONES */
//Ciudades y clientes N-M
Ciudades.hasMany(Clientes, {foreignKey: 'idCiudad', sourceKey: 'id'})
Clientes.belongsTo(Ciudades, {as:'idCiudades', foreignKey: 'idCiudad', sourceKey: 'id'})
//Ciudades y giros /* Ciudad Emisora */
Ciudades.hasMany(Giros, {foreignKey: 'idCiudadEmisor', sourceKey: 'id'})
Giros.belongsTo(Ciudades, {as:'idCiudadEmisora', foreignKey: 'idCiudadEmisor', sourceKey: 'id'})
//Ciudades y giros /* Ciudad Receptora */
Ciudades.hasMany(Giros, {foreignKey: 'idCiudadReceptor', sourceKey: 'id'})
Giros.belongsTo(Ciudades, {as:'idCiudadReceptora', foreignKey: 'idCiudadReceptor', sourceKey: 'id'})

export default Ciudades;