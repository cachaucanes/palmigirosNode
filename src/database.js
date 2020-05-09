import Sequelize from 'sequelize'
export const sequelize = new Sequelize(
  'palmigirosnode',
  'root',
  process.env.PASS_DB, /* contraseñaDb from variable de entorno */
  {
    host: process.env.HOST_DB, /* hostDB from variable de entorno */
    dialect: 'mysql',
    pool:{
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    },
    logging: false
  }

)

