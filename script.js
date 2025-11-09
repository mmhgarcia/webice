fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('cards-container');
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="images/${item.imagename}" alt="${item.sabor}">
        <h3>${item.sabor}</h3>
        <p>Código: ${item.codigo}</p>
        <div class="stock">Stock: ${item.stock}</div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error cargando datos:', err));
