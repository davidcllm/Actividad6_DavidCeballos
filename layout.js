// Esperar a que todo el contenido HTML se haya cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Asignación de los elementos del formulario
    const formulario = document.getElementById('miFormulario');
    const contenedorErrores = document.getElementById('mensajes-error');

    // 2. Evento de envío del formulario
    formulario.addEventListener('submit', function(evento) {
        
        // Prevenir que la página se recargue (envío por defecto) para poder validar
        evento.preventDefault();
        
        // Limpiar errores previos
        contenedorErrores.innerHTML = '';
        contenedorErrores.style.display = 'none';
        
        // Arreglo para guardar todos los mensajes de error encontrados
        let errores = [];

        // 3. Captura de los valores de cada campo
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const edad = document.getElementById('edad').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();
        const fecha = document.getElementById('fecha').value.trim();
        const pais = document.getElementById('pais').value;
        const terminos = document.getElementById('terminos').checked;
        
        // Para botones de radio, buscamos cuál está marcado 
        const generoSeleccionado = document.querySelector('input[name="genero"]:checked');

        // 4. Validaciones de lógica

        // Validación de campos de texto obligatorios
        if (nombre === '') {
            errores.push('El nombre completo es obligatorio.');
        }
        
        if (telefono === '') {
            errores.push('El teléfono es obligatorio.');
        }
        
        if (edad === '' || isNaN(edad) || edad <= 0) {
            errores.push('Debes ingresar una edad válida.');
        }

        if (fecha === '') {
            errores.push('La fecha de nacimiento es obligatoria.');
        }

        // Validación de correo con Expresión Regular regex
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo === '') {
            errores.push('El correo electrónico es obligatorio.');
        } else if (!regexCorreo.test(correo)) {
            errores.push('El formato del correo electrónico no es válido (ejemplo: usuario@correo.com).');
        }

        // Validación de longitud de contraseña
        if (contrasena === '') {
            errores.push('La contraseña es obligatoria.');
        } else if (contrasena.length < 8) {
            errores.push('La contraseña debe tener al menos 8 caracteres.');
        }

        // Validación de Lista Desplegable
        if (pais === '') {
            errores.push('Debes seleccionar un país de residencia de la lista.');
        }

        // Validación de Botones de Opción
        if (!generoSeleccionado) {
            errores.push('Debes seleccionar una opción de género.');
        }

        // Validación de Casillas de Verificación Obligatorias
        if (!terminos) {
            errores.push('Debes aceptar los términos y condiciones para continuar.');
        }

        // 5. Manejo de resultado
        if (errores.length > 0) {
            // Si hay errores, mostrar el contenedor de errores
            contenedorErrores.style.display = 'block';
            
            // Recorrer el arreglo y crear un párrafo por cada error
            errores.forEach(function(error) {
                const mensaje = document.createElement('p');
                mensaje.textContent = 'Error: ' + error;
                contenedorErrores.appendChild(mensaje);
            });
            
            // Hacer scroll hacia arriba para que el usuario pueda ver los errores
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Si no hay errores, el formulario es válido
            alert('¡Formulario validado correctamente! Los datos están listos para enviarse.');
            
            //formulario.submit();
            
            // Limpieza de formulario 
            formulario.reset();
        }
    });
});