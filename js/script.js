function vaiPara(cena) {
  if (cena.indexOf("-") == -1) {
    cena += "-0";
  }
  document.getElementById("tela").innerHTML =
    document.getElementById(cena).innerHTML;
}

function calculaVotos() {
  for (let id in personagem) {
    let aux = personagem[id].relacionamento;
    if (aux == "jogador") {
      console.log("Chamou a função calculaVoto()");
    }
    else {
      let naleat = numeroAleatorio(100);
      if (naleat <= aux) {
        personagem["jogador"].votos++;
        personagem["jogador"].relacionamento += 8;
      }
    }
  }
}

function calculaFinal() {
  chamafoto('');
  var votosFinal = personagem["jogador"].relacionamento;
  vencedor = document.getElementById("vencedor");
  if (votosFinal < 35) {
    trocaFundo('final-nikolas');
    console.log("Nikolas Ferreira");
    vencedor.innerHTML = 'Nikolas Ferreira!';
  }
  else if (votosFinal >= 35 && votosFinal < 65) {
    trocaFundo('final-lula');
    console.log("Lula");
    vencedor.innerHTML = 'Lula!'
  }
  else {
    trocaFundo('final-jogador');
    console.log("Jogador");
    vencedor.innerHTML = 'Você!!!!'
  }
}

function trocaDialogo(elementoBotao, personagem, id) {
  dialogo = `dialogo-${personagem}-${id}`;
  respostas = `botoes-${personagem}-${id}`;


  document.getElementById("dialogos").innerHTML = document.getElementById(dialogo).innerHTML;
  document.getElementById("botoes").innerHTML = document.getElementById(respostas).innerHTML;

  if (id != 0) {
    salvarLogJogador(personagem, id, elementoBotao);
  }
  salvarLogPers(personagem, dialogo);

  if (id == 0){
    adicionaLogPers(personagem)
  }
}

function adicionaLogPers(pers){
  document.getElementById("listaPersonagens").innerHTML += `<li><img src="images/personagens/${pers}.png" alt="${personagem[pers].nome} ${personagem[pers].snome}">
  ${personagem[pers].nome} ${personagem[pers].snome}</li>` 
} 

function chamafoto(personagem) {
  foto = document.getElementById('imgpersonagem');
  if (personagem) {
    foto.style.display = "block";
    foto.innerHTML = '<img src="images/personagens/' + personagem + '.png" alt="' + personagem + '" class="personagem" />';
  }
  else {
    foto.style.display = "none";
  }
}

//Função utilizada para adicionar a area não escolhida na parte do intervalo, sim é a coisa mais tosca já vista, mas funcioan especificamente para o único lugar que vai ter escolha pra onde ir no jogo
//OBS: só funciona pra cena com 2 áreas
controle = 0;
function areaNaoEscolhida(areaEscolhida) {
  controle++;
  if (areaEscolhida == 'biblioteca') {
    document.getElementById("areaNaoEscolhida").innerHTML = "cantina";
    nEscolhida = "cantina";
  }
  else {
    document.getElementById("areaNaoEscolhida").innerHTML = "biblioteca";
    nEscolhida = "biblioteca";
  }

}

timer = 15;
function iniciarMinigame() {
  document.getElementById('hudinventario').style.display = 'none';
  document.getElementById('temporizador').style.display = 'block'
  atualizaTempo();
  document.getElementById('minigame').remove();
  ponteirotempo = setInterval(diminuiTempo, 1000);
  ponteirobarata = setInterval(apareceBarata, 1500);
}

contBarata = 1;
baratasMortas = 0;
function apareceBarata() {
  document.getElementById('spawnBarata').innerHTML += `
      <img src = "images/minigame/barata.gif" onclick="mataBarata(${contBarata})" class="barata" id="barata${contBarata}">
      `
  document.getElementById('barata' + contBarata).style.top = numeroAleatorio(90) + '%';
  document.getElementById('barata' + contBarata).style.right = numeroAleatorio(90) + '%';
  document.getElementById('barata' + contBarata).style.left = numeroAleatorio(90) + '%';
  document.getElementById('barata' + contBarata).style.bottom = numeroAleatorio(90) + '%';
  contBarata++;
}

function diminuiTempo() {
  timer--;
  if (timer == 0) {
    clearInterval(ponteirobarata);
    clearInterval(ponteirotempo);
    vaiPara('fim-minigame');
    document.getElementById('hudinventario').style.display = 'flex';
    chamafoto('enzo');
    if (baratasMortas == 0) {
      document.getElementById('fim-enzo').innerHTML = 'Seu filho da puta, inutil do caralho';
      menosRelacionamento('enzo', 30);

    }
    else if (baratasMortas < 6) {
      document.getElementById('fim-enzo').innerHTML = 'Vejo que você matou algumas baratas, mas não o suficiente, não gosto desses políticos que só falam.';
      menosRelacionamento('enzo', 30);
    }
    else if (baratasMortas >= 6) {
      document.getElementById('fim-enzo').innerHTML = 'Nossa, nem sei como te agradecer, mas meu voto em você já está garantido';
      maisRelacionamento('enzo', 30);
    }
  }

  atualizaTempo();
}

