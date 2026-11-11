
// importa a funcao navegar do arquivo main.js
import { navegar } from '../main.js'

// cria a funcao que monta a barra de navegacao
export function Navbar() {
  // retorna o html da barra de navegacao
  return `
    <header>
      <h2>SistemasEventos</h2>
      <nav>
        <button id="ir-eventos">Eventos</button>
        <button id="ir-inscricoes">Minhas inscrições</button>
      </nav>
    </header>
  `
}

// cria a funcao que ativa os botoes da barra de navegacao
export function ativarNavbar() {
  // quando clicar no botao eventos, abre a pagina de eventos
  document.querySelector('#ir-eventos').onclick = () => navegar('eventos')

  // quando clicar no botao inscricoes, abre a pagina de inscricoes
  document.querySelector('#ir-inscricoes').onclick = () => navegar('inscricoes')
}
