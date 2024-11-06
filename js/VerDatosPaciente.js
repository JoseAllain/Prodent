function toggleModal() {
    var modal = document.getElementById("patientModal");
    modal.classList.toggle("show");

    // Obtener el userId desde localStorage
    var userId = atob(localStorage.getItem('userId'));
    console.log(userId)
    if (userId) {
        fetch(`http://3.90.165.238:8080/perfil/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del paciente");
                }
                return response.json();
            })
            .then(data => {
                // Mostrar los datos en el modal
                document.getElementById("correoPaciente").textContent = data.correo;
                document.getElementById("nombrePaciente").textContent = data.nombre;
                document.getElementById("dniPaciente").textContent = data.dni;
                document.getElementById("telefonoPaciente").textContent = data.telefono;
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
}