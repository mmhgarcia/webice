import productos from './productos.js';

// Archivo separado para las funciones de la página

// Lista para almacenar los productos seleccionados
const listaSeleccionados = [];


// Constante con los precios por grupo (incluyendo decimales)
const precioTipo = {
    "Cremoso": 0.5,
    "FullCremoso": 0.7,
    "Premium": 1.0,
    "Ninguno": 0.3
};


// Función para renderizar la lista de productos seleccionados
function renderListaSeleccionados() {
    const listaProductosUl = document.getElementById("lista-productos");
    listaProductosUl.innerHTML = ""; // Limpiar lista
    listaSeleccionados.forEach((producto, index) => {
        const li = document.createElement("li");
        li.textContent = `#${producto.id} - ${producto.nombre}`;

        // Botón para eliminar el producto
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.style.marginLeft = "10px";
        eliminarBtn.style.background = "#ff4d4d";
        eliminarBtn.style.color = "white";
        eliminarBtn.style.border = "none";
        eliminarBtn.style.borderRadius = "5px";
        eliminarBtn.style.cursor = "pointer";
        eliminarBtn.addEventListener("click", () => {
            listaSeleccionados.splice(index, 1); // Eliminar producto de la lista
            renderListaSeleccionados(); // Volver a renderizar
        });

        li.appendChild(eliminarBtn);
        listaProductosUl.appendChild(li);
    });
}


// Función para calcular el total de los productos seleccionados
function calcularTotal() {
    if (listaSeleccionados.length === 0) {
        alert("Total: $0\nTotal Bs: 0");
        return;
    }

    let total = 0;
    listaSeleccionados.forEach(producto => {
        const precio = precioTipo[producto.grupo] || 0; // Obtener precio según el grupo
        total += precio; // Sumar al total
    });

    const tasa = parseFloat(localStorage.getItem('tasa')) || 0; // Obtener la tasa del localStorage
    const totalBs = total * tasa; // Calcular el total en Bs

    alert(`Total: $${total.toFixed(2)}\nTotal Bs: ${totalBs.toFixed(2)}`); // Mostrar ambos totales
}


// Función para mostrar el modal
function mostrarModal() {
    calcularTotal(); // Calcular el total antes de mostrar el modal
    const tasa = localStorage.getItem('tasa'); // Buscar la clave 'tasa' en localStorage
    document.getElementById('tasa-bcv').value = tasa ? tasa : ''; // Mostrar el valor si existe, o dejar el campo en blanco
    document.getElementById('modal-bcv').style.display = 'block';
}


// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modal-bcv').style.display = 'none';
}


// Función para grabar la tasa en el localStorage
function grabarTasa() {
    const tasa = document.getElementById('tasa-bcv').value;
    localStorage.setItem('tasa', tasa); // Guardar en localStorage con la clave "tasa"
    alert(`Tasa BCV grabada: ${tasa}`);
    cerrarModal();
}


// Función para asignar eventos de clic a las imágenes
function asignarEventosImagenes(productosConStock) {
    document.querySelectorAll(".imagen-container img").forEach((img, index) => {
        img.addEventListener("click", () => {
            const producto = productosConStock[index]; // Obtener producto correspondiente
            const productoSeleccionado = {
                id: producto.id,
                nombre: producto.nombre
            };
            listaSeleccionados.push(productoSeleccionado); // Añadir solo id y nombre
            renderListaSeleccionados();
        });
    });
}

// Filtrar productos con stock > 0
const productosConStock = productos.filter(producto => producto.stock > 0);

// Asignar eventos a las imágenes después de renderizar el catálogo
asignarEventosImagenes(productosConStock);


export { renderListaSeleccionados, calcularTotal, mostrarModal, cerrarModal, grabarTasa, asignarEventosImagenes };
