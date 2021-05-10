import {Testimonial} from '../models/Testimoniales.js';
const guardarTestimonial = async (req, res) => {
    // body, ver lo que escribe el usuario
    // console.log(req.body)

    // Validar
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    // trim quita los espacios al inicio y al final
    if (nombre.trim() === '') {
        errores.push({mensaje : 'El nombre esta vacio'});
    }
    if (correo.trim() === '') {
        errores.push({mensaje : 'El correo esta vacio'});
    }
    if (mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje esta vacio'});
    }
    // console.log(errores);
    if (errores.length > 0) { 

        // Consultar Testimoniales Existentes  
        const testimoniales = await Testimonial.findAll();
        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Tertimoniales',
            // Object literal enhancement
            errores,
            nombre,
            correo,
            mensaje,
            // Cannot read property 'length' of undefined
            // Poner los testimoniales para que no de error
            testimoniales
        })
    } else {
        // Almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            // Redirigir a la página testimoniales, sino la web
            // quedará buscando
            res.redirect('/testimoniales'); 
        } catch (error) {
            console.log(error);
        }
    }
}

export { 
    // un objeto en caso de agregar más funciones
    guardarTestimonial
}