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
  try {
    let newDepartamento = await Departamento.create({
      departamento,
      created_at
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
    res.status(500).json({
      message: 'Somethin goes wrong',
      data: {}
    })
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
  const deleteRowCount = await Departamento.destroy({
    where: {
      id
    }
  })
  res.json({
    message: 'Delete Departament',
    count: deleteRowCount
  })
}

export async function updateDepartamento(req, res) {
  const { id } = req.params
  const { departamento, created_at } = req.body

  const departamentos = await Departamento.findAll({
    attributes: ['id', 'departamento', 'created_at'], //los datos que quiero obtener de esta consulta
    where: {
      id
    }
  })

  if (departamentos.length > 0) {
    departamentos.forEach(async departamentos => {
      await departamentos.update({
        departamento,
        created_at
      })
    })
  }

  res.json({
    message: 'Departament update',
    data: departamentos
  })
}

