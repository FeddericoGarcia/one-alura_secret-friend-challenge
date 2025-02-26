let listaAmigos = [];
let mostrarResult = document.getElementById('result')
let resultError = document.getElementById('resultError')
let dialog = document.getElementById('dialog')
let dialogError = document.getElementById('dialogError')
let dialogReset = document.getElementById('dialogReset');
let mostrarLista = document.getElementById('listaAmigos');

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

    if( listaAmigos.includes(nombre)){
        dialogError.showModal();
        resultError.innerHTML = `El nombre ${nombre} ya esta cargado en la lista`;
        return false;
    }

    return true;
}

let visualizarArray = ( listaAmigos ) =>{
    mostrarLista.innerHTML = listaAmigos.map( nombre => `<li>${nombre}</li>`).join('\n');
}

let sortearAmigo = () =>{
    if( listaAmigos.length === 0 ){
        resultError.innerHTML = `La lista está vacía.`;
        dialogError.showModal();
        return;
    }
    
    let amigoSorteado = Math.floor(Math.random() * listaAmigos.length);
    mostrarResult.innerHTML = `${listaAmigos[amigoSorteado]}`;
    dialog.showModal();
}

let borrarDatos = () => {
    dialogReset.showModal();
}

let resetData = () => {
    listaAmigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('amigo').value = '';
    document.getElementById('dialogReset').close();
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