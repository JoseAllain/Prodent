let tiempoLimite = 60000;
let temporizador;

function reiniciarTemporizador() {
    clearTimeout(temporizador);
    temporizador = setTimeout(cerrarSesion, tiempoLimite);
}

function cerrarSesion() {
    alert("Has estado inactivo. La sesión se cerrará.");
    localStorage.removeItem('userId')
    window.location.href = 'index.html';
}

window.onload = reiniciarTemporizador;
window.onmousemove = reiniciarTemporizador;
window.onkeypress = reiniciarTemporizador;
window.onclick = reiniciarTemporizador;
window.onscroll = reiniciarTemporizador;
window.ontouchstart = reiniciarTemporizador;