function atualizaTempo() {
  document.getElementById('tempo').innerHTML = timer;
}

function mataBarata(contbarata) {
  baratasMortas++;
  document.getElementById('barata' + contbarata).remove();
  horasComp(5);
}

//funções de relacionamento/fofoca, etc
function maisRelacionamento(personagemID, relacionamento) {
  personagem[personagemID].relacionamento += relacionamento;
  exibirRelacionamento(personagemID);
  if (personagem[personagemID].relacionamento > 100) {
    personagem[personagemID].relacionamento = 100;
  }
}

function menosRelacionamento(personagemID, relacionamento) {
  personagem[personagemID].relacionamento -= relacionamento;
  exibirRelacionamento(personagemID);
  if (personagem[personagemID].relacionamento < 0) {
    personagem[personagemID].relacionamento = 0;
  }
}

function exibirRelacionamento(personagemID) {
  //armazena o valor do relacionamento em uma variavel
  //usa a "gambiarra" de usar id como variável que o sor mostrou na aula
  document.getElementById("hudRelacionamento").style.backgroundColor = "rgb(0, 70, 128)";
  document.getElementById("barraExterna").style.backgroundColor = "rgb(255, 255, 255, 1)";
  valorRelacionamento = personagem[personagemID].relacionamento;
  barraInterna.style.height = `${valorRelacionamento}%`;
  document.getElementById("nomeBarra").innerHTML = `${personagem[personagemID].nome} ${personagem[personagemID].snome}`;
  if (valorRelacionamento < 40) {
    barraInterna.style.backgroundColor = "rgba(255,0,0,0.7)";
  }
  else if (valorRelacionamento >= 40 && valorRelacionamento < 70) {
    barraInterna.style.backgroundColor = "rgba(255,255,0,0.7)";
  }
  else {
    barraInterna.style.backgroundColor = "rgba(0,255,0,0.7)";
  }
}

//recebe um vetor de personagens e aumenta o relacionamento com eles
function maisRelacionamentoItem(gPersonagem, vAumento) {
  for (let i = 0; i < gPersonagem.length; i++) {
    let id = gPersonagem[i];
    personagem[id].relacionamento += vAumento;
    if (personagem[id].relacionamento > 100) {
      personagem[id].relacionamento = 100;
    }
    console.log(`${personagem[id].relacionamento}`);
  }
}

//aumenta o relacionamento com todos
function maisRelacionamentoTodos(vAumento) {
  //id recebe as chaves de texto: 'messi', 'sheldon', 'gustavo', etc.
  for (let id in personagem) {
    personagem[id].relacionamento += vAumento;
    if (personagem[id].relacionamento > 100) {
      personagem[id].relacionamento = 100;
    }
  }
}

//função que calcula qual div sair que o jogador vai obter, quanto maior o número, maiores as recompensas que o fim do diálogo vai proporcionar
function calculaSair(nomePersonagem, minRel) {
  //atribui o relacionamento para uma variável para evitar escrever esse monte de texto
  relacionamento = personagem[nomePersonagem].relacionamento
  if (relacionamento <= minRel) {
    return "sair" + 0;
  }
  else {
    return "sair" + 1;
  }
}

function horasComp(horas) {
  jogador.horas_com += horas;
  document.getElementById('horas').innerHTML = '<i class="fa-regular fa-clock" style="color: #ffffff;"></i><span id="nhoras">  ' + jogador.horas_com + "</span>";
}

function numeroAleatorio(max) {
  return Math.floor(Math.random() * max);
}

//Função que exibe o item na tela
function item(idItem, npersonagem) {
  hud = document.getElementById("hud-itens");
  hud.style.display = "flex";
  hud.style.height = "70vh";
  hud.style.width = "70vw";
  hud.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  hud.style.borderColor = "white";
  hud.innerHTML = document.getElementById(idItem).innerHTML;
  document.getElementById("n" + idItem).innerHTML = itens[npersonagem].Inome;
  document.getElementById("d" + idItem).innerHTML = itens[npersonagem].DescItem;
  console.log("Chamou item")
}

function addInvent(item) {
  document.getElementById("items").innerHTML += '<img src="images/itens/' + item + '.png" alt="' + item + '" class="itemInvent" id="' + item + '"/>';
  console.log("Chamou a funcao invent");
}

function chamaInv() {
  document.getElementById("hudInv").innerHTML = document.getElementById("inventario").innerHTML;
  console.log("Chamou a funcao chamaInv");
}
function chamaLoja() {
  document.getElementById("hud-loja").innerHTML = document.getElementById("lojinha").innerHTML;
  console.log("Chamou a funcao chamaLoja");
}

function mostraloja() {
  document.getElementById("tela").innerHTML += document.getElementById("itensLoja").innerHTML;
  document.getElementById("hud-loja").style.display = "none";
}

function comprar(itemID, preco) {
  if (jogador.horas_com >= preco) {
    addInvent(itemID);
    horasComp(-preco);
  } else {
    document.getElementById("semmoney").innerHTML = "Você não tem horas de comunicação suficientes para comprar este item!";
  }
}

