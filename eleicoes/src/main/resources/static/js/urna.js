let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];


let voto = [
	{
		titulo: 'VEREADOR',
		numeros: 5,
		candidatos: [
			{
				numero: '12345',
				nome: 'Grace Hopper',
				partido: 'Partido Cobol',
				foto: [
					{url: '/photos/grace.jpg', legenda: 'Vereador'}
				]
			}
		]
	},
	{
		titulo: 'PRESIDENTE',
		numeros: 2,
		candidatos: [
			{
				numero: '11',
				nome: 'Lovelace',
				partido: 'Partido Java',
				foto: [
					{url: '/photos/love.jpg', legenda: 'Presidente'}
				]
			}
		]
	}
];

function comecarEtapa(){
	let etapa = voto[etapaAtual];
	let numeroHTML = '';
	numero = '';
	votoBranco = false;
	
	for(let i=0; i<etapa.numeros; i++){
		if(i===0){
			numeroHTML += '<div class="numero pisca"></div>';
		} else {
			numeroHTML += '<div class="numero"></div>';
		}
	}
	
	seuVotoPara.style.display = 'nome';
	cargo.innerHTML = etapa.titulo;
	descricao.innerHTML = '';
	aviso.style.display = 'none';
	lateral.innerHTML = '';
	numeros.innerHTML = numeroHTML;
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = numero + n;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
} 

function atualizaInterface(){
	let etapa = voto[etapaAtual];
	let candidato = etapa.candidatos.filter((item)=>{
		if(item.numero === numero){
			return true;
		} else {
			return false;
		}
	});
	
	if(candidato.length > 0){
		candidato = candidato[0];
		seuVotoPara.style.display = 'block';
		aviso.style.display = 'block';
		descricao.innerHTML = 'Nome: ' + candidato.nome + '<br>' + 'Partido: ' + candidato.partido;
		
		let fotosHTML = '';
		for(let i in candidato.foto){
			if(candidato.foto[i].small){
				fotosHTML += '<div class="d-1-image small"><img src="' + candidato.foto[i].url + '" alt=""/>' + candidato.foto[i].legenda + '</div>';
			} else {
				fotosHTML += '<div class="d-1-image"><img src="' + candidato.foto[i].url + '" alt=""/>' + candidato.foto[i].legenda + '</div>';
			}
		}
		
		lateral.innerHTML = fotosHTML;
	} else {
		seuVotoPara.style.display = 'block';
		aviso.style.display = 'block';
		descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
	}
}

function branco(){
	numero === '';
	votoBranco = true;
	
	seuVotoPara.style.display = 'block';
	aviso.style.display = 'block';
	numeros.innerHTML = '';
	descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
	lateral.innerHTML = '';
}

function corrige(){
	comecarEtapa();
}

function confirma(){
	let etapa = voto[etapaAtual];
	let votoConfirmado = false;
	
	if(votoBranco === true){
		votoConfirmado = true;
		votos.push({
			etapa: voto[etapaAtual].titulo,
			voto: 'branco'
		});
	} else if(numero.length === etapa.numeros){
		votos.push({
			etapa: voto[etapaAtual].titulo,
			voto: numero
		});
	}
	
	if(votoConfirmado){
		etapaAtual++;
		if(voto[etapaAtual] !== undefined){
			comecarEtapa();
		} else {
			document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
			console.log(votos);
		}
	}
}

comecarEtapa();
