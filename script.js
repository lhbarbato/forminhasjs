// Dados dos produtos
const produtos = [
    { id: 1, nome: 'Forminha Azul Bebê',          cor: 'azul',       preco: 12.90, fotos: ['azul bebe.png', 'azul.bebe.png'],           descricao: 'Forminha de seda na cor azul bebê' },
    { id: 2, nome: 'Forminha Azul Claro',         cor: 'azul',       preco: 12.90, fotos: ['azul claro.png', 'azul.claro.png'],         descricao: 'Forminha de seda na cor azul claro' },
    { id: 3, nome: 'Forminha Azul Escuro',        cor: 'azul',       preco: 13.90, fotos: ['azul escuro.png', 'azul.escuro.png'],       descricao: 'Forminha de seda na cor azul escuro' },
    { id: 4, nome: 'Forminha Azul Marinho',       cor: 'azul',       preco: 13.90, fotos: ['azul marinho.png', 'azul.marinho.png'],     descricao: 'Forminha de seda na cor azul marinho' },
    { id: 5, nome: 'Forminha Azul Petróleo',      cor: 'azul',       preco: 14.90, fotos: ['azul petroleo.png', 'azul.petroleo.png'],   descricao: 'Forminha de seda na cor azul petróleo' },
    { id: 6, nome: 'Forminha Azul Serenity',      cor: 'azul',       preco: 13.90, fotos: ['azul serenity.png', 'azul.serenity.png'],   descricao: 'Forminha de seda na cor azul serenity' },
    { id: 7, nome: 'Forminha Azul Tiffany',       cor: 'azul',       preco: 14.90, fotos: ['azul tiffany.png', 'azul.tiffany.png'],     descricao: 'Forminha de seda na cor azul tiffany' },
];

// Cores para exibição
const coresInfo = {
    rosa:       { nome: 'Rosa',       hex: '#FFB6D9' },
    verde:      { nome: 'Verde',      hex: '#C8E6C9' },
    branco:     { nome: 'Branco',     hex: '#FFFFFF' },
    azul:       { nome: 'Azul',       hex: '#90CAF9' },
    multicolor: { nome: 'Multicolor', hex: 'linear-gradient(135deg, #FFB6D9 0%, #C8E6C9 100%)' }
};

// Carrinho
let carrinho = [];

