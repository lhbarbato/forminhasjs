// ========== CONFIGURAÇÃO SUPABASE ==========
const SUPABASE_URL = 'https://bqnmvesukoyeajcxajiv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_1V5PdDziblL5m8mu186-KQ_OYPqATNL';

// Função auxiliar para chamadas ao Supabase
async function supabaseInsert(tabela, dados) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${tabela}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(dados)
    });

    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.message || 'Erro ao salvar no banco de dados');
    }

    return await response.json();
}

// ========== CARRINHO ==========
// Lê o carrinho salvo no localStorage
function lerCarrinho() {
    try {
        const salvo = localStorage.getItem('carrinho_forminhas');
        return salvo ? JSON.parse(salvo) : [];
    } catch {
        return [];
    }
}

let carrinho = lerCarrinho();

// ========== RENDERIZAR RESUMO ==========
function renderizarResumo() {
    const container = document.getElementById('resumoItens');
    const totalEl = document.getElementById('resumoTotal');

    if (!carrinho || carrinho.length === 0) {
        document.getElementById('checkoutForm').style.display = 'none';
        document.getElementById('carrinhoVazioAviso').style.display = 'block';
        return;
    }

    container.innerHTML = '';

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        const div = document.createElement('div');
        div.className = 'resumo-item';
        div.innerHTML = `
            <div class="resumo-item-nome">
                ${item.nome}
                <span>Qtd: ${item.quantidade} × R$ ${item.preco.toFixed(2)}</span>
            </div>
            <div class="resumo-item-preco">R$ ${subtotal.toFixed(2)}</div>
        `;
        container.appendChild(div);
    });

    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    totalEl.textContent = total.toFixed(2).replace('.', ',');
}

// ========== BUSCAR CEP ==========
function formatarCEP(input) {
    let valor = input.replace(/\D/g, '');
    if (valor.length > 5) valor = valor.slice(0, 5) + '-' + valor.slice(5, 8);
    return valor;
}

document.getElementById('cep').addEventListener('input', function () {
    this.value = formatarCEP(this.value);
    if (this.value.replace(/\D/g, '').length === 8) {
        buscarCEP();
    }
});

async function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        mostrarErro('CEP inválido. Digite 8 números.');
        return;
    }

    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await res.json();

        if (dados.erro) {
            mostrarErro('CEP não encontrado. Verifique e tente novamente.');
            return;
        }

        document.getElementById('endereco').value = dados.logradouro || '';
        document.getElementById('bairro').value = dados.bairro || '';
        document.getElementById('cidade').value = dados.localidade || '';
        document.getElementById('estado').value = dados.uf || '';
        document.getElementById('numero').focus();
        esconderErro();

    } catch {
        mostrarErro('Erro ao buscar CEP. Preencha o endereço manualmente.');
    }
}

// ========== PAGAMENTO ==========
let formaPagamentoSelecionada = 'pix';

function selecionarPagamento(elemento, valor) {
    document.querySelectorAll('.pagamento-opcao').forEach(el => el.classList.remove('selecionado'));
    elemento.classList.add('selecionado');
    elemento.querySelector('input[type="radio"]').checked = true;
    formaPagamentoSelecionada = valor;
}

// ========== VALIDAÇÃO ==========
function validarFormulario() {
    const campos = [
        { id: 'nome', label: 'Nome' },
        { id: 'email', label: 'Email' },
        { id: 'telefone', label: 'WhatsApp' },
        { id: 'cep', label: 'CEP' },
        { id: 'endereco', label: 'Endereço' },
        { id: 'numero', label: 'Número' },
        { id: 'bairro', label: 'Bairro' },
        { id: 'cidade', label: 'Cidade' },
        { id: 'estado', label: 'Estado' },
    ];

    for (const campo of campos) {
        const valor = document.getElementById(campo.id).value.trim();
        if (!valor) {
            mostrarErro(`Por favor, preencha o campo: ${campo.label}`);
            document.getElementById(campo.id).focus();
            return false;
        }
    }

    const email = document.getElementById('email').value.trim();
    if (!/\S+@\S+\.\S+/.test(email)) {
        mostrarErro('Digite um email válido.');
        document.getElementById('email').focus();
        return false;
    }

    return true;
}

// ========== CONFIRMAR PEDIDO ==========
async function confirmarPedido() {
    esconderErro();

    if (!validarFormulario()) return;

    const btn = document.getElementById('btnConfirmar');
    const loading = document.getElementById('msgCarregando');

    btn.disabled = true;
    loading.style.display = 'block';

    try {
        // 1. Salvar cliente
        const clienteData = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            cep: document.getElementById('cep').value.trim(),
            endereco: document.getElementById('endereco').value.trim(),
            numero: document.getElementById('numero').value.trim(),
            bairro: document.getElementById('bairro').value.trim(),
            cidade: document.getElementById('cidade').value.trim(),
            estado: document.getElementById('estado').value.trim().toUpperCase(),
        };

        const clienteResposta = await supabaseInsert('clientes', clienteData);
        const clienteId = clienteResposta[0].id;

        // 2. Calcular total
        const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

        // 3. Salvar pedido
        const pedidoData = {
            cliente_id: clienteId,
            total: total,
            status: 'pendente',
            forma_pagamento: formaPagamentoSelecionada,
        };

        const pedidoResposta = await supabaseInsert('pedidos', pedidoData);
        const pedidoId = pedidoResposta[0].id;

        // 4. Salvar itens do pedido
        const itens = carrinho.map(item => ({
            pedido_id: pedidoId,
            produto_id: item.id,
            produto_nome: item.nome,
            cor: item.cor,
            quantidade: item.quantidade,
            preco_unitario: item.preco,
        }));

        await supabaseInsert('itens_pedido', itens);

        // 5. Limpar carrinho
        localStorage.removeItem('carrinho_forminhas');

        // 6. Mostrar tela de sucesso
        document.getElementById('conteudoPrincipal').style.display = 'none';
        document.getElementById('telaSucesso').style.display = 'block';
        document.getElementById('numeroPedido').textContent = `Pedido #${pedidoId}`;

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (erro) {
        console.error(erro);
        mostrarErro('Ocorreu um erro ao salvar seu pedido. Tente novamente ou entre em contato pelo WhatsApp.');
        btn.disabled = false;
        loading.style.display = 'none';
    }
}

// ========== HELPERS ==========
function mostrarErro(msg) {
    const el = document.getElementById('msgErro');
    el.textContent = msg;
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function esconderErro() {
    document.getElementById('msgErro').style.display = 'none';
}

// ========== INICIALIZAR ==========
document.addEventListener('DOMContentLoaded', function () {
    carrinho = lerCarrinho();
    renderizarResumo();
});