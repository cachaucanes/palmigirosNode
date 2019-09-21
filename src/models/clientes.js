import Sequelize from 'sequelize'
import { sequelize } from '../database'

import Ciudades from './ciudades'
import Giros from './giros'

const Clientes = sequelize.define('clientes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numeroDocumento: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nombres: {
    type: Sequelize.STRING,
    allowNull: false
  },
  apellidos: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefono: {
    type: Sequelize.STRING,
  },
  idCiudad: {
    type: Sequelize.INTEGER,
    references: {
      model: Ciudades,
      key: 'id',
      as: 'idCiudad'
    }
  }
}, {
  timestamps: false
})
/* Relaciones */
//ClieteEmisor y Giros N:M
Clientes.hasMany(Giros, { foreignKey: 'idClienteEmisor', sourceKey: 'id' })
Giros.belongsTo(Clientes, { as: 'idClienteEmisores', foreignKey: 'idClienteEmisor', sourceKey: 'id' })
//ClienteReceptor y giros N:M
Clientes.hasMany(Giros, { foreignKey: 'idClienteReceptor', sourceKey: 'id' })
Giros.belongsTo(Clientes, { as: 'idClienteReceptores', foreignKey: 'idClienteReceptor', sourceKey: 'id' })
export default Clientes;