import Departamento from '../models/departamentos'


export async function getDepartamentos(req, res) {
  try {
    const departamentos = await Departamento.findAll()
    res.json(departamentos)
  } catch (error) {
    res.status(500).json({
      message: 'Error',
      data: {}
    })
  }
}

export async function createDepartamento(req, res) {
  const { departamento, created_at } = req.body
  const dates = new Date()
  try {
    let newDepartamento = await Departamento.create({
      departamento,
      created_at: dates
    }, {
      fields: ['departamento', 'created_at']
    });

    if (newDepartamento) {
      res.json({
        message: 'Departamento creado',
        data: newDepartamento
      })
    }
  } catch (error) {
    /* console.log("Mensaje de error", error.message);
    console.log("Mensaje de error Completo", error.errors[0].message); */
    /* res.status(500).json({error, message: error.errors[1].message}) */
    res.status(500).json({ error, message: error.message })
  }
}

export async function getOneDepartamento(req, res) {
  const { id } = req.params
  const departamento = await Departamento.findOne({
    where: {
      id
    }
  })
  res.json(departamento)
}

export async function deleteDepartamento(req, res) {
  const { id } = req.params
  try {
    const deleteRowCount = await Departamento.destroy({
      where: {
        id
      }
    })
    res.json({
      message: 'Department successfully deleted',
      count: deleteRowCount
    })
  } catch (error) {
    res.status(500).json({error, message: error});    
  }
}

/* export async function updateDepartamento(req, res){
  try {
    const {id} = req.params
  const {departamento, created_at } = req.body

  const result = await Departamento.update({
    departamento,
    created_at
  }, {
    where: { id }
  })
  res.json(result)    
  } catch (error) {
    res.json(error)
  }

} */

export async function updateDepartamento(req, res) {

  try {

    const { id } = req.params
    const { departamento, created_at } = req.body

    const departamentos = await Departamento.findAll({
      attributes: ['id', 'departamento', 'created_at'], //los datos que quiero obtener de esta consulta
      where: {
        id
      }
    })

    const department = await Departamento.update({
      departamento,
      created_at
    },
    {
      where: { id }
    })

    /* if (departamentos.length > 0) {
      departamentos.forEach(async departamentos => {
        await departamentos.update({
          departamento,
          created_at
        })
  
      })
      res.json( {message: 'Department Update',departamentos})
    } else {
      res.json({ message: 'Sin cambios' })
    }
   */
    if (department > 0) {
      /* Back to updated city */
      const updateDepartment = await Departamento.findOne({ //Diferente metodo de busca
        //attributes: ['id', 'ciudad', 'idDepartamento'], //los datos que quiero obtener de esta consulta
        where: {
          id
        }
      })
      res.json({ message: 'Department updated', data: updateDepartment })
    }
    else {
      res.json({ message: 'Sin Cambios', data: department })
    }

  } catch (error) {
    res.json(error)
  }
}

