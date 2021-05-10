import { Viaje} from '../models/Viaje.js';
import { Testimonial} from '../models/Testimoniales.js';

const paginaInicio = async (request, respond) => { 

  // Dos consultas ejecutando en paralelo
  const promiseDB = [];
  // limit extrae 3 registros
  promiseDB.push(Viaje.findAll({limit: 3}));//position 0
  promiseDB.push( Testimonial.findAll({limit: 3}))//position 1
// 27. Reutilizando el código de viajes
// Consutlar 3 viajes del modelo viaje
try {
  
  const resultado = await Promise.all(promiseDB);

  // Es un método de Express que retorna en pantalla o a la vista
respond.render('inicio', {
  pagina: 'Inicio',
  // Agregar clase para se vea mejor. Agregar en index.pug
  clase: 'home',
  viajes: resultado[0],
  testimoniales: resultado[1],
  
});    
} catch (error) {
  console.log(error);
}

}

const paginaNosotros = (request, respond) => { 
  // Render espera el nombre de una vista
  respond.render('nosotros', {
    // textoViajes: viajes
    pagina: 'Nosotros'
  }); 
}

const paginaViajes = async (request, respond) => { 

  // 18. Consultar la Base de datos, importar modelo Viaje
  const viajes = await Viaje.findAll();
  console.log(viajes);
  // Render espera el nombre de una vista
  respond.render('viajes', {    
    pagina: 'Próximos Viajes',
    viajes,
  }); 
}

const paginaTestimoniales = async (request, respond) => { 

  try {
    // Consultar el modelo de Testimoniales. 
    // Mostrar los datos de la bbdd
    // findAll retorna un arreglo
    const testimoniales = await Testimonial.findAll();
    // Render espera el nombre de una vista
    respond.render('testimoniales', {   
      pagina: 'Testimoniales',
      testimoniales
  }); 
  
  } catch (error) {
    console.log(error)
  }
 
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
  // console.log(req.params.viaje);
  const { slug } = req.params;
  
  try {
    const viaje = await Viaje.findOne({where : {slug}});

    res.render('viaje', {
      pagina: 'Información Viaje',
      viaje
    })
  } catch (error) {
    console.log(error);
  }
}

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje
}

// Dependencia que permite generar variables de entorno, es decir, tendremos variable para dev local 
// y otras una vez que ya estemos en el servidor de eroku. Va a ser necesario mas que nada para el Deployment. 
// Por ejemplo en la bd localmente son unos y en el servidor serán otros. De esta forma tendremos un entorno 
// local y un entorno de producción
// 