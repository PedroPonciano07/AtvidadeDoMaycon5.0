
export function CardEvento(evento, inscrito) {

    // cria a data do evento
    const data = new Date(evento.data + 'T00:00:00');

    // transforma a data para o formato brasileiro
    const dataFormatada = data.toLocaleDateString('pt-BR');

    // define o texto inicial do botao
    let textoBotao = 'Inscrever-se';

    // deixa o botao habilitado inicialmente
    let botaoDesabilitado = '';

    // verifica se o usuario ja esta inscrito no evento
    if (inscrito) {
        // muda o texto do botao para inscrito
        textoBotao = 'Inscrito';

        // desabilita o botao
        botaoDesabilitado = 'disabled';
    }

    // retorna o html do card do evento
    return `
        <article class="card">
            <img src="${evento.imagem}" alt="Imagem do evento ${evento.nome}">

            <div class="conteudo">
                <small>${evento.categoria}</small>

                <h3>${evento.nome}</h3>

                <p>${evento.descricao}</p>

                <p><b>Data:</b> ${dataFormatada} às ${evento.horario}</p>

                <p><b>Local:</b> ${evento.local}</p>

                <button data-inscrever="${evento.id}" ${botaoDesabilitado}>
                    ${textoBotao}
                </button>
            </div>
        </article>
    `;
}
