let listaAmigos = [];
let mostrarResult = document.getElementById('result')
let resultError = document.getElementById('resultError')
let dialog = document.getElementById('dialog')
let dialogError = document.getElementById('dialogError')
let dialogReset = document.getElementById('dialogReset');
let mostrarLista = document.getElementById('listaAmigos');
let resultadoEnlazados = document.getElementById('resultadoEnlazados');
let listaAmigosEnlazados = document.getElementById('listaAmigosEnlazados');

let agregarAmigo = () =>{
    let nombre = document.getElementById('amigo').value;
    nombre = nombre.trim().toUpperCase();

    if(validarInput( nombre )){
        listaAmigos.push( nombre );
        document.getElementById('amigo').value = '';
        visualizarArray( listaAmigos );
    }
}

let validarInput = ( nombre ) =>{
    if( nombre === '' ){
        dialogError.showModal();
        resultError.innerHTML = `Ingresá un nombre`;
        return false;
    }

    if( listaAmigos.includes(nombre) ){
        dialogError.showModal();
        resultError.innerHTML = `El nombre ${nombre} ya esta cargado en la lista`;
        return false;
    }

    return true;
}

let validarLista = () => {
    if( listaAmigos.length === 0 ){
        resultError.innerHTML = `La lista está vacía.`;
        dialogError.showModal();
        return false;
    }
    return true;
}

let visualizarArray = ( listaAmigos ) =>{
    mostrarLista.innerHTML = listaAmigos.map( nombre => `<li>${nombre}</li>`).join('\n');
}

let sortearAmigo = () =>{
    if( validarLista() ){
        let amigoSorteado = Math.floor(Math.random() * listaAmigos.length);
        mostrarResult.innerHTML = `${listaAmigos[amigoSorteado]}`;
        dialog.showModal();
    }
}

let enlazarAmigo = () =>{
    if (validarLista()) {
        let arrayList = []; 
        let listaAmigosUsados = new Set(); 
        
        while (listaAmigosUsados.size < listaAmigos.length) {
            let amigoSorteado;
            let amigoSorteado2;

            do {
                amigoSorteado = Math.floor(Math.random() * listaAmigos.length);
            } while (listaAmigosUsados.has(amigoSorteado));

            
            listaAmigosUsados.add(amigoSorteado);

            if (listaAmigosUsados.size === listaAmigos.length) {
                arrayList.push(`${listaAmigos[amigoSorteado]}`);
                break
            }

            do {
                amigoSorteado2 = Math.floor(Math.random() * listaAmigos.length);
            } while (listaAmigosUsados.has(amigoSorteado2) || amigoSorteado === amigoSorteado2);

            listaAmigosUsados.add(amigoSorteado2);

            arrayList.push(listaAmigos[amigoSorteado], listaAmigos[amigoSorteado2]);
        }
        resultadoEnlazados.innerHTML = `Resultado de los enlaces:`
        listaAmigosEnlazados.innerHTML = arrayList.map((amigo, index) => {
            if (index % 2 === 0) {
                return `<div class="grid-item">${amigo} → ${arrayList[index + 1] ? arrayList[index + 1] : "SOLITO/A"}</div>`;
            }
            return '';
        }).join('');
    }
}

let borrarDatos = () => {
    dialogReset.showModal();
}

let resetData = () => {
    listaAmigos = [];
    document.getElementById('amigo').value = '';
    document.getElementById('dialogReset').close();
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('listaAmigosEnlazados').innerHTML = '';
    document.getElementById('resultadoEnlazados').innerHTML = '';
    
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dialog').querySelector('button').addEventListener('click', () => {
        document.getElementById('dialog').close();
    });

    document.getElementById('dialogError').querySelector('button').addEventListener('click', () => {
        document.getElementById('dialogError').close();
    });

    document.getElementById('buttonSi').addEventListener('click', resetData);
    document.getElementById('buttonNo').addEventListener('click', () => {
        document.getElementById('dialogReset').close();
    });
});