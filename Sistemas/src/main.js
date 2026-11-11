
 // importa o arquivo de estilos
import './style.css'

// importa as funcoes das paginas
import { mostrarEventos } from './pages/Eventos.js'
import { mostrarInscricoes } from './pages/MinhasInscricoes.js'

// pega o elemento principal da pagina
const app = document.querySelector('#app')

// funcao que troca de pagina
export function navegar(pagina) {
  // verifica se a pagina escolhida e inscricoes
  if (pagina === 'inscricoes') {
    mostrarInscricoes(app)
  } else {
    // se nao for inscricoes, mostra os eventos
    mostrarEventos(app)
  }
}

// inicia o site mostrando os eventos
navegar('eventos')
