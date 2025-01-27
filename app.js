// Criacao de uma lista/array com os numeros ja sortiados
// criacao de uma nova variavel para informar quantos elementos ha na lista
let listaDeNumerosSorteados = [];
let numeroLimite = 30;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Sempre que os comandos tiverem diferencas minimas, podemos fazer a juncao delas.
// E de boa pratica evitar a repeticao de codigos com funcoes.
// Essas funcoes executam mas NAO retornam valores.
// Habilitando a opcao de narrar/falar no jogo. Devo indicar o que sera narrado, idioma e velocidade
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    }

// Como exibir a quantidade de 'vezes' que o jogo foi reiniciado
// Criacao da funcao com as mensagens 
function exibirMensagemInicial(){
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 30');
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
}
exibirMensagemInicial();

// Usando Boolean para comparar valor
// Caso quando acerto
// Adicionando o numero de tentativas na mensagem de acerto. Lembrar de criar uma variavel pra ela.
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
// Como habilitar o botao de novo jogo na tela quando tiver o acerto do numero.
// O ById e devido ao codigo do botao no HTML (linha 28). Esta disabled.
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O numero secreto e menor');
        } else {
            exibirTextoNaTela('p', 'O numero secreto e maior');
        }
        tentativas++;
// Como limpar o campo para que o numero que tentei nao fique aparecendo (suma)
// O html nao reconhece como uma funcao, entao preciso cria-la
        limparCampo();
    }
}

// quero verificar se na minha lista ja tem o numero escolhido. Uso o includes.
// Vou pedir que um novo numero seja gerado caso o numero ja esteja na lista.
// preciso pedir tambem para gerar caso nao esteja na lista.
// preciso pedir pra incluir o novo numero na lista para nao dar duplicidade na proxima vez.
// uso o console.log para checar o comportamento do codigo.
// apos estourar a quantidade de possibilidades, o jogo da um erro.
// faco uma funcao para informar a quantidades de elementos e assim, 
// criar outra para que o jogo abra novamente apos estourar as possibilidades.
// troco a variavel da quantidade limite de elementos.
function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == 3){
            listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
            return gerarNumeroAleatorio();
    } else {
            listaDeNumerosSorteados.push(numeroEscolhido);
            console.log(listaDeNumerosSorteados);
            return numeroEscolhido;
    }
}
// criacao da "funcao" para limpar a tela. Nao ha retorno.
// Para que o texto fique vazio, basta colocar aspas sem nada dentro ''.
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

// Criando uma funcao para fazer o botao de novo jogo funcionar
// Lembrando que preciso dizer o que e necessario fazer novamente.
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
// Ao inves de copiar as mensagens, posso criar uma funcao para elas, assim diminuo o codigo
    exibirMensagemInicial();
// Aqui o botao de NOVO JOGO so fica habilitado se o jogador acertou o numero.
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
