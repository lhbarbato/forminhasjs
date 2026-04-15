
// Dados dos produtos
const produtos = [
    { id: 1,  nome: 'Forminha Rosa Claro',        cor: 'rosa',       preco: 12.90, fotos: ['img/rosa-claro-1.jpg',     'img/rosa-claro-2.jpg'],    descricao: 'Forminha artesanal rosa claro' },
    { id: 2,  nome: 'Forminha Verde Claro',        cor: 'verde',      preco: 12.90, fotos: ['img/verde-claro-1.jpg',    'img/verde-claro-2.jpg'],   descricao: 'Forminha artesanal verde claro' },
    { id: 3,  nome: 'Forminha Branca',             cor: 'branco',     preco: 11.90, fotos: ['img/branca-1.jpg',         'img/branca-2.jpg'],        descricao: 'Forminha artesanal branca' },
    { id: 4,  nome: 'Forminha Rosa Pastel',        cor: 'rosa',       preco: 13.90, fotos: ['img/rosa-pastel-1.jpg',   'img/rosa-pastel-2.jpg'],   descricao: 'Forminha artesanal rosa pastel' },
    { id: 5,  nome: 'Forminha Verde Limão',        cor: 'verde',      preco: 13.90, fotos: ['img/verde-limao-1.jpg',   'img/verde-limao-2.jpg'],   descricao: 'Forminha artesanal verde limão' },
    { id: 6,  nome: 'Forminha Rosa e Verde',       cor: 'multicolor', preco: 14.90, fotos: ['img/rosa-verde-1.jpg',    'img/rosa-verde-2.jpg'],    descricao: 'Forminha artesanal rosa e verde' },
    { id: 7,  nome: 'Forminha Rosa Chiclete',      cor: 'rosa',       preco: 12.90, fotos: ['img/rosa-chiclete-1.jpg', 'img/rosa-chiclete-2.jpg'], descricao: 'Forminha artesanal rosa chiclete' },
    { id: 8,  nome: 'Forminha Verde Menta',        cor: 'verde',      preco: 13.90, fotos: ['img/verde-menta-1.jpg',   'img/verde-menta-2.jpg'],   descricao: 'Forminha artesanal verde menta' },
    { id: 9,  nome: 'Forminha Branca Pura',        cor: 'branco',     preco: 11.90, fotos: ['img/branca-pura-1.jpg',   'img/branca-pura-2.jpg'],   descricao: 'Forminha artesanal branca pura' },
    { id: 10, nome: 'Forminha Multicolor Premium', cor: 'multicolor', preco: 15.90, fotos: ['img/multi-1.jpg',         'img/multi-2.jpg'],         descricao: 'Forminha artesanal multicolor premium' },
    { id: 11, nome: 'Forminha Azul Bebê',          cor: 'azul',       preco: 12.90, fotos: ['azul bebe.jpeg', 'azul.bebe.png'],           descricao: 'Forminha artesanal azul bebê' },
    { id: 12, nome: 'Forminha Azul Claro',         cor: 'azul',       preco: 12.90, fotos: ['azul claro.jpeg', 'azul.claro.png'],         descricao: 'Forminha artesanal azul claro' },
    { id: 13, nome: 'Forminha Azul Escuro',        cor: 'azul',       preco: 13.90, fotos: ['azul escuro.jpeg', 'azul.escuro.png'],       descricao: 'Forminha artesanal azul escuro' },
    { id: 14, nome: 'Forminha Azul Marinho',       cor: 'azul',       preco: 13.90, fotos: ['azul marinho.jpeg', 'azul.marinho.png'],     descricao: 'Forminha artesanal azul marinho' },
    { id: 15, nome: 'Forminha Azul Petróleo',      cor: 'azul',       preco: 14.90, fotos: ['azul petroleo.jpeg', 'azul.petroleo.png'],   descricao: 'Forminha artesanal azul petróleo' },
    { id: 16, nome: 'Forminha Azul Serenity',      cor: 'azul',       preco: 13.90, fotos: ['azul serenity.jpeg', 'azul.serenity.png'],   descricao: 'Forminha artesanal azul serenity' },
    { id: 17, nome: 'Forminha Azul Tiffany',       cor: 'azul',       preco: 14.90, fotos: ['azul tiffany.jpeg', 'azul.tifanny.png'],     descricao: 'Forminha artesanal azul tiffany' },
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
    const fotos = card.querySelectorAll('.slide-foto');
    const dots = card.querySelectorAll('.dot');
    
    if (fotos.length <= 1) {
        // Se só tem 1 foto, não faz nada ou mostra mensagem
        console.log('Apenas uma foto disponível');
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
    const fotos = card.querySelectorAll('.slide-foto');
    const dots = card.querySelectorAll('.dot');
    
    if (fotos.length <= 1) return;

    fotos.forEach(f => f.classList.remove('ativo'));
    dots.forEach(d => d.classList.remove('ativo'));

    fotos[index].classList.add('ativo');
    if (dots[index]) dots[index].classList.add('ativo');
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
    document.getElementById('totalCarrinho').textContent = totalCarrinho.toFixed(2);
}

// Remover do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Mostrar carrinho (modal)
function mostrarCarrinho() {
    document.getElementById('modalCarrinho').style.display = 'block';
}

// Fechar carrinho
function fecharCarrinho() {
    document.getElementById('modalCarrinho').style.display = 'none';
}

// Scroll para produtos
function scrollToProducts() {
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
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
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});