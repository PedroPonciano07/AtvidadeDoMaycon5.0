
import { buscarEventos, confirmarInscricoes } from '../services/api.js';
import { Navbar, ativarNavbar } from '../components/Navbar.js';

// funcao que mostra as inscricoes do usuario
export async function mostrarInscricoes(app) {

    // monta a estrutura da pagina
    app.innerHTML = `
        ${Navbar()}
        <main>
            <h1>Minhas inscrições</h1>
            <p>Eventos em que você se inscreveu.</p>
            <div id="lista">Carregando...</div>
        </main>
    `;

    // ativa os botoes da barra de navegacao
    ativarNavbar();

    // pega a div onde as inscricoes serao mostradas
    const lista = document.querySelector('#lista');

    // variavel que vai guardar os eventos
    let eventos;

    // tenta buscar os eventos do backend
    try {
        eventos = await buscarEventos();
    } catch (erro) {
        // mostra uma mensagem caso aconteca algum erro
        lista.textContent = 'Erro ao buscar eventos. Verifique o backend.';
        return;
    }

    // funcao que atualiza a lista de inscricoes
    function atualizar() {

        // pega as inscricoes salvas no navegador
        const inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '[]');

        // separa apenas os eventos em que o usuario esta inscrito
        const selecionados = eventos.filter(evento =>
            inscricoes.includes(evento.id)
        );

        // verifica se existe alguma inscricao
        if (selecionados.length === 0) {
            lista.innerHTML = '<p>Você ainda não tem inscrições.</p>';
            return;
        }

        // mostra as inscricoes na tela
        lista.innerHTML = `
            <p>Total de inscrições: ${selecionados.length}</p>

            ${selecionados.map(evento => `
                <div class="inscricao">
                    <div>
                        <b>${evento.nome}</b>
                        <p>
                            ${new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                            - ${evento.local}
                        </p>
                    </div>

                    <button data-remover="${evento.id}">
                        Remover
                    </button>
                </div>
            `).join('')}

            <button id="confirmar">Confirmar inscrições</button>
        `;

        // pega os botoes de remover inscricao
        document.querySelectorAll('[data-remover]').forEach(botao => {

            // define o que acontece ao clicar no botao
            botao.onclick = () => {

                // pega o id do evento
                const id = Number(botao.dataset.remover);

                // cria uma nova lista sem o evento removido
                const novaLista = inscricoes.filter(item => item !== id);

                // salva a nova lista no navegador
                localStorage.setItem('inscricoes', JSON.stringify(novaLista));

                // atualiza a pagina
                atualizar();
            };

        });

        // define o que acontece ao clicar em confirmar
        document.querySelector('#confirmar').onclick = async () => {

            // pega o botao de confirmar
            const botao = document.querySelector('#confirmar');

            // desabilita o botao enquanto confirma
            botao.disabled = true;
            botao.textContent = 'Confirmando...';

            // tenta enviar as inscricoes para o backend
            try {

                // pega os ids dos eventos selecionados
                const ids = selecionados.map(evento => evento.id);

                // envia as inscricoes para o backend
                const resultado = await confirmarInscricoes(ids);

                // mostra a mensagem recebida do backend
                alert(resultado.mensagem);

            } catch (erro) {

                // mostra uma mensagem caso aconteca algum erro
                alert('Erro ao confirmar inscrições. Verifique o backend.');

            } finally {

                // ativa o botao novamente
                botao.disabled = false;
                botao.textContent = 'Confirmar inscrições';
            }
        };
    }

    // mostra as inscricoes na tela
    atualizar();
}
