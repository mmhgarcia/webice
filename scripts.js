// Importar productos
import productos from './productos.js';

// Lista para almacenar productos seleccionados
const listaSeleccionados = [];

// Precios por grupo
const precioTipo = {
    "Cremoso": 0.5,
    "FullCremoso": 0.7,
    "Premium": 1.0,
    "Ninguno": 0.3
};

// Filtrar productos con stock > 0
const productosConStock = productos.filter(producto => producto.stock > 0);

// =================== FUNCIONES ===================

// Renderizar lista de productos seleccionados
function renderListaSeleccionados() {
    const listaProductosUl = document.getElementById("lista-productos");
    listaProductosUl.innerHTML = "";
    listaSeleccionados.forEach((producto, index) => {
        const li = document.createElement("li");
        li.textContent = `#${producto.id} - ${producto.nombre}`;

        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.style.marginLeft = "10px";
        eliminarBtn.style.background = "#ff4d4d";
        eliminarBtn.style.color = "white";
        eliminarBtn.style.border = "none";
        eliminarBtn.style.borderRadius = "5px";
        eliminarBtn.style.cursor = "pointer";

        eliminarBtn.addEventListener("click", () => {
            listaSeleccionados.splice(index, 1);
            renderListaSeleccionados();
        });

        li.appendChild(eliminarBtn);
        listaProductosUl.appendChild(li);
    });
}

// Calcular total de productos seleccionados
function calcularTotal() {
    if (listaSeleccionados.length === 0) {
        alert("Total: $0\nTotal Bs: 0");
        return;
    }

    let total = 0;
    listaSeleccionados.forEach(producto => {
        const precio = precioTipo[producto.grupo] || 0;
        total += precio;
    });

    const tasa = parseFloat(localStorage.getItem('tasa')) || 0;
    const totalBs = total * tasa;

    alert(`Total: $${total.toFixed(2)}\nTotal Bs: ${totalBs.toFixed(2)}`);
}

// Modal BCV
function mostrarModal() {
    const tasa = localStorage.getItem('tasa');
    document.getElementById('tasa-bcv').value = tasa || '';
    document.getElementById('modal-bcv').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modal-bcv').style.display = 'none';
}

function grabarTasa() {
    const tasa = document.getElementById('tasa-bcv').value;
    localStorage.setItem('tasa', tasa);
    alert(`Tasa BCV grabada: ${tasa}`);
    cerrarModal();
}

// Asignar eventos a las imágenes de productos
function asignarEventosImagenes(productosMostrados) {
    document.querySelectorAll(".imagen-container img").forEach((img, index) => {
        img.addEventListener("click", () => {
            const producto = productosMostrados[index];
            listaSeleccionados.push({ id: producto.id, nombre: producto.nombre, grupo: producto.grupo });
            renderListaSeleccionados();
        });
    });
}

// Renderizar catálogo según grupo
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

// =================== EVENT LISTENERS ===================

// Inicializar catálogo completo
renderCatalogo("Todos");

// Botones modal y calcular total
document.getElementById("abrir-modal").addEventListener("click", mostrarModal);
document.getElementById("cerrar-modal-btn").addEventListener("click", cerrarModal);
document.getElementById("grabar-tasa-btn").addEventListener("click", grabarTasa);
document.getElementById("calcular-total").addEventListener("click", calcularTotal);

// Filtros
const filtroBtns = document.querySelectorAll(".filtro-btn");
filtroBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filtroBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const grupo = btn.dataset.grupo;
        renderCatalogo(grupo);
    });
});

// =================== BLOQUEO MENÚ CONTEXTUAL ===================
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// =================== EXPORTAR FUNCIONES (si es necesario) ===================
export { renderListaSeleccionados, calcularTotal, mostrarModal, cerrarModal, grabarTasa, asignarEventosImagenes, renderCatalogo };
