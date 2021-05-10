import express from 'express';
import { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje} from '../controllers/paginasController.js';
import {guardarTestimonial} from '../controllers/testimonialController.js';
// Estamos utilizando la misma instacia de express
// Con Router la extendemos
const router = express.Router();

// Que hace el signo diagonal (la página principal)
// En el callback (Arrow Function). Express utiliza 3 valores
// request(lo que envio) respond(Express responde) next
router.get('/', paginaInicio);
  
router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimoniales', paginaTestimoniales);

router.post('/testimoniales', guardarTestimonial);

export default router;// importar en index.js principal