function vaiPara(cena) {
    document.getElementById("tela").innerHTML =
    document.getElementById(cena).innerHTML;
}

function calculaVotos() {
  //laço que percorre o objeto dos personagens
  for (let id in personagem) {
    let aux = personagem[id].relacionamento;
    if (aux != "jogador") {
      let naleat = numeroAleatorio(100);
      //se o número aleatório for menor que o relacionamento, adiciona um voto
      if (naleat <= aux) {
        personagem["jogador"].votos++;
        personagem["jogador"].relacionamento += 8;
      }
    }
  }
}

function atualizaRelacionamento() {
  //percorre o objeto dos personagens
  for (let id in personagem) {
    let relpersonagem = personagem[id].relacionamento;
    let barra = document.getElementById('barra-' + id);

    //muda o tamanho da barra conforme o relacionamento do personagem (limitado a 100)
    barra.style.width = `${relpersonagem}%`;

    //conforme o relacionamento, troca a cor da barra
    if (relpersonagem < 40) {
      barra.style.backgroundColor = 'red';
    } else if (relpersonagem < 70) {
      barra.style.backgroundColor = 'yellow';
    } else {
      barra.style.backgroundColor = 'green';
    }
  }
}

contMenuPer = 0;
function exibeMenuPer() {

  //variável que controla em qual div do menu cada personagem vai ficar
  let contLinha=0;

  //quando chama a função, mostra o menu na tela
  let menu = document.getElementById('menu-relacionamento');
  menu.style.display = "flex";
  menu.style.height = "80%";
  menu.style.width = "80%";
  menu.style.borderColor = 'white';
  menu.style.backgroundColor = "rgba(0, 0, 0, 0.9)";

  //se for a primeira chamada da função, adiciona os personagens no menu
  if (contMenuPer === 0) {
    for (let id in personagem) {
      if (id != 'jogador' && id != 'lula' && id != 'nikolas') {   
        if(contLinha<=4){
          document.getElementById('linha1').innerHTML += `
          <div id="hud-${id}" class="hud-personagem">
            <span id="nome-hud-${id}"></span>
            <div id="barra-${id}" class="barra-hud"></div>
          </div>
        `;
        }
        else{
          document.getElementById('linha2').innerHTML += `
          <div id="hud-${id}" class="hud-personagem">
            <span id="nome-hud-${id}"></span>
            <div id="barra-${id}" class="barra-hud"></div>
          </div>
        `;
        }
        document.getElementById('hud-' + id).innerHTML += `<img src="images/logPersonagens/${id}.png" class="img-hud" onclick="darItem('coxinha','${id}',10)">`;
        document.getElementById('nome-hud-' + id).innerHTML = `${personagem[id].nome} ${personagem[id].snome}`;
        contLinha++
      }
    }
    //garante que os personagens só serão adicionados uma vez
    contMenuPer++;
  }
  atualizaRelacionamento();
}

function darItem(item,nome,rel){

  //variável que adiciona o nome do item no span de "não tem mais (item)"
  var itemspan = item;

  //funções que adicionam especificamente cada nome no span de "não tem mais"
  if(item!="coxinha" && jogador[item]==0){
      if(item=="pacote_pokemon"){
        itemspan = "pacote de cartinhas"
      }
      else if(item=="mini_megafone"){
        itemspan = "mini megafone";
      }
  }

  //como cada item tem funções muito diferentes, não consegui achar outro jeito de realizar isso

  //se o jogador estiver com o item no inventário, executa isso
  if(jogador[item] > 0){
    document.getElementById(item).remove();
    jogador[item]--;
    if(item=="pacote_pokemon"){
      maisRelacionamento(nome,rel);
      trocaDialogo(document.getElementById("darItemTheo"), nome,15);
    }
    if(item=="mini_megafone"){
      trocaDialogo(this, 'lula', 0);
    }
    else{
    //se entra aqui é coxinha
    personagem[nome].relacionamento += rel;
    atualizaRelacionamento();
    }
    //controla o máximo do relacionamento em 100
    if(personagem[nome].relacionamento>100){
      personagem[nome].relacionamento = 100;
    }
  }
  //adiciona o span de "não tem mais"
  else{
    document.getElementById('tela').innerHTML += `<span id='sem-${item}-${nome}' class='sem-coxinha'">Você não tem ${itemspan}</span>`

    //animaçãp dp item subindo (sei que dava pra fazer com keyframes, mas fiz isso antes da aula de keyframes e to com preguiça de trocar)
    setTimeout(() => {
      document.getElementById('sem-'+item+'-'+nome).style.top = "50%";
    }, 1);
    setTimeout(() => {
      document.getElementById('sem-'+item+'-'+nome).style.opacity = '0';
    }, 10);
    setTimeout(() => {
      document.getElementById('sem-'+item+'-'+nome).remove();
    }, 1500);
  }
}

