/* --- LÓGICA DO CARROSSEL DE IMAGENS --- */
const carouselStates = {
    carousel1: { currentIndex: 0, slide: null, totalImages: 0 },
    carousel2: { currentIndex: 0, slide: null, totalImages: 0 }
};

function moveSlide(carouselId, direction) {
    const state = carouselStates[carouselId];
    if (!state.slide) {
        const container = document.getElementById(carouselId);
        state.slide = container.querySelector('.carousel-slide');
        state.totalImages = state.slide.querySelectorAll('img').length;
    }
    state.currentIndex += direction;
    if (state.currentIndex >= state.totalImages) {
        state.currentIndex = 0;
    } else if (state.currentIndex < 0) {
        state.currentIndex = state.totalImages - 1;
    }
    state.slide.style.transform = `translateX(-${state.currentIndex * 100}%)`;
}

/* --- LÓGICA DO CARRINHO DE COMPRAS --- */
let cartItems = [];
let cartTotalPrice = 0;

const cartCountSpan = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalPriceSpan = document.getElementById('cart-total-price');

function addToCart(itemName, itemPrice) {
    cartItems.push({ name: itemName, price: itemPrice });
    cartTotalPrice += itemPrice;
    updateCartUI();
    alert(`${itemName} foi adicionado ao seu pedido!`);
}

function updateCartUI() {
    if (cartCountSpan) cartCountSpan.textContent = cartItems.length;
    if (cartItemsList) {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.name}</span> <b>R$ ${item.price.toFixed(2)}</b>`;
            cartItemsList.appendChild(li);
        });
    }
    if (cartTotalPriceSpan) cartTotalPriceSpan.textContent = cartTotalPrice.toFixed(2);
}

function toggleCartModal() {
    if (cartModal) {
        cartModal.style.display = (cartModal.style.display === "block") ? "none" : "block";
    }
}

window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
}

// Função para abrir/fechar o modal e SORTEAR o balcão
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    
    // Se o modal vai abrir (estava fechado)
    if (modal.style.display !== "block") {
        // Sorteia um número de 1 a 10
        const numeroSorteado = Math.floor(Math.random() * 10) + 1;
        // Coloca o número no campo do HTML
        document.getElementById('counter-number').value = numeroSorteado;
        
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
}

// Função de finalizar o pedido
function checkout() {
    const numeroBalcao = document.getElementById('counter-number').value;
    const metodoPagamento = document.getElementById('payment-method').value;

    if (cartItems.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Alerta final com o número que foi sorteado
    alert(`✅ PEDIDO CONFIRMADO!\n\n` +
          `📍 Balcão Sorteado: ${numeroBalcao}\n` + 
          `💳 Pagamento: ${metodoPagamento}\n` +
          `💰 Total: R$ ${cartTotalPrice.toFixed(2)}\n\n` +
          `Por favor, dirija-se ao balcão ${numeroBalcao}.`);

    // Limpa o carrinho
    cartItems = [];
    cartTotalPrice = 0;
    updateCartUI();
    toggleCartModal();
}

/* --- LÓGICA DE ACESSIBILIDADE (MODO ESCURO) --- */

function toggleDarkMode() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    // 1. Liga ou Desliga a classe 'dark-mode' no <body>
    body.classList.toggle('dark-mode');

    // 2. Altera o ícone para feedback visual
    // Se o corpo TEM a classe 'dark-mode'
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️'; // Ícone de Sol (para voltar ao claro)
        console.log("Modo Escuro Ativado");
        // Opcional: Salvar no localStorage para lembrar a escolha
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙'; // Ícone de Lua (para voltar ao escuro)
        console.log("Modo Claro Ativado");
        localStorage.setItem('theme', 'light');
    }
}

// Opcional: Verificar a preferência salva ao carregar a página
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').textContent = '☀️';
    }
};