
function chamarModal(){
    const modal = document.querySelector('.modal-overlay');
    modal.style.display = 'flex';
}

function fecharModal(){
    const modal = document.querySelector('.modal-overlay');
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

async function carregarPassaros() {
   
    try {
        const resposta = await fetch('/api/passaros', { credentials: 'include' });

        if (!resposta.ok) {
            const erro = await resposta.json().catch(() => ({}));
            alert(erro.error || 'Não foi possível carregar o feed.');
            return;
        }

        const passsaros = await resposta.json();

        document.querySelector('.cards-grid').innerHTML = passsaros.map(passaro => montarCard(passaro)).join('');

    } catch (erro) {
        console.error("Erro ao carregar o feed:", erro);
        alert("Não foi possível falar com o servidor.");
    }
}

function montarCard(passaro) {

    //const fotoPerfil = post.foto_perfil ? `/${esc(post.foto_perfil)}` : './imgs/noimg.webp';

    return `

        <div class="pigeon-card">
          <div>
            <!-- <img src="../imgs/pombo.jpeg" alt="Pombo Pena-Veloz" class="pigeon-img"> -->
            <div class="pigeon-name">${passaro.nome_passaro}</div>
            <div class="pigeon-personality">${passaro.descricao || 'Barato.'}</div>
          </div>
          <div class="card-footer">
            <span class="price">${(passaro.valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            <button class="btn" onclick="chamarModal()">Alugar</button>
          </div>
        </div>
    `;
}

carregarPassaros();