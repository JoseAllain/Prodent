document.addEventListener('DOMContentLoaded', function() {
    var registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evitar el envío inicial

        if (!validateForm()) {
            return; // Si alguna validación falla, no continúa
        }

        // Si todas las validaciones son correctas, entonces se procede a enviar el formulario
        submitRegistrationForm();
    });
});

// Validación completa del formulario
function validateForm() {
    return validatePhoneNumber() && validateEmail() && validateDNI();
}

// Validación de correo
function validateEmail() {
    var correo = document.getElementById('correo').value;
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(correo)) {
        alert('Por favor, ingrese un correo válido con un dominio correcto (ej. .com, .es)');
        return false; // Falla la validación, no permite seguir
    }

    return true; // Validación correcta
}

// Validación de número de teléfono
function validatePhoneNumber() {
    var telefono = document.getElementById('telefono').value;
    var telefonoRegex = /^9\d{8}$/;

    if (!telefonoRegex.test(telefono)) {
        alert('El número de teléfono debe comenzar con 9 y tener 9 dígitos en total.');
        return false; // Falla la validación, no permite seguir
    }

    return true; // Validación correcta
}

// Validación de DNI
function validateDNI() {
    var dni = document.getElementById('dni').value;
    var dniPattern = /^\d{8}$/; // Verifica si tiene exactamente 8 dígitos

    if (!dniPattern.test(dni)) {
        alert('El DNI debe tener exactamente 8 dígitos.');
        return false; // Falla la validación, no permite seguir
    }

    return true; // Validación correcta
}

// Envío de formulario si todas las validaciones pasan
function submitRegistrationForm() {
    var nombre = document.getElementById('nombre').value;
    var dni = document.getElementById('dni').value;
    var telefono = document.getElementById('telefono').value;
    var correo = document.getElementById('correo').value;
    var clave = document.getElementById('clave').value;

    var formData = {
        nombre: nombre,
        dni: dni,
        telefono: telefono,
        correo: correo,
        clave: clave
    };

    var url = 'https://prodent.sytes.net/registro';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(errorData => {
                if (response.status === 409 || response.status === 400) {
                    alert(errorData.message); // Mostrar mensaje del backend
                } else {
                    alert('Error en el servidor. Por favor, inténtelo de nuevo.');
                }
                throw new Error(errorData.message || 'Error en el servidor');
            });
        }
    })
    .then(data => {
        console.log('Registro exitoso:', data);
        alert('Registro exitoso');
        window.location.href = 'InicioSesion.html';
    })
    .catch(error => {
        console.error('Error en el registro:', error);
    });
}
/*document.addEventListener('DOMContentLoaded', function() {
    var registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitRegistrationForm();
    });
});

function submitRegistrationForm() {
    if (!validatePhoneNumber()) {
        return;
    }
    
    var nombre = document.getElementById('nombre').value;
    var dni = document.getElementById('dni').value;
    var telefono = document.getElementById('telefono').value;
    var correo = document.getElementById('correo').value;
    var clave = document.getElementById('clave').value;

    var formData = {
        nombre: nombre,
        dni: dni,
        telefono: telefono,
        correo: correo,
        clave: clave
    };

    var url = 'http://localhost:8080/registro';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(errorData => {
                // Manejar errores específicos basados en el código de estado
                if (response.status === 409) {
                    alert(errorData.message); // Mostrar mensaje del backend
                } else if (response.status === 400) {
                    alert(errorData.message); // Mostrar mensaje del backend
                } else {
                    alert('Error en el servidor. Por favor, inténtelo de nuevo.');
                }
                throw new Error(errorData.message || 'Error en el servidor');
            });
        }
    })
    .then(data => {
        console.log('Registro exitoso:', data);
        alert('Registro exitoso');
        window.location.href = 'InicioSesion.html';
    })
}

function onlyNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
        event.preventDefault();
        return false;
    }
    return true;
}

function validateInputLength(element, maxLength) {
    var errorSpanId = element.id + "-error";
    var errorSpan = document.getElementById(errorSpanId);
    if (element.value.length !== maxLength) {
         errorSpan.style.display = "block";
    } else {
        errorSpan.style.display = "none";
    }
}

function validatePhoneNumber() {
    var telefono = document.getElementById('telefono').value;
    var telefonoRegex = /^9\d{8}$/; // Verifica si el número comienza con 9 y tiene 9 dígitos en total
    var soloNumeros = /^\d+$/; // Verifica que solo contenga dígitos

    if (!telefonoRegex.test(telefono)) {
        alert('El número de teléfono debe comenzar con 9 y tener 9 dígitos en total.');
        return false;
    }

    if (!soloNumeros.test(telefono)) {
        alert('El número de teléfono debe contener solo números.');
        return false;
    }

    return true;
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    var correo = document.getElementById('correo').value;
    // Expresión regular mejorada para validar correos electrónicos
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(correo)) {
        event.preventDefault(); // Evita que el formulario se envíe
        alert('Por favor, ingrese un correo válido con un dominio correcto (ej. .com, .es)');
        return;
    }
});
*/