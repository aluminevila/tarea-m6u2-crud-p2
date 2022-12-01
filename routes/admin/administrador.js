var express = require('express');
var router = express.Router();
var administradorModel = require('../../models/administradorModel');


/* listar */
router.get('/', async function(req, res, next) {

  var administrador = await administradorModel.getServicios();

  res.render('admin/administrador', { //login.hbs
    layout: 'admin/layout', //layout.hbs
    persona: req.session.nombre,
    administrador
  });
});

//agregar
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  }) // cierra render
}); // cierra get

//insertar la novedad
router.post('/agregar', async (req, res, next) => {
  try {
    console.log(req.body) //opcional para ver si se comunican
    if (req. body.titulo != "" && req.body.descripcion != "") {
      await administradorModel.insertServicio(req.body);
      res.redirect('/admin/administrador')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se ha podido cargar el servicio'
    })
  }
})

//eliminar:
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await administradorModel.deleteServiciosById(id);
  res.redirect('/admin/administrador');
}); // cierra get eliminar

//modificar la vista > formulario y los datos cargados
router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  // console.log(req.params.id);
  var servicio = await administradorModel.getServicioById(id);


  res.render('admin/modificar', {
    layout: 'admin/layout',
    servicio
  })
}); 

//actualizar

router.post('/modificar', async (req, res, next) => {
  try {

    var obj = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion
    }
    // console.log(obj)

    await administradorModel.modificarServicioById(obj, req.body.id);
    res.redirect('/admin/administrador');
  }
  catch (error) {
    // console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true, 
      message: 'No se ha podido modificar la novedad'
    })
  }
})

module.exports = router;