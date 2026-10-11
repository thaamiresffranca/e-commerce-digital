// Array que armazena os produtos adicionados ao carrinho
// Tenta carregar do localStorage, se não houver nada, começa vazio ([])
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para adicionar um produto ao carrinho
function addToCart(productId) {
    // Procura o produto no array 'products' (que veio do products.js)
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    // Verifica se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // Se já existe, aumenta a quantidade
        existingItem.quantity += 1;
    } else {
        // Se não existe, adiciona com quantidade 1
        cart.push({ ...product, quantity: 1 });
    }

    // Salva no localStorage e atualiza a tela
    saveCart();
    updateCartCount();
    alert(`"${product.title}" foi adicionado ao carrinho!`);
}

// Função para salvar o carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para atualizar a contagem de itens no botão do cabeçalho
function updateCartCount() {
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalItems;
    }
}

// Atualiza a contagem assim que a página carrega
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});