function fechaMenuPer() {
  document.getElementById('menu-relacionamento').style.display = 'none';
}

function calculaFinal() {

  //retira a foto do personagem da tela
  chamafoto('');

  //pega o relacionamento geral do personagem com o público e calcula qual final ele vai ter
  var votosFinal = personagem["jogador"].relacionamento;
  vencedor = document.getElementById("vencedor");
  if (votosFinal < 35) {
    trocaFundo('final-nikolas');
    
    vencedor.innerHTML = 'Nikolas Ferreira!';
  }
  else if (votosFinal >= 35 && votosFinal < 65) {
    trocaFundo('final-lula');
    
    vencedor.innerHTML = 'Lula!'
  }
  else {
    trocaFundo('final-jogador');
    
    vencedor.innerHTML = 'Você!!!!'
  }
}

function trocaDialogo(elementoBotao, personagem, id) {
  dialogo = `dialogo-${personagem}-${id}`;
  respostas = `botoes-${personagem}-${id}`;


  document.getElementById("dialogos").innerHTML = document.getElementById(dialogo).innerHTML;
  document.getElementById("botoes").innerHTML = document.getElementById(respostas).innerHTML;

  if (id == 0) {
    addLogPers(personagem)
  }

  if (id != 0) {
    salvarLogJogador(personagem, elementoBotao);
  }
  salvarLogPers(personagem, dialogo);

  //se a função trocadialogo() receber o parâmetro sair(sai de um diálogo), adiciona a hora da conversa no menu de log
  if (String(id).indexOf("sair") == 0) {
    data = new Date();
    horas = String(data.getHours())
    if (horas.length == 1) {
      horas = "0" + horas
    }
    minutos = String(data.getMinutes())
    if (minutos.length == 1) {
      minutos = "0" + minutos
    }

    document.getElementById(`horario-${personagem}`).innerHTML = `${horas}:${minutos}`
  }
}

function addLogPers(pers) {

  //se o personagem está np objeto "personagem" adiciona a opção de conversa no log
  if (pers in personagem) {
    document.getElementById("listaPersonagens").innerHTML += `
        <li onclick="abreConversa('${pers}')">
          <img src="images/logPersonagens/${pers}.png" alt="${personagem[pers].nome} ${personagem[pers].snome}">
          <span>${personagem[pers].nome} ${personagem[pers].snome}</span>
          <span id="horario-${pers}"></span>
        </li>
        <div class="linha"></div>`}
}

function chamafoto(personagem) {
  foto = document.getElementById('imgpersonagem');
  //se foi passado um valor para o personagem adiciona a foto
  if (personagem) {
    foto.style.display = "block";
    foto.innerHTML = '<img src="images/personagens/' + personagem + '.png" alt="' + personagem + '" class="personagem" />';
  }
  //se o valor for nulo, esconde a foto
  else {
    foto.style.display = "none";
  }
}

