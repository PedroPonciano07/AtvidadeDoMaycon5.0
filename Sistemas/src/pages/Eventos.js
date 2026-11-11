
import { buscarEventos } from '../services/api.js'
import { Navbar, ativarNavbar } from '../components/Navbar.js'
import { CardEvento } from '../components/CardEvento.js'

// pega as inscricoes salvas no navegador
function obterInscricoes() {
  return JSON.parse(localStorage.getItem('inscricoes') || '[]')
}

// funcao que mostra os eventos na tela
export async function mostrarEventos(app) {

  // monta a estrutura da pagina
  app.innerHTML = `
    ${Navbar()}
    <main>
      <h1>Eventos disponíveis</h1>
      <p>Confira os eventos e faça sua inscrição.</p>
      <input id="busca" placeholder="Buscar eventos..." type="search">
      <div id="lista" class="grade">Carregando...</div>
    </main>
  `

  // ativa os botoes da barra de navegacao
  ativarNavbar()

  // pega a div onde os eventos serao mostrados
  const lista = document.querySelector('#lista')

  // variavel que vai guardar os eventos
  let eventos

  // tenta buscar os eventos do backend
  try {
    eventos = await buscarEventos()
  } catch (erro) {
    // mostra uma mensagem caso aconteca algum erro
    lista.textContent = 'Erro ao buscar eventos. Verifique se o backend está ligado.'
    return
  }

  // funcao que atualiza a lista de eventos
  function atualizar() {

    // pega o que foi digitado na busca
    const busca = document.querySelector('#busca').value.toLowerCase()

    // pega as inscricoes salvas
    const inscricoes = obterInscricoes()

    // filtra os eventos de acordo com a pesquisa
    const filtrados = eventos.filter(evento =>
      (evento.nome + ' ' + evento.local + ' ' + evento.categoria).toLowerCase().includes(busca)
    )

    // mostra os eventos encontrados na tela
    lista.innerHTML = filtrados.length
      ? filtrados.map(evento => CardEvento(evento, inscricoes.includes(evento.id))).join('')
      : '<p>Nenhum evento encontrado.</p>'

    // pega todos os botoes de inscricao
    document.querySelectorAll('[data-inscrever]').forEach(botao => {

      // define o que acontece quando clicar no botao
      botao.onclick = () => {

        // pega o id do evento clicado
        const id = Number(botao.dataset.inscrever)

        // pega as inscricoes atuais
        const atual = obterInscricoes()

        // verifica se o usuario ja esta inscrito
        if (!atual.includes(id)) {

          // adiciona o evento nas inscricoes
          atual.push(id)

          // salva as inscricoes no navegador
          localStorage.setItem('inscricoes', JSON.stringify(atual))
        }

        // atualiza a lista de eventos
        atualizar()
      }
    })
  }

  // atualiza os eventos quando digitar na busca
  document.querySelector('#busca').oninput = atualizar

  // mostra os eventos na tela
  atualizar()
}
