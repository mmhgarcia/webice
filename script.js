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
        <h3>${item.sabor}</h3>
        <p>Código: ${item.codigo}</p>
        <div class="stock">Stock: ${item.stock}</div>
      `;

      card.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        const image = document.createElement('img');
        image.src = `img/${item.imagename}`; // Assuming `item.imagename` contains the image filename
        image.style.maxWidth = '90%';
        image.style.maxHeight = '90%';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '20px';
        closeButton.style.right = '20px';
        closeButton.style.padding = '10px 20px';
        closeButton.style.fontSize = '16px';
        closeButton.style.cursor = 'pointer';

        closeButton.addEventListener('click', () => {
          document.body.removeChild(modal);
        });

        modal.appendChild(image);
        modal.appendChild(closeButton);
        document.body.appendChild(modal);
      });
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error cargando datos:', err));