//Função utilizada para adicionar a area não escolhida na parte do intervalo, sim é a coisa mais tosca já vista, mas funciona especificamente para o único lugar que vai ter escolha pra onde ir no jogo
controle = 0;
function areaNaoEscolhida(areaEscolhida) {
  controle++;
  //se o jogador escolhe a biblioteca, adiciona a opção da cantina na outra cena, se não, faz o contrário
  if (areaEscolhida == 'biblioteca') {
    document.getElementById("areaNaoEscolhida").innerHTML = "cantina";
    nEscolhida = "cantina";
  }
  else {
    document.getElementById("areaNaoEscolhida").innerHTML = "biblioteca";
    nEscolhida = "biblioteca";
  }

}

//variável que determina quantos segundos o minigame terá
timer = 15;
function iniciarMinigame() {
  //muda a música
  document.getElementById('musica-fundo').pause();
  document.getElementById('musica-minigame').play();

  //esconde os menus
  document.getElementById('menu-icones').style.display = 'none';
  document.getElementById('icone-loja').style.display = 'none';

  //mostra o temporizador
  document.getElementById('temporizador').style.display = 'block'
  atualizaTempo();

  //remove os botões de iniciar o minigame
  document.getElementById('minigame').remove();

  //ponteiro para controle do tempo e da aparição das baratas
  ponteirotempo = setInterval(diminuiTempo, 1000);
  ponteirobarata = setInterval(apareceBarata, 1500);
}

//variável que controla qual barata que o jogador clicou para matar
contBarata = 1;

//conta quantas baratas o jogador matou
baratasMortas = 0;

function apareceBarata() {
  //simplesmente spawna uma barata em um lugar aleatório de uma área delimitada
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
  //se o timer acaba, exibe a cena final do enzo e acaba com os setInterval
  if (timer == 0) {
    clearInterval(ponteirobarata);
    clearInterval(ponteirotempo);
    document.getElementById("tela").innerHTML = `
    <div id="imgpersonagem" class="personagem"></div>
      <div id="hud" class="hud">
        <p id="dialogos" class="dialogo">
          <span id="fim-enzo"></span>
        </p>
        <div id="botoes" class="bot-opc">
          <button type="button"
            onclick="trocaFundo('biblioteca');mostraIcones();trocaDialogo(this, 'biblioteca',1); chamafoto('');limpaBarra();voltamusica()"
            class="opcao">
            Continuar
          </button>
        </div>
      </div>`
    document.getElementById('hudinventario').style.display = 'flex';
    chamafoto('enzo');

    //conforme quantas baratas foram mortas, exibe diálogos diferentes com o enzo
    if (baratasMortas == 0) {
      document.getElementById('fim-enzo').innerHTML = 'Como você não conseguiu matar nenhuma barata, que político inútil!';
      menosRelacionamento('enzo', 30);
    }
    else if (baratasMortas < 6) {
      document.getElementById('fim-enzo').innerHTML = 'Vejo que você matou algumas baratas, mas não o suficiente, não gosto desses políticos que só falam.';
      menosRelacionamento('enzo', 15);
    }
    else if (baratasMortas >= 6) {
      document.getElementById('fim-enzo').innerHTML = 'Nossa, nem sei como te agradecer, mas meu voto em você já está garantido';
      maisRelacionamento('enzo', 30);
    }
  }

  atualizaTempo();
}

function atualizaTempo() {
  //atualiza o timer exibido na tela
  document.getElementById('tempo').innerHTML = timer;
}

function voltamusica(){
  //volta a música do início
  document.getElementById('musica-minigame').pause();
  document.getElementById('musica-fundo').play();
  document.getElementById('musica-fundo').currentTime = 0;
}