function fecharLoja() {
  document.getElementById("quadrado-loja").remove();
  document.getElementById("hud-loja").style.display = "block";
}
function limpaItem() {
  document.getElementById("hud-itens").style.display = "none";
}

function trocaFundo(fundo) {
  document.getElementById(
    "tela"
  ).style = `background-image: url(images/cenarios/${fundo}.png);`;
}

function limpaBarra() {
  document.getElementById("barraExterna").style.backgroundColor = "rgba(255, 255, 255, 0)";
  document.getElementById("nomeBarra").innerHTML = "";
  document.getElementById("barraInterna").style.height = "0px";
  document.getElementById("barraInterna").style.backgroundColor = "white";
}

function confirmaReinicio() {
  document.querySelector("main").classList.add("disabled")
  document.querySelector("nav").classList.add("disabled")

  confirmacaoReiniciar.style.display = "flex"
  setTimeout(() => {
    confirmacaoReiniciar.style.opacity = "1";
    confirmacaoReiniciar.style.transform = "scale(1)"
  }, 1)
}

function cancelaReinicio() {
  confirmacaoReiniciar.style.opacity = "0";
  confirmacaoReiniciar.style.transform = "scale(0.85)"
  setTimeout(() => {
    confirmacaoReiniciar.style.display = "none"
  }, 0.26 * 1000)
  document.querySelector("main").classList.remove("disabled")
  document.querySelector("nav").classList.remove("disabled")
}
function salvarLogPers(nome, dialogo) {
  if (nome in personagem) {
    tamanho = personagem[nome].log.length;
    fala = document.getElementById(dialogo).innerHTML.trim();


    personagem[nome].log[tamanho] = fala
  }
}

function salvarLogJogador(nome, nivel, botao) {
  if (nome in personagem) {
    tamanho = personagem[nome].log.length;
    console.log(nivel)

    fala = botao.innerHTML.trim()

    personagem[nome].log[tamanho] = fala;
  }
}

jogador = {
  horas_com: 0,
};
// dialogos: os números abaixo do nome do personagem são os diálogos diferentes dependendo da resposta do jogador
//OBS: quanto maior o nível, mais rude o jogador foi com o personagem
personagem = {
  //objeto do jogador controla a quantidade de votos finais da cena do debate
  jogador: {
    nome: "Voto",
    snome: "Público",
    relacionamento: 0,
    votos: 0,
  },
  sheldon: {
    nome: "Sheldon",
    snome: "Cooper",
    relacionamento: 30,
    log: [],
  },
  messi: {
    nome: "Lionel",
    snome: "Messi",
    relacionamento: 30,
    log: [],
  },
  house: {
    nome: "Dr.",
    snome: "House",
    relacionamento: 30,
    log: [],
  },
  davi: {
    nome: "Davi",
    snome: "Brito",
    relacionamento: 30,
    log: [],
  },
  alanpa: {
    nome: "Alan",
    snome: "Patrick",
    relacionamento: 30,
    log: [],
  },
  bigolin: {
    nome: "Marcio",
    snome: "Bigolin",
    relacionamento: 30,
    log: [],
  },
  theo: {
    nome: "Theo",
    snome: "Petrusch",
    relacionamento: 30,
    log: [],
  },

  vinicius: {
    nome: "Vinicius",
    snome: "Colussi",
    relacionamento: 30,
    log: [],
  },

  gustavo: {
    nome: "Gustavo",
    snome: "Gonçalves",
    relacionamento: 50,
    log: [],
  },
  enzo: {
    nome: "Enzo",
    snome: "Ferreira",
    relacionamento: 30,
    log: [],
  },
  lula: {
    nome: "Luiz",
    snome: "Lula",
    log: [],
  },
  nikolas: {
    nome: "Nikolas",
    snome: "ferreira",
    log: [],
  },

};

//itens que são dados como recompensa por terminar um diálogo com um bom relacionamento com o personagem
itens = {
  sheldon: {
    IDitem: "papel",
    Inome: "Papel de Fórmulas",
    DescItem: "Um papel contendo a maioria das fórmulas de física quântica, concede bônus para personagens que precisem de nota",
  },
  gustavo: {
    IDitem: "oculos",
    Inome: "Óculos Escuros",
    DescItem: "Óculos escuros muito legais, concedem mais relacionamento com todas as pessoas que você conversar",
  },
  messi: {
    IDitem: "bola",
    Inome: "Bola de Futebol",
    DescItem: "Uma bola de futebol entregada e autografada pelo Messi, concede bônus em relacionamento com pessoas que gostam do esporte"
  },
  enzo: {
    IDitem: "inseticida",
    Inome: "Inseticida",
    DescItem: "Uma garrafa de spray de inseticida, pode ser usado para matar baratas"
  }
}

//grupos de personagens que serão afetados pelos itens
grupos = {
  papel: ["gustavo", "messi", "enzo"],
  bola: ["alanpa", "theo", "davi"]
};