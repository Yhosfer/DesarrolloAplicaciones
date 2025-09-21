// Capturar elementos
const btnColor = document.getElementById("btnColor");
const texto = document.getElementById("texto");

// Función para cambiar color de fondo y texto
btnColor.addEventListener("click", () => {
    document.body.style.backgroundColor = "lightblue";
    texto.textContent = "¡El color de fondo cambió con archivo vinculado!";
});


