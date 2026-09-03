document.querySelector('#formLogin').addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;

            const resposta = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // credentials 'include' faz o navegador guardar o cookie da sessao do Node
                credentials: 'include',
                body: JSON.stringify({
                    email: form.email.value,
                    senha: form.senha.value
                })
            });

            if (!resposta.ok) {
                const erro = await resposta.json();
                alert(erro.error || 'Nao foi possivel entrar.');
                return;
            }

            // deu certo, a sessao do Node esta criada. agora pode ir pro feed e votar/seguir.
            location.href = './pombos.html';
        });

function logout() {
    fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao realizar o logout.');
        }

        // Logout bem-sucedido, redireciona para a página de login
        location.href = './login.html';
        console.log('Logout realizado com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao realizar o logout:', error);
        alert('Falha ao realizar o logout. Tente novamente.');
    });
}