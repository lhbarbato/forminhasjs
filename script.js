// ========== FUNÇÃO PARA PEGAR ID DO USUÁRIO LOGADO ==========
function getUsuarioIdLogado() {
    return localStorage.getItem('firebase_uid');
}

// ========== FUNÇÃO PARA LER O CARRINHO CORRETAMENTE ==========
function lerCarrinhoSalvo() {
    try {
        const usuarioId = getUsuarioIdLogado();
        console.log('Usuário logado ID:', usuarioId); // Para debug
        
        if (!usuarioId) {
            // Usuário NÃO logado - carrinho anônimo
            const salvo = localStorage.getItem('carrinho_forminhas');
            console.log('Carrinho anônimo:', salvo);
            return salvo ? JSON.parse(salvo) : [];
        } else {
            // Usuário logado - carrinho específico do usuário
            const chaveCarrinho = `carrinho_usuario_${usuarioId}`;
            const salvo = localStorage.getItem(chaveCarrinho);
            console.log(`Carrinho do usuário ${usuarioId}:`, salvo);
            return salvo ? JSON.parse(salvo) : [];
        }
    } catch (error) {
        console.error('Erro ao ler carrinho:', error);
        return [];
    }
}

// ========== FUNÇÃO PARA SALVAR CARRINHO ==========
function salvarCarrinho() {
    const usuarioId = getUsuarioIdLogado();
    
    if (usuarioId) {
        // Salva no carrinho específico do usuário
        const chaveCarrinho = `carrinho_usuario_${usuarioId}`;
        localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));
        console.log(`Carrinho salvo para usuário ${usuarioId}:`, carrinho);
    } else {
        // Salva no carrinho anônimo
        localStorage.setItem('carrinho_forminhas', JSON.stringify(carrinho));
        console.log('Carrinho salvo como anônimo:', carrinho);
    }
}

// ========== LIMPAR CARRINHO AO FAZER LOGOUT ==========
function limparCarrinhoAnonimo() {
    // Não precisamos limpar, apenas garantir que ao logar, 
    // o carrinho carregue o do usuário
    console.log('Preparando para trocar de usuário...');
}

// ========== INICIALIZAR CARRINHO ==========
let carrinho = lerCarrinhoSalvo();

// ========== ATUALIZAR CARRINHO QUANDO USUÁRIO MUDAR ==========
// Escuta mudanças no localStorage (quando o usuário faz login/logout)
window.addEventListener('storage', function(e) {
    if (e.key === 'firebase_uid') {
        console.log('Usuário mudou! Recarregando carrinho...');
        carrinho = lerCarrinhoSalvo();
        atualizarCarrinho(); // Atualiza a interface
        if (typeof renderizarProdutos === 'function') {
            renderizarProdutos(); // Recarrega produtos se necessário
        }
    }
});

// ========== SUAS FUNÇÕES EXISTENTES (mantenha elas) ==========
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

    salvarCarrinho(); // Usa a nova função
    atualizarCarrinho();
    alert(`${produto.nome} adicionado ao carrinho! 🛒`);
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho(); // Usa a nova função
    atualizarCarrinho();
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

// ========== FUNÇÕES DO MODAL ==========
function mostrarCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) modal.style.display = 'block';
}

function fecharCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) modal.style.display = 'none';
}

function irParaCheckout() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio! Adicione produtos antes de finalizar.');
        return;
    }
    salvarCarrinho(); // Garante que salvou antes de ir pro checkout
    window.location.href = 'finalizar-compra.html';
}