function mataBarata(contbarata) {
  //remove a barata da tela e toca o áudio da morte dela
  baratasMortas++;
  document.getElementById('barata' + contbarata).remove();
  horasComp(5);
  document.getElementById('som-barata').innerHTML += `<audio src="audio/matabarata.mp3" id="som-barata${contbarata}" autoplay></audio>`
}

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
  //mostra a barra de relacionamento no lado direito da tela
  document.getElementById("hudRelacionamento").style.backgroundColor = "rgb(0, 70, 128)";
  document.getElementById("barraExterna").style.backgroundColor = "rgb(255, 255, 255, 1)";

  //variável que guarda o valor do relacionamento com o personagem
  valorRelacionamento = personagem[personagemID].relacionamento;

  //altera o tamanho da barra com base no valor do relaiconamento
  barraInterna.style.height = `${valorRelacionamento}%`;

  //mostra o nome na barra
  document.getElementById("nomeBarra").innerHTML = `${personagem[personagemID].nome} ${personagem[personagemID].snome}`;

  //conforme o valor do relacionamento troca a cor da barra
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
    
  }
}

//aumenta o relacionamento com todos
function maisRelacionamentoTodos(vAumento) {
  //percorre o objeot dos personagens
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

//aumenta as horas complementares do jogador e mostra o relógio na tela
function horasComp(horas) {
  jogador.horas_com += horas;
  document.getElementById('horas').innerHTML = '<i class="fa-regular fa-clock" style="color: #ffffff;"></i><span id="nhoras">  ' + jogador.horas_com + "</span>";
}

function numeroAleatorio(max) {
  return Math.floor(Math.random() * max);
}

//mostra o menu de recompensa quando o jogador ganha um item
function item(idItem, npersonagem) {
  let hud = document.getElementById("hud-itens");
  hud.style.display = "flex";
  hud.style.zIndex = "10";
  hud.style.height = "70vh";
  hud.style.width = "70vw";
  hud.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  hud.style.borderColor = "white";

  //pega o menu de recompensa e adiciona o html que está no index, com a imagem e os spans paraa inserir o nome e descrição do determinado item
  hud.innerHTML = document.getElementById(idItem).innerHTML;

  //mostra o nome do item na tela
  document.getElementById("n" + idItem).innerHTML = itens[npersonagem].Inome;

  //mostra a descrição do item na tela
  document.getElementById("d" + idItem).innerHTML = itens[npersonagem].DescItem;
}

function limpaItem() {
  //precisa do Zindex porque, mesmo invisível, o menu impedia de clicar em alguns botões
  document.getElementById("hud-itens").style.zIndex = "-1";
  document.getElementById("hud-itens").style.display = "none";
}

function addInvent(item) {
  //adiciona um determinado item no menu de inventário
    document.getElementById("inventario").innerHTML += '<img src="images/itens/' + item + '.png" alt="' + item + '" class="itemInvent" id="' + item + '"/>';
}

function mostraIcones() {
  document.getElementById("menu-icones").style.display = 'flex';
}

function mostraloja() {
  //precisa do classList porque a classe "disabled" faz um elemento não ser mais clicável
  document.getElementById("icone-relacionamento").classList.add("disabled");
  document.getElementById("icone-loja").classList.add("disabled");
  document.getElementById("icone-log").classList.add("disabled");

  //mostra a div da loja no menu d aloja
  document.getElementById("tela").innerHTML += document.getElementById("itensLoja").innerHTML;
}

function comprar(itemID, preco) {
  jogador[itemID]++;
  //se o jogador tem horas complementares suficienter, diminui as horas com o preço do item e adiciona ele no inventário
  if (jogador.horas_com >= preco) {
    addInvent(itemID);
    horasComp(-preco);
  } else {
    document.getElementById("semmoney").innerHTML = "Você não tem horas complementares suficientes para comprar este item!";
  }
}

function fecharLoja() {
  document.getElementById("icone-loja").classList.remove("disabled");
  document.getElementById("icone-relacionamento").classList.remove("disabled");
  document.getElementById("icone-log").classList.remove("disabled");
  document.getElementById("quadrado-loja").remove();
  document.getElementById("hud-loja").style.display = "block";
}

function trocaFundo(fundo) {
  document.getElementById(
    "tela"
  ).style = `background-image: url(images/cenarios/${fundo}.png);`;
}


//em momentos de transição entre cenas, é necessário fazer a barra desaparecer
function limpaBarra() {
  document.getElementById("barraExterna").style.backgroundColor = "rgba(255, 255, 255, 0)";
  document.getElementById("nomeBarra").innerHTML = "";
  document.getElementById("barraInterna").style.height = "0px";
  document.getElementById("barraInterna").style.backgroundColor = "white";
}

function abreMenu(menu) {
  //A classe desabilita a interação fora do menu
  document.querySelector("main").classList.add("disabled")
  document.querySelector("nav").classList.add("disabled")
  document.getElementById("menu-icones").classList.add("disabled")

  document.getElementById(menu).style.display = "flex"
  // Timeout pra transição não ficar bugada
  setTimeout(() => {
    document.getElementById(menu).style.opacity = "1";
    document.getElementById(menu).style.transform = "scale(1)"
  }, 1)
}

function fechaMenu(menu) {
  document.getElementById(menu).style.opacity = "0";
  document.getElementById(menu).style.transform = "scale(0.85)"
  setTimeout(() => {
    document.getElementById(menu).style.display = "none"
  }, 0.26 * 1000)
  //Remove a classe para habilitar a interação
  document.querySelector("main").classList.remove("disabled")
  document.querySelector("nav").classList.remove("disabled")
  document.getElementById("menu-icones").classList.remove("disabled")
}

function abreConversa(pers){
  // Vai montar a conversa do personagem que o jogador clicou
  document.getElementById("log-img-conversa").innerHTML = `<img src="images/logPersonagens/${pers}.png">`
  
  document.getElementById("log-nome-conversa").innerHTML = `${personagem[pers].nome} ${personagem[pers].snome}`

  for(let i = 0; i < personagem[pers].log.length; i++){
    if (i%2 == 0){
      document.getElementById("conversaLog").innerHTML += `<div class="log-npc">${personagem[pers].log[i]}</div>`
    }
    else{
      document.getElementById("conversaLog").innerHTML += `<div class="log-player">${personagem[pers].log[i]}</div>`
    }
  }

  document.getElementById("logMenu").style.display = 'none'
  document.getElementById("logConversa").style.display = 'block'
}

function fechaConversa(){
  document.getElementById("logMenu").style.display = 'block'
  document.getElementById("logConversa").style.display = 'none'

  // Limpa toda a conversa
  document.getElementById("conversaLog").innerHTML = ''

}
function salvarLogPers(nome, dialogo) {
  if (nome in personagem) {
    tamanho = personagem[nome].log.length;
    // Usa o innerHTML para pegar o texto dentro do elemento e tira os espaços em branco com o trim()
    fala = document.getElementById(dialogo).innerHTML.trim();

    personagem[nome].log[tamanho] = fala
  }
}

function salvarLogJogador(nome, botao) {
  if (nome in personagem) {
    tamanho = personagem[nome].log.length;
    fala = botao.innerHTML.trim()

    personagem[nome].log[tamanho] = fala;
  }
}
function trocaTema(botao){
  fundo = document.querySelector("body")

  //Verifica o valor do botão e troca a cor do fundo usando className
  if(botao.value == 0){
    fundo.className = "fundoPreto"
    botao.value = 1;
  }
  else{
    fundo.className = "fundoBranco"
    botao.value = 0;
  }
}

function mutaMusica(botao){
  musica = document.getElementById("musica-fundo")

  if (botao.value == 0){
    musica.volume = 0 ;
    botao.value = 1 ;
  }
  else {
    musica.volume = 1 ;
    botao.value = 0 ;
  }
}

jogador = {
  horas_com: 0,
  coxinha: 0,
  pacote_pokemon: 0,
  mini_megafone: 0,
};

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