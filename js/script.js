const ingresoTexto= document.getElementById("ingresoTexto");
const botonEncriptar= document.getElementById("botonEncriptar");
const botonDesencriptar= document.getElementById("botonDesencriptar");
const mensajeFinal= document.getElementById("mensajeFinal");
const botonCopiar= document.getElementById("botonCopiar");
const muneco= document.getElementById("muneco");
const rightInfo= document.getElementById("rightInfo");
const right= document.getElementById("right");

const reemplazos = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"]
];

// Función para reemplazar texto
function reemplazarTexto(texto, patrones) {
    for (let i = 0; i < patrones.length; i++) {
        if (texto.includes(patrones[i][0])) {
            texto = texto.replaceAll(patrones[i][0], patrones[i][1]);
        }
    }
    return texto;
}

// Función para mostrar el texto modificado y ocultar elementos
function mostrarTextoModificado(texto) {
    mensajeFinal.innerHTML = texto;
    muneco.classList.add("oculto");
    ingresoTexto.value = "";
    rightInfo.style.display = "none";
    botonCopiar.style.display = "block";
    right.classList.add("ajustar");
    mensajeFinal.classList.add("ajustar");
}

// Función para resetear el estado
function resetear() {
    mensajeFinal.innerHTML = "";
    ingresoTexto.value = "";
    muneco.classList.remove("oculto");
    rightInfo.style.display = "block";
    botonCopiar.style.display = "none";
    right.classList.remove("ajustar");
    mensajeFinal.classList.remove("ajustar");
    ingresoTexto.focus();
}

// Manejador de evento para encriptar texto
botonEncriptar.addEventListener("click", () => {
    const texto = ingresoTexto.value.toLowerCase();
    if (texto !== "") {
        const textoEncriptado = reemplazarTexto(texto, reemplazos);
        mostrarTextoModificado(textoEncriptado);
    } else {
        alert("Ingrese el texto a encriptar.");
        resetear();
    }
});

// Manejador de evento para desencriptar texto
botonDesencriptar.addEventListener("click", () => {
    const texto = ingresoTexto.value.toLowerCase();
    if (texto !== "") {
        // Revertir el array de reemplazos para desencriptar
        const reemplazosInvertidos = reemplazos.map(([a, b]) => [b, a]);
        const textoDesencriptado = reemplazarTexto(texto, reemplazosInvertidos);
        mostrarTextoModificado(textoDesencriptado);
    } else {
        alert("Ingrese el texto a desencriptar.");
        resetear();
    }
});

// Manejador de evento para copiar texto
botonCopiar.addEventListener("click", () => {
    const texto = mensajeFinal.innerHTML;
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Texto Copiado");
            resetear();
        })
        .catch(err => console.error('Error al copiar el texto: ', err));
});