// supabase-client.js
const SUPABASE_URL = 'https://bqnmvesukoyeajcxajiv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbm12ZXN1a295ZWFqY3hhaml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MjQ4MDAsImV4cCI6MjA1NDUwMDgwMH0.ExemploKeySubstitua';

// Função genérica para consultas autenticadas
async function supabaseRequest(endpoint, options = {}) {
    const token = localStorage.getItem('supabase_token');
    const headers = {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    const response = await fetch(`${SUPABASE_URL}${endpoint}`, {
        ...options,
        headers: { ...headers, ...options.headers }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro na requisição');
    }
    return response.json();
}

// Função para associar cliente ao usuário logado
async function getOrCreateClientePorEmail(email, nome) {
    // Buscar cliente existente
    const clientes = await supabaseRequest(`/rest/v1/clientes?email=eq.${encodeURIComponent(email)}&select=*`);
    
    if (clientes && clientes.length > 0) {
        return clientes[0];
    }
    
    // Criar novo cliente
    const novoCliente = await supabaseRequest('/rest/v1/clientes', {
        method: 'POST',
        body: JSON.stringify({ email, nome, user_id: FirebaseAuth.currentUser?.uid })
    });
    
    return novoCliente[0];
}

// Função para salvar endereço
async function salvarEndereco(endereco) {
    const user = FirebaseAuth.currentUser;
    if (!user) throw new Error('Usuário não logado');
    
    return await supabaseRequest('/rest/v1/enderecos', {
        method: 'POST',
        body: JSON.stringify({
            user_id: user.uid,
            ...endereco,
            created_at: new Date().toISOString()
        })
    });
}

// Função para buscar endereços do usuário
async function buscarEnderecosUsuario() {
    const user = FirebaseAuth.currentUser;
    if (!user) return [];
    
    const enderecos = await supabaseRequest(`/rest/v1/enderecos?user_id=eq.${user.uid}&select=*`);
    return enderecos || [];
}

// Função para deletar endereço
async function deletarEndereco(enderecoId) {
    const user = FirebaseAuth.currentUser;
    if (!user) throw new Error('Usuário não logado');
    
    return await supabaseRequest(`/rest/v1/enderecos?id=eq.${enderecoId}`, {
        method: 'DELETE'
    });
}