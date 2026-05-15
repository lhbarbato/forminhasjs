// ========== CONFIGURAÇÃO SUPABASE ==========
const SUPABASE_URL = 'https://bqnmvesukoyeajcxajiv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_1V5PdDziblL5m8mu186-KQ_OYPqATNL';

// ========== FUNÇÃO PARA PEGAR UID DO FIREBASE ==========
function getUsuarioIdLogado() {
    // O UID do Firebase é salvo no login
    return localStorage.getItem('firebase_uid');
}

// ========== CARRINHO ==========
function lerCarrinho() {
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

function salvarCarrinhoLocal(carrinhoData) {
    const usuarioId = getUsuarioIdLogado();
    if (usuarioId) {
        localStorage.setItem(`carrinho_usuario_${usuarioId}`, JSON.stringify(carrinhoData));
    } else {
        localStorage.setItem('carrinho_forminhas', JSON.stringify(carrinhoData));
    }
}

let carrinho = lerCarrinho();

// ========== ENDEREÇOS DO USUÁRIO ==========
async function carregarEnderecosUsuario() {
    const usuarioId = getUsuarioIdLogado();
    if (!usuarioId) return [];
    
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/enderecos?usuario_id=eq.${usuarioId}&select=*`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        
        if (!response.ok) throw new Error('Erro ao carregar endereços');
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar endereços:', error);
        return [];
    }
}

async function salvarEndereco(enderecoData) {
    const usuarioId = getUsuarioIdLogado();
    if (!usuarioId) return null;
    
    try {
        const dadosCompletos = {
            ...enderecoData,
            usuario_id: usuarioId,
            created_at: new Date().toISOString()
        };
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/enderecos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(dadosCompletos)
        });
        
        if (!response.ok) throw new Error('Erro ao salvar endereço');
        return await response.json();
    } catch (error) {
        console.error('Erro ao salvar endereço:', error);
        return null;
    }
}

async function carregarEnderecoNoFormulario() {
    const enderecos = await carregarEnderecosUsuario();
    if (enderecos.length === 0) return;
    
    const enderecoSelect = document.getElementById('enderecoSalvo');
    if (enderecoSelect) {
        enderecoSelect.innerHTML = '<option value="">-- Selecione um endereço salvo --</option>' +
            enderecos.map(ender => `<option value="${ender.id}">${ender.nome_endereco || 'Endereço'}: ${ender.endereco}, ${ender.numero} - ${ender.cidade}</option>`).join('');
        
        document.getElementById('enderecosSalvosGrupo').style.display = 'block';
        
        enderecoSelect.onchange = () => {
            const selectedId = parseInt(enderecoSelect.value);
            const enderecoSelecionado = enderecos.find(e => e.id === selectedId);
            if (enderecoSelecionado) {
                preencherFormularioComEndereco(enderecoSelecionado);
            }
        };
    }
}

function preencherFormularioComEndereco(endereco) {
    document.getElementById('cep').value = endereco.cep || '';
    document.getElementById('endereco').value = endereco.endereco || '';
    document.getElementById('numero').value = endereco.numero || '';
    document.getElementById('complemento').value = endereco.complemento || '';
    document.getElementById('bairro').value = endereco.bairro || '';
    document.getElementById('cidade').value = endereco.cidade || '';
    document.getElementById('estado').value = endereco.estado || '';
}

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
    document.getElementById('checkoutForm').style.display = 'block';
    document.getElementById('carrinhoVazioAviso').style.display = 'none';

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        const div = document.createElement('div');
        div.className = 'resumo-item';
        div.innerHTML = `
            <div class="resumo-item-nome">
                <strong>${item.nome}</strong>
                <span>Qt: ${item.quantidade} × R$ ${item.preco.toFixed(2)}</span>
            </div>
            <div class="resumo-item-preco">R$ ${subtotal.toFixed(2)}</div>
        `;
        container.appendChild(div);
    });

    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    totalEl.textContent = total.toFixed(2).replace('.', ',');
}

// ========== BUSCAR CEP ==========
function formatarCEP(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 5) valor = valor.slice(0, 5) + '-' + valor.slice(5, 8);
    return valor;
}

document.addEventListener('DOMContentLoaded', async function () {
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function () {
            this.value = formatarCEP(this.value);
            if (this.value.replace(/\D/g, '').length === 8) buscarCEP();
        });
    }

    const usuarioId = getUsuarioIdLogado();
    if (usuarioId) {
        await carregarEnderecoNoFormulario();
        
        // Preencher nome e email se estiver logado
        const userNome = localStorage.getItem('user_nome');
        const userEmail = localStorage.getItem('user_email');
        if (userNome && document.getElementById('nome')) {
            document.getElementById('nome').value = userNome;
        }
        if (userEmail && document.getElementById('email')) {
            document.getElementById('email').value = userEmail;
        }
    }

    carrinho = lerCarrinho();
    renderizarResumo();
    
    window.addEventListener('storage', function(e) {
        if (e.key && e.key.includes('carrinho_usuario')) {
            carrinho = lerCarrinho();
            renderizarResumo();
        }
    });
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
        { id: 'nome',     label: 'Nome' },
        { id: 'email',    label: 'E-mail' },
        { id: 'telefone', label: 'WhatsApp' },
        { id: 'cep',      label: 'CEP' },
        { id: 'endereco', label: 'Endereço' },
        { id: 'numero',   label: 'Número' },
        { id: 'bairro',   label: 'Bairro' },
        { id: 'cidade',   label: 'Cidade' },
        { id: 'estado',   label: 'Estado' },
    ];

    for (const campo of campos) {
        const valor = document.getElementById(campo.id)?.value.trim();
        if (!valor) {
            mostrarErro(`Por favor, preencha o campo: ${campo.label}`);
            document.getElementById(campo.id)?.focus();
            return false;
        }
    }

    const email = document.getElementById('email').value.trim();
    if (!/\S+@\S+\.\S+/.test(email)) {
        mostrarErro('Digite um e-mail válido.');
        document.getElementById('email').focus();
        return false;
    }

    return true;
}

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

// ========== CONFIRMAR PEDIDO ==========
async function confirmarPedido() {
    esconderErro();
    if (!validarFormulario()) return;

    const btn = document.getElementById('btnConfirmar');
    const loading = document.getElementById('msgCarregando');

    btn.disabled = true;
    loading.style.display = 'block';

    try {
        const usuarioId = getUsuarioIdLogado();
        
        const clienteData = {
            nome:      document.getElementById('nome').value.trim(),
            email:     document.getElementById('email').value.trim(),
            telefone:  document.getElementById('telefone').value.trim(),
            cep:       document.getElementById('cep').value.trim(),
            endereco:  document.getElementById('endereco').value.trim(),
            numero:    document.getElementById('numero').value.trim(),
            bairro:    document.getElementById('bairro').value.trim(),
            cidade:    document.getElementById('cidade').value.trim(),
            estado:    document.getElementById('estado').value.trim().toUpperCase(),
        };
        
        if (usuarioId) {
            clienteData.firebase_uid = usuarioId;
            
            // Perguntar se quer salvar o endereço
            const salvarEnderecoFlag = confirm('Deseja salvar este endereço na sua conta para próximas compras?');
            if (salvarEnderecoFlag) {
                const nomeEndereco = prompt('Dê um nome para este endereço (ex: "Casa", "Trabalho"):', 'Casa');
                if (nomeEndereco) {
                    const enderecoParaSalvar = {
                        nome_endereco: nomeEndereco,
                        cep: clienteData.cep,
                        endereco: clienteData.endereco,
                        numero: clienteData.numero,
                        complemento: document.getElementById('complemento').value.trim(),
                        bairro: clienteData.bairro,
                        cidade: clienteData.cidade,
                        estado: clienteData.estado,
                        usuario_id: usuarioId
                    };
                    await salvarEndereco(enderecoParaSalvar);
                    mostrarErro('✓ Endereço salvo na sua conta!', 'msgInfo');
                }
            }
        }

        const clienteResposta = await supabaseInsert('clientes', clienteData);
        const clienteId = clienteResposta[0].id;

        const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

        const pedidoData = {
            cliente_id:      clienteId,
            total:           total,
            status:          'pendente',
            forma_pagamento: formaPagamentoSelecionada,
        };

        const pedidoResposta = await supabaseInsert('pedidos', pedidoData);
        const pedidoId = pedidoResposta[0].id;

        const itens = carrinho.map(item => ({
            pedido_id:      pedidoId,
            produto_id:     item.id,
            produto_nome:   item.nome,
            cor:            item.cor,
            quantidade:     item.quantidade,
            preco_unitario: item.preco,
        }));

        await supabaseInsert('itens_pedido', itens);

        if (usuarioId) {
            localStorage.removeItem(`carrinho_usuario_${usuarioId}`);
        } else {
            localStorage.removeItem('carrinho_forminhas');
        }
        carrinho = [];

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
function mostrarErro(msg, id = 'msgErro') {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = msg;
        el.style.display = 'block';
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            if (el.style.display === 'block') el.style.display = 'none';
        }, 5000);
    }
}

function esconderErro() {
    const el = document.getElementById('msgErro');
    if (el) el.style.display = 'none';
}

// ========== HEADER SCROLL ==========
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        if (header) header.classList.add('hide');
    } else {
        if (header) header.classList.remove('hide');
    }
    if (scrollTop > 50) {
        if (header) header.classList.add('compact');
    } else {
        if (header) header.classList.remove('compact');
    }
    lastScrollTop = scrollTop;
});