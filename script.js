// Dados dos produtos
const produtos = [
    { id: 1, nome: 'Forminha Azul Bebê',          cor: 'azul',       preco: 12.90, fotos: ['azul bebe.png', 'azul.bebe.png'], descricao: 'Forminha de seda na cor azul bebê' },
    { id: 2, nome: 'Forminha Azul Claro',         cor: 'azul',       preco: 12.90, fotos: ['azul claro.png', 'azul.claro.png'],        descricao: 'Forminha de seda na cor azul claro' },
    { id: 3, nome: 'Forminha Azul Escuro',        cor: 'azul',       preco: 13.90, fotos: ['azul escuro.png', 'azul.escuro.png'],      descricao: 'Forminha de seda na cor azul escuro' },
    { id: 4, nome: 'Forminha Azul Marinho',       cor: 'azul',       preco: 13.90, fotos: ['azul marinho.png', 'azul.marinho.png'],      descricao: 'Forminha de seda na cor azul marinho' },
    { id: 5, nome: 'Forminha Azul Petróleo',      cor: 'azul',       preco: 14.90, fotos: ['azul petroleo.png', 'azul.petroleo.png'],    descricao: 'Forminha de seda na cor azul petróleo' },
    { id: 6, nome: 'Forminha Azul Serenity',      cor: 'azul',       preco: 13.90, fotos: ['azul serenity.png',  'azul.serenity.png'],   descricao: 'Forminha de seda na cor azul serenity' },
    { id: 7, nome: 'Forminha Azul Tiffany',       cor: 'azul',       preco: 14.90, fotos: ['azul tiffany.png',  'azul.tiffany.png'],    descricao: 'Forminha de seda na cor azul tiffany' },
    { id: 8, nome: 'Forminha Lilás',              cor: 'roxo',       preco: 14.90, fotos: ['lilas comum.png',  'lilas.comum.png'],  descricao: 'Forminha de seda na cor lilás' },
    { id: 9, nome: 'Forminha Roxa',               cor: 'roxo',       preco: 14.90, fotos: ['roxo comum.png',   'roxo.comum.png'],   descricao: 'Forminha de seda na cor roxa' },
    { id: 10, nome: 'Forminha Lilás Claro',        cor: 'roxo',       preco: 14.90, fotos: ['lilas claro.png',  'lilas.claro.png'],  descricao: 'Forminha de seda na cor lilás claro' },
    { id: 11, nome: 'Forminha Lilás Escuro',       cor: 'roxo',       preco: 14.90, fotos: ['lilas escuro.png', 'lilas.escuro.png'], descricao: 'Forminha de seda na cor lilás escuro' },
    { id: 12, nome: 'Forminha Preta',             cor: 'terrosos',   preco: 14.90, fotos: ['preto.png', 'preto cor.png'], descricao: 'Forminha de seda na cor preta' },
    { id: 13, nome: 'Forminha Pêssego',           cor: 'laranja',    preco: 14.90, fotos: ['pessego.jpg', 'pessego cor.png'], descricao: 'Forminha de seda na cor pêssego' },
    { id: 14, nome: 'Forminha Laranja',           cor: 'laranja',    preco: 14.90, fotos: ['laranja.jpg', 'laranja cor.png'], descricao: 'Forminha de seda na cor laranja' },
    { id: 15, nome: 'Forminha Bege',              cor: 'terrosos',   preco: 14.90, fotos: ['bege.jpg', 'bege cor.png'], descricao: 'Forminha de seda na cor bege' },
    { id: 16, nome: 'Forminha Laranja Claro',     cor: 'laranja',    preco: 14.90, fotos: ['laranja claro.jpg', 'laranja claro cor.png'], descricao: 'Forminha de seda na cor laranja claro' },
    { id: 17, nome: 'Forminha Amarelo Bebê',      cor: 'amarelo',    preco: 14.90, fotos: ['amarelo bebe.jpg', 'amarelo bebe cor.png'], descricao: 'Forminha de seda na cor amarelo bebê' },
    { id: 18, nome: 'Forminha Marfim',            cor: 'terrosos',   preco: 14.90, fotos: ['marfim.jpg', 'marfim cor.png'], descricao: 'Forminha de seda na cor marfim' },
    { id: 19, nome: 'Forminha Coral',             cor: 'laranja',   preco: 14.90, fotos: ['coral.jpg', 'coral cor.png'], descricao: 'Forminha de seda na cor coral' },
    { id: 20, nome: 'Forminha Amarelo',           cor: 'amarelo',    preco: 14.90, fotos: ['amarelo.jpg', 'amarelo cor.png'], descricao: 'Forminha de seda na cor amarelo' },
    { id: 21, nome: 'Forminha Off White',         cor: 'terrosos',   preco: 14.90, fotos: ['off white.jpg', 'off white cor.png'], descricao: 'Forminha de seda na cor off white' },
    { id: 22, nome: 'Forminha Champanhe',         cor: 'terrosos',   preco: 14.90, fotos: ['champanhe.jpg', 'champanhe cor.png'], descricao: 'Forminha de seda na cor champanhe' },
    { id: 23, nome: 'Forminha Branca',            cor: 'terrosos',   preco: 14.90, fotos: ['branco.jpg', 'branco cor.png'], descricao: 'Forminha de seda na cor branca' },
    { id: 24, nome: 'Forminha Canelinha',         cor: 'terrosos',   preco: 14.90, fotos: ['canelinha.jpg', 'canelinha cor.png'], descricao: 'Forminha de seda na cor canelinha' },
    { id: 25, nome: 'Forminha Rosa Bebê',         cor: 'rosa',       preco: 14.90, fotos: ['rosa bebe.jpg', 'rosa bebe cor.png'], descricao: 'Forminha de seda na cor rosa bebê' },
    { id: 26, nome: 'Forminha Pérola',            cor: 'terrosos',   preco: 14.90, fotos: ['perola.jpg', 'perola cor.png'], descricao: 'Forminha de seda na cor pérola' },
    { id: 27, nome: 'Forminha Goiaba',            cor: 'rosa',       preco: 14.90, fotos: ['goiaba.jpg', 'goiaba cor.png'], descricao: 'Forminha de seda na cor goiaba' },
];

