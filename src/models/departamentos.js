import Sequelize from 'sequelize' //Funciones del modulo
import { sequelize } from '../database' //Coneccion

import Ciudades from './ciudades' //Equema para relacion 

const Departamentos = sequelize.define('departamentos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },  
  departamento:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  created_at: {
    type: Sequelize.DATE
  }
},{
  timestamps: false
});

Departamentos.hasMany(Ciudades, { foreignKey: 'idDepartamento', sourceKey: 'id'});
Ciudades.belongsTo(Departamentos, { as: 'idDepartamentos', foreignKey: 'idDepartamento', sourceKey: 'id'});

export default Departamentos;