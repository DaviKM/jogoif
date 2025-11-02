    function vaiPara(cena) {
      if (cena.indexOf("-") == -1) {
        cena += "-0";
      }
      document.getElementById("tela").innerHTML =
        document.getElementById(cena).innerHTML;
      //console.log(cena.substr(0, cena.indexOf('-')).toLowerCase())
      //comentei o log pq tava dando erro pra krl
      //salvarLogJogador(cena);
      //salvarLogPers(cena);
    }

    function inicializatela(){
      document.getElementById("tela").innerHTML =
        document.getElementById("inicial").innerHTML;
    }

    function trocaDialogo(personagem,id){
      document.getElementById("dialogos").innerHTML += document.getElementById("dialogo-"+personagem+"-"+id).innerHTML;
      document.getElementById("botoes").innerHTML += document.getElementById("botoes-"+personagem+"-"+id).innerHTML;
    }

    function chamafoto(personagem){
      foto = document.getElementById('imgpersonagem');
      foto.innerHTML = '<img src="images/personagens/'+ personagem +'.png" alt="'+ personagem +'" class="personagem" />';
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
    function maisRelacionamentoItem(gPersonagem, vAumento){
      for(let i=0;i<gPersonagem.length;i++){
        let id = gPersonagem[i];
        personagem[id].relacionamento += vAumento;
        if(personagem[id].relacionamento > 100){
          personagem[id].relacionamento = 100;
        }
        console.log(`${personagem[id].relacionamento}`);
      }
    }

    //aumenta o relacionamento com todos
    function maisRelacionamentoTodos(vAumento){
    //id recebe as chaves de texto: 'messi', 'sheldon', 'gustavo', etc.
    for (let id in personagem) {
            personagem[id].relacionamento += vAumento;
            if (personagem[id].relacionamento > 100) {
                personagem[id].relacionamento = 100;
            }
      }
    }

    //função que calcula qual div sair que o jogador vai obter, quanto maior o número, maiores as recompensas que o fim do diálogo vai proporcionar
    function calculaSair(nomePersonagem, minRel){
      //atribui o relacionamento para uma variável para evitar escrever esse monte de texto
      relacionamento = personagem[nomePersonagem].relacionamento
      if(relacionamento<=minRel){
        return nomePersonagem+"-sair"+0;
      }
      else{
        return nomePersonagem+"-sair"+1;
      }
    }

    function horasComp(horas) {
      jogador.horas_com += horas;
      document.getElementById('horas').innerHTML = '<i class="fa-regular fa-clock" style="color: #ffffff;"></i><span id="nhoras">  ' + jogador.horas_com + "</span>";
    }

    function numeroAleatorio(max) {
      return Math.floor(Math.random() * max);
    }

    function aleatEntre(personagens) {
      aleatorio = numeroAleatorio(personagens.length);
      sorteado = personagens[aleatorio];

      //Remove o personagem sorteado
      removePersonagem(aleatorio, personagens);

      return sorteado;
    }

    //Função para remover personagem das cenas e põe nome nos botões
    function removePersonagem(personagemRemovido, personagens) {
      personagens.splice(personagemRemovido, 1);
      console.log(personagens.length);
    }

    function nomeBotao(cena, personagens) {
      if (cena == "sala") {
        for (let i = 0; i < personagens.length; i++) {
          document.getElementById(cena + "-" + `nome${i + 1}`).innerHTML =
            personagem[personagens[i + 1]].nome +
            " " +
            personagem[personagens[i + 1]].snome;
        }
      }
      else {
        for (let i = 0; i < personagens.length; i++) {
          document.getElementById(cena + "-" + `nome${i}`).innerHTML =
            personagem[personagens[i]].nome +
            " " +
            personagem[personagens[i]].snome;
        }
      }
    }

    //Função que exibe o item na tela
    function item(idItem,npersonagem){
      hud = document.getElementById("hud-itens");
      hud.style.display = "flex";
      hud.style.height = "70vh";
      hud.style.width = "70vw";
      hud.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      hud.style.borderColor = "white";
      hud.innerHTML = document.getElementById(idItem).innerHTML;
      document.getElementById("n"+idItem).innerHTML = itens[npersonagem].Inome;
      document.getElementById("d"+idItem).innerHTML = itens[npersonagem].DescItem;
      console.log("Chamou item")
    }

    function addInvent(item){
      document.getElementById("items").innerHTML += '<img src="images/itens/'+item+'.png" alt="'+item+'" class="itemInvent" id="'+item+'"/>';
      console.log("Chamou a funcao invent");
    }
    
    function chamaInv(){
      document.getElementById("hudInv").innerHTML = document.getElementById("inventario").innerHTML;
      console.log("Chamou a funcao chamaInv");
    }

    function limpaItem(){
      document.getElementById("hud-itens").style.display="none";
    }

    contCen = 0;
    function trocaCena(cena) {
      switch (contCen){
        case 0:
          contCen++;
          vaiPara(cena + '-0');
          break;

        case 1:
          contCen++;
          vaiPara(cena + '-1');
          break;

        case 2:
          contCen++;
          vaiPara(cena + '-2');
          break;

        default:
          console.log("Erro na função 'trocaCena()'");
    }

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

    function salvarLogPers(dialogo) {
      nome = dialogo.substr(0, dialogo.indexOf("-")).toLowerCase();
      tamanho = personagem[nome].log.length;
      fala = document.getElementById(dialogo).outerHTML;
      fala = fala.split('class="dialogo">')[1];

      personagem[nome].log[tamanho] = fala.slice(0, fala.lastIndexOf("</p>"));
    }

    function salvarLogJogador(opcao) {
      nome = opcao.substr(0, opcao.indexOf("-")).toLowerCase();
      tamanho = personagem[nome].log.length;
      fala = document.querySelectorAll(
        `button[onclick="vaiPara('${opcao}')"]`
      );

      if (fala[0] != undefined) {
        personagem[nome].log[tamanho] = fala[0].outerHTML.slice(
          fala[0].outerHTML.indexOf(">"),
          fala[0].outerHTML.lastIndexOf("</")
        );
      }
    }

    jogador = {
      horas_com: 0,
    }
    // dialogos: os números abaixo do nome do personagem são os diálogos diferentes dependendo da resposta do jogador
    //OBS: quanto maior o nível, mais rude o jogador foi com o personagem
    personagem = {
      sheldon: {
        nome: "Sheldon",
        snome: "Cooper",
        relacionamento: 50,
        log: [],
      },
      messi: {
        nome: "Lionel",
        snome: "Messi",
        relacionamento: 50,
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
        relacionamento: 50,
        log: [],
      },
      alanpa: {
        nome: "Alan",
        snome: "Patrick",
        relacionamento: 50,
        log: [],
      },
      bigolin: {
        nome: "Marcio",
        snome: "Bigolin",
        relacionamento: 50,
        log: [],
      },
      theo: {
        nome: "Theo",
        snome: "Petrusch",
        relacionamento: 50,
        log: [],
      },

      vinicius: {
        nome: "Vinicius",
        snome: "Colussi",
        relacionamento: 50,
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
        relacionamento: 50,
        log: [],
      },
    };

    //itens que são dados como recompensa por terminar um diálogo com um bom relacionamento com o personagem
    itens = {
      sheldon:{
        IDitem: "papel",
        Inome: "Papel de Fórmulas",
        DescItem: "Um papel contendo a maioria das fórmulas de física quântica, concede bônus para personagens que precisem de nota",
      },
      gustavo:{
        IDitem: "oculos",
        Inome: "Óculos Escuros",
        DescItem: "Óculos escuros muito legais, concedem mais relacionamento com todas as pessoas que você conversar",
      }
    }
  
    
    //Cenas e quais personagens aparece em cada uma delas
    cenas = {
      sala: ["gustavo", "sheldon", "house", "bigolin"],
      patio: ["messi", "davi"],
    };

    //grupos de personagens que serão afetados pelos itens
    grupos = {
      papel: ["gustavo","messi","enzo"],
    };