// Cores para exibição
const coresInfo = {
    terrosos:       { nome: 'Neutro',       hex: '#282a2b' }, 
    azul:       { nome: 'Azul',       hex: '#90CAF9' },
    roxo:       { nome: 'Roxo',       hex: '#9a62da' },
    laranja:       { nome: 'Laranja',       hex: '#fd8d0e' },
    amarelo:       { nome: 'Amarelo',       hex: '#fdf50eed' },
    rosa:       { nome: 'rosa',       hex: '#fd0ed1ed' },
};

// ========== CARRINHO ==========
// Lê do localStorage ao iniciar
// ========== CARRINHO COM SUPORTE A MÚLTIPLOS USUÁRIOS ==========
// ========== CARRINHO COM FIREBASE UID ==========
function getUsuarioIdLogado() {
    return localStorage.getItem('firebase_uid');
}

function lerCarrinhoSalvo() {
    try {
        const usuarioId = getUsuarioIdLogado();
        if (!usuarioId) {
            const salvo = localStorage.getItem('carrinho_forminhas');
            return salvo ? JSON.parse(salvo) : [];
        }
        
        const salvo = localStorage.getItem(`carrinho_usuario_${usuarioId}`);
        return salvo ? JSON.parse(salvo) : [];
    } catch {
        return [];
    }
}

let carrinho = lerCarrinhoSalvo();

function salvarCarrinho() {
    const usuarioId = getUsuarioIdLogado();
    if (usuarioId) {
        localStorage.setItem(`carrinho_usuario_${usuarioId}`, JSON.stringify(carrinho));
    } else {
        localStorage.setItem('carrinho_forminhas', JSON.stringify(carrinho));
    }
}

// ATUALIZAR carrinho quando usuário mudar
window.addEventListener('storage', function(e) {
    if (e.key === 'firebase_uid') {
        carrinho = lerCarrinhoSalvo();
        atualizarCarrinho();
        if (typeof renderizarProdutos === 'function') renderizarProdutos();
    }
});

// ========== RENDERIZAR PRODUTOS ==========
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
    if (fotos.length <= 1) return;

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

// ========== CARRINHO ==========
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

    salvarCarrinho();
    atualizarCarrinho();
    alert(`${produto.nome} adicionado ao carrinho! 🛒`);
}

function atualizarCarrinho() {
    const contador = carrinho.reduce((total, item) => total + item.quantidade, 0);

    const contadorNav = document.getElementById('contadorCarrinhoNav');
    if (contadorNav) contadorNav.textContent = contador;

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
    if (totalElement) totalElement.textContent = totalCarrinho.toFixed(2);
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function mostrarCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) modal.style.display = 'block';
}

function fecharCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) modal.style.display = 'none';
}

// ========== REDIRECIONAR PARA CHECKOUT ==========
function irParaCheckout() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio! Adicione produtos antes de finalizar.');
        return;
    }
    salvarCarrinho();
    window.location.href = 'finalizar-compra.html';
}

function scrollToProducts() {
    const produtosSection = document.getElementById('produtos');
    if (produtosSection) produtosSection.scrollIntoView({ behavior: 'smooth' });
}

function enviarMensagem(event) {
    event.preventDefault();
    alert('Obrigado pela mensagem! Entraremos em contato em breve! 📧');
    event.target.reset();
}

// ========== INICIALIZAR ==========
document.addEventListener('DOMContentLoaded', function () {
    carrinho = lerCarrinhoSalvo();
    renderizarProdutos();
    atualizarCarrinho();

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
        if (modal && event.target == modal) modal.style.display = 'none';
    });
});

// Forçar atualização do carrinho quando a página recarregar
window.addEventListener('pageshow', function() {
    const novoCarrinho = lerCarrinhoSalvo();
    if (JSON.stringify(novoCarrinho) !== JSON.stringify(carrinho)) {
        carrinho = novoCarrinho;
        atualizarCarrinho();
    }
});

// ========== HEADER QUE ESCONDE AO ROLAR ==========
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }

    if (scrollTop > 50) {
        header.classList.add('compact');
    } else {
        header.classList.remove('compact');
    }

    lastScrollTop = scrollTop;
});