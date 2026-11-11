
 // endereco do backend que sera utilizado para buscar os dados
const endereco = 'http://localhost:3000/api';

// funcao que busca os eventos no backend
export async function buscarEventos() {

    // faz uma requisicao para buscar os eventos
    const resposta = await fetch(`${endereco}/eventos`);

    // verifica se a requisicao deu certo
    if (!resposta.ok) {
        throw new Error('Erro ao buscar eventos');
    }

    // transforma a resposta em json e envia os dados
    return await resposta.json();
}

// funcao que confirma as inscricoes
export async function confirmarInscricoes(ids) {

    // envia uma requisicao para o backend
    const resposta = await fetch(`${endereco}/inscricoes`, {

        // define o metodo da requisicao
        method: 'POST',

        // informa que os dados serao enviados em json
        headers: {
            'Content-Type': 'application/json'
        },

        // envia os ids das inscricoes
        body: JSON.stringify({
            inscricoes: ids
        })
    });

    // verifica se a requisicao deu certo
    if (!resposta.ok) {
        throw new Error('Erro ao confirmar inscrições');
    }

    // transforma a resposta em json e envia os dados
    return await resposta.json();
}
