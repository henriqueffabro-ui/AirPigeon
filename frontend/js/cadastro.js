  document.querySelector('#formCadastro').addEventListener('submit', async (e) => {
            // sem o preventDefault o navegador recarrega a pagina e o fetch nem chega a sair
            e.preventDefault();
            const form = e.target;

            const resposta = await fetch('/api/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: form.nome.value,
                    email: form.email.value,
                    senha: form.senha.value
                })
            });

            if (!resposta.ok) {
                const erro = await resposta.json();
                alert(erro.error || 'Nao foi possivel criar a conta.');
                return;
            }

            // conta criada. o cadastro nao loga sozinho (a rota so grava o usuario),
            // entao mando pro login, igual o cadastro.php fazia no fim.
            alert('Conta criada! Agora e so entrar.');
            location.href = './login.html';
        });