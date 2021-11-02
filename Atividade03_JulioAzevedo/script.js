//Lista de palavras
const palavras = ["maria","jose","carlos","antonio","luiz","bryam","bruno","leandro","marcio","paula","juliana","natalia","priscila","krys","julio"];
let palavra = palavras[Math.floor(Math.random() * palavras.length)];
let chances = 5;
let acertos = 0;
let imagem = 0;
let posicao;

// Player Name
let nomeJogador = prompt("Digite seu nome");
let mostrarNomeJogador = document.getElementById("nomeJogador");
mostrarNomeJogador.innerHTML = nomeJogador;


for (posicao = 0; posicao < palavra.length; posicao++) {
    let span = document.createElement("span");
    span.setAttribute('id', posicao);
    span.setAttribute('class', 'hangman-letter');

    let div = document.getElementById("palavra");
    div.appendChild(span);
}

let alfabeto = "abcdefghijklmnopqrstuvwxyz";
let letras = alfabeto.split("");

for (posicao = 0; posicao < letras.length; posicao++) {
    let botao = document.createElement("button");
    botao.setAttribute('class', 'btn btn-dark')
    let letra = document.createTextNode(letras[posicao]);
    
    botao.appendChild(letra);
    botao.setAttribute('onclick', 'escolheLetra(\''+letras[posicao]+'\')');
    botao.setAttribute('id', letras[posicao]);

    let div = document.getElementById("letras");
    div.appendChild(botao);
}

function escolheLetra(letra) {

    let acertou = false;

    for (posicao = 0; posicao < palavra.length; posicao++) {
        if (letra === palavra[posicao]) {
            let span = document.getElementById(posicao);
            let l = document.createTextNode(letra);

            span.appendChild(l);

            let botao = document.getElementById(letra);
            botao.setAttribute('class', 'btn btn-dark certa');
            botao.removeAttribute('onclick');

            acertos++;
            acertou = true;
        }
    }

    if (!acertou) {
        imagem++;
        document.getElementById("forca").src = "img/forca-"+imagem+".png";

        let botao = document.getElementById(letra);
        botao.setAttribute('class', 'btn btn-dark errada');
        botao.removeAttribute('onclick');

        chances--;
    }

    if (chances === 0) {
        let mensagem = document.createElement("p");
        let textoPerdeu = document.createTextNode("Você perdeu!");
        mensagem.appendChild(textoPerdeu);

        let resposta = palavra;
        alert(`O nome correto era ${resposta.toUpperCase()}. Mais sorte na proxima`)
        

        let botao = document.createElement("button");
        let jogarNovamente = document.createTextNode("jogar novamente");
        
        botao.appendChild(jogarNovamente);
        botao.setAttribute('class', 'btn btn-primary novo-btn');
        botao.setAttribute('onclick', 'window.location.reload()');

        let div = document.getElementById("novo");
        div.appendChild(mensagem);
        div.appendChild(botao);
    }

    if (acertos === palavra.length) {

        let mensagem = document.createElement("p");
        mensagem.setAttribute('class', 'mt-3 mb-2')
        let textoVenceu = document.createTextNode("Meus Parabéns, você venceu!");
        mensagem.appendChild(textoVenceu);

        let botao = document.createElement("button");
        let jogarNovamente = document.createTextNode("jogar novamente");
        
        botao.appendChild(jogarNovamente);
        botao.setAttribute('class', 'btn btn-primary novo-btn');
        botao.setAttribute('onclick', 'window.location.reload()');

        let div = document.getElementById("novo");
        div.appendChild(mensagem);
        div.appendChild(botao);
    }
}

console.log(palavra);