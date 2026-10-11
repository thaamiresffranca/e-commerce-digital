// Seleciona a grade e os elementos de interatividade
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');

// Função para exibir os produtos na tela
function displayProducts(productsArray) {
    productGrid.innerHTML = '';

    if (productsArray.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 2rem;">Nenhum produto encontrado.</p>`;
        return;
    }

    productsArray.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        card.style.backgroundColor = 'var(--card-bg)';
        card.style.border = '1px solid var(--border-color)';
        card.style.borderRadius = '8px';
        card.style.overflow = 'hidden';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'space-between';

        card.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 160px; object-fit: cover;">
                <div style="padding: 1rem;">
                    <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--primary-color); font-weight: bold;">${product.category}</span>
                    <h3 style="font-size: 1.1rem; margin: 0.5rem 0;">${product.title}</h3>
                    <p style="font-size: 0.9rem; color: var(--text-color); opacity: 0.8; margin-bottom: 1rem;">${product.description}</p>
                </div>
            </div>
            <div style="padding: 0 1rem 1rem 1rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 1.2rem; font-weight: bold;">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                <button onclick="addToCart(${product.id})" style="padding: 0.5rem 1rem; background-color: var(--primary-color); color: white; border: none; border-radius: 6px; cursor: pointer;">Comprar</button>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

// 🔍 Funcionalidade de Busca em Tempo Real
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// 🏷️ Funcionalidade de Filtros por Categoria
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove a classe 'active' de todos os botões e adiciona no clicado
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const category = e.target.getAttribute('data-category');

        if (category === 'all') {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.category === category);
            displayProducts(filteredProducts);
        }
    });
});

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
});

// Lógica do Dark Mode
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = '☀️ Modo Claro';
    } else {
        themeToggleBtn.textContent = '🌙 Modo Escuro';
    }
});