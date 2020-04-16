import Sequelize from 'sequelize'
import { sequelize } from '../database'
import Ciudades from './ciudades'
import Clientes from './clientes'

const Giros = sequelize.define('giros',{
  id: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: Sequelize.DATE,
  },
  estado: {
    type: Sequelize.BOOLEAN    
  },
  monto: {
    type: Sequelize.DECIMAL(10,2)
  },
  idCiudadEmisor: {
    type: Sequelize.INTEGER,
    references: {
      model: Ciudades,
      key: 'id',
      as: 'idCiudadEmisor'
    }
  }
  ,
  idCiudadReceptor: {
    type: Sequelize.INTEGER,
    references: {
      model: Ciudades,
      key: 'id',
      as: 'idCiudadReceptor'
    }
  },
  idClienteEmisor: {
    type: Sequelize.INTEGER,
    references: {
      model: Clientes,
      key: 'id',
      as: 'idClienteEmisor'
    }
  },
  idClienteReceptor: {
    type: Sequelize.INTEGER,
    references: {
      model: Clientes,
      key: 'id',
      as: 'idClienteReceptor'
    }
  }
},{
  timestamps: false
})

export default Giros;