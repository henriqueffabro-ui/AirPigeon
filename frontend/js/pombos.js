const modal = document.querySelector('.modal-overlay');

function chamarModal(){
    modal.style.display = 'flex';
}

function fecharModal(){
    modal.style.display = 'none';
}

function logout() {
      fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao realizar o logout.');
        }

        // Redireciona substituindo o histórico para impedir que o usuário volte com o botão "Voltar" do navegador
        window.location.replace('./login.html');
      })
      .catch(error => {
        console.error('Erro ao realizar o logout:', error);
        alert('Falha ao realizar o logout. Tente novamente.');
      });
    }