// Renderizar produtos
function renderizarProdutos(filtro = 'todas') {
    const gridProdutos = document.getElementById('gridProdutos');
    if (!gridProdutos) return;
    
    gridProdutos.innerHTML = '';

    const produtosFiltrados = filtro === 'todas'
        ? produtos
        : produtos.filter(p => p.cor === filtro);

    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card-produto';

        const fotosHTML = produto.fotos.map((foto, i) => `
            <img
                src="${foto}"
                alt="${produto.nome} - foto ${i + 1}"
                class="slide-foto ${i === 0 ? 'ativo' : ''}"
                onerror="this.style.display='none'"
            >
        `).join('');

        const temMultiplasFotos = produto.fotos.length > 1;

        card.innerHTML = `
            <div class="card-galeria">
                ${fotosHTML}
                <div class="placeholder-foto" style="display:none">🧁</div>
                ${temMultiplasFotos ? `
                <button class="seta seta-esq" onclick="mudarFoto(${produto.id}, -1)" aria-label="Foto anterior">&#8249;</button>
                <button class="seta seta-dir" onclick="mudarFoto(${produto.id}, 1)" aria-label="Próxima foto">&#8250;</button>
                <div class="dots">
                    ${produto.fotos.map((_, i) => `<span class="dot ${i === 0 ? 'ativo' : ''}" onclick="irParaFoto(${produto.id}, ${i})"></span>`).join('')}
                </div>
                ` : ''}
            </div>
            <div class="card-produto-corpo">
                <h3>${produto.nome}</h3>
                <p style="font-size: 12px; color: #999;">${produto.descricao}</p>
                <div class="card-produto-cor">
                    <span>Cor:</span>
                    <div class="cor-circle" style="background: ${coresInfo[produto.cor].hex}; border: 1px solid #ddd;"></div>
                    <span>${coresInfo[produto.cor].nome}</span>
                </div>
                <div class="card-produto-preco">R$ ${produto.preco.toFixed(2)}</div>
                <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;

        card.dataset.produtoId = produto.id;
        gridProdutos.appendChild(card);
    });
}

function mudarFoto(produtoId, direcao) {
    const card = document.querySelector(`[data-produto-id="${produtoId}"]`);
    if (!card) return;
    
    const fotos = card.querySelectorAll('.slide-foto');
    const dots = card.querySelectorAll('.dot');
    
    if (fotos.length <= 1) {
        return;
    }
    
    let indexAtual = [...fotos].findIndex(f => f.classList.contains('ativo'));

    fotos[indexAtual].classList.remove('ativo');
    if (dots[indexAtual]) dots[indexAtual].classList.remove('ativo');

    indexAtual = (indexAtual + direcao + fotos.length) % fotos.length;

    fotos[indexAtual].classList.add('ativo');
    if (dots[indexAtual]) dots[indexAtual].classList.add('ativo');
}

function irParaFoto(produtoId, index) {
    const card = document.querySelector(`[data-produto-id="${produtoId}"]`);
    if (!card) return;
    
    const fotos = card.querySelectorAll('.slide-foto');
    const dots = card.querySelectorAll('.dot');
    
    if (fotos.length <= 1) return;

    fotos.forEach(f => f.classList.remove('ativo'));
    dots.forEach(d => d.classList.remove('ativo'));

    fotos[index].classList.add('ativo');
    if (dots[index]) dots[index].classList.add('ativo');
}

// Adicionar ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1,
            cor: produto.cor
        });
    }

    atualizarCarrinho();
    alert(`${produto.nome} adicionado ao carrinho! 🛒`);
}

// Atualizar carrinho
function atualizarCarrinho() {
    const contador = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    // Atualiza o contador no menu (nav)
    const contadorNav = document.getElementById('contadorCarrinhoNav');
    if (contadorNav) {
        contadorNav.textContent = contador;
    }
    
    // Atualiza o modal do carrinho
    const listaCarrinho = document.getElementById('listaCarrinho');
    if (!listaCarrinho) return;
    
    listaCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p style="text-align: center; color: #999;">Seu carrinho está vazio</p>';
    } else {
        carrinho.forEach((item, index) => {
            const total = item.preco * item.quantidade;
            listaCarrinho.innerHTML += `
                <div class="item-carrinho">
                    <div>
                        <strong>${item.nome}</strong>
                        <p style="font-size: 12px; color: #999;">Qt: ${item.quantidade} × R$ ${item.preco.toFixed(2)}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="color: #FF69B4; font-weight: bold;">R$ ${total.toFixed(2)}</p>
                        <button onclick="removerDoCarrinho(${index})" style="background: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Remover</button>
                    </div>
                </div>
            `;
        });
    }

    const totalCarrinho = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    const totalElement = document.getElementById('totalCarrinho');
    if (totalElement) {
        totalElement.textContent = totalCarrinho.toFixed(2);
    }
}

// Remover do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Mostrar carrinho (modal)
function mostrarCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Fechar carrinho
function fecharCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Scroll para produtos
function scrollToProducts() {
    const produtosSection = document.getElementById('produtos');
    if (produtosSection) {
        produtosSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Enviar mensagem de contato
function enviarMensagem(event) {
    event.preventDefault();
    alert('Obrigado pela mensagem! Entraremos em contato em breve! 📧');
    event.target.reset();
}

// Inicializar
document.addEventListener('DOMContentLoaded', function () {
    renderizarProdutos();

    const botoesFiltr = document.querySelectorAll('.btn-filtro');
    botoesFiltr.forEach(btn => {
        btn.addEventListener('click', function () {
            botoesFiltr.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderizarProdutos(this.dataset.filtro);
        });
    });

    window.addEventListener('click', function (event) {
        const modal = document.getElementById('modalCarrinho');
        if (modal && event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
// ========== HEADER QUE ESCONDE AO ROLAR ==========
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Verifica se o usuário está rolando para baixo
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Rolando para baixo - esconde o header
        header.classList.add('hide');
    } else {
        // Rolando para cima - mostra o header
        header.classList.remove('hide');
    }
    
    // Header compacto quando rolar um pouco
    if (scrollTop > 50) {
        header.classList.add('compact');
    } else {
        header.classList.remove('compact');
    }
    
    lastScrollTop = scrollTop;
});
