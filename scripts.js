// Al final de tu scripts.js, después de exportar funciones:

// Filtrado de productos
const filtroBtns = document.querySelectorAll(".filtro-btn");
filtroBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Quitar clase active de todos
        filtroBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const grupo = btn.dataset.grupo;
        renderCatalogo(grupo);
    });
});

// Función para renderizar el catálogo según grupo
function renderCatalogo(grupo) {
    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";

    const productosFiltrados = grupo === "Todos"
        ? productosConStock
        : productosConStock.filter(p => p.grupo === grupo);

    productosFiltrados.forEach(producto => {
        const div = document.createElement("div");
        div.className = "imagen-container";
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100px; height:100px; cursor:pointer;">
            <div>${producto.nombre}</div>
        `;
        catalogo.appendChild(div);
    });

    // Reasignar eventos a las imágenes
    asignarEventosImagenes(productosFiltrados);
}

// Inicializar catálogo con todos los productos
renderCatalogo("Todos");

// Asignar eventos modal y calcular total
document.getElementById("abrir-modal").addEventListener("click", mostrarModal);
document.getElementById("cerrar-modal-btn").addEventListener("click", cerrarModal);
document.getElementById("grabar-tasa-btn").addEventListener("click", grabarTasa);
document.getElementById("calcular-total").addEventListener("click", calcularTotal);
