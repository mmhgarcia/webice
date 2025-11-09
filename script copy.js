fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('cards-container');
    data.forEach(item => {
      if (item.stock === 0) return;
      const card = document.createElement('div');
      card.style.width = 'auto';
      card.style.height = 'auto';
      card.className = 'card';
      card.innerHTML = `
        <img src="img/${item.imagename}" alt="${item.sabor}">
        <h3>${item.sabor}</h3>
        <p>Código: ${item.codigo}</p>
        <div class="stock">Stock: ${item.stock}</div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error cargando datos:', err));
