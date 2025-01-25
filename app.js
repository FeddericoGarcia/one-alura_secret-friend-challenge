let listaAmigos = [];

let agregarAmigo = () =>{
    let nombre = document.getElementById('amigo').value;

    if(validarInput( nombre )){
        listaAmigos.push( nombre.toUpperCase() );
        document.getElementById('amigo').value = '';
        visualizarArray( listaAmigos );
        console.log(listaAmigos)
    }
}

let validarInput = ( nombre ) =>{

    if( nombre.trim() === '' ){
        alert('Por favor, escribí el nombre de un amigo');
        return false;
    }
    return true;
}

let visualizarArray = ( listaAmigos ) =>{
    let mostrarLista = document.getElementById('listaAmigos');
    mostrarLista.innerHTML = listaAmigos.map( nombre => `<li>${nombre}</li>`).join('\n');
}

let sortearAmigo = () =>{
    let mostrarResultado = document.getElementById('resultado')
 
    if( listaAmigos.length === 0 ){
        alert('No hay amigos en la lista');
        return;
    }
    
    let amigoSorteado = Math.floor(Math.random() * listaAmigos.length);
    mostrarResultado.innerHTML = `El amigo sorteado es: ${listaAmigos[amigoSorteado]}`;
}

let borrarDatos = () =>{
    listaAmigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('amigo').value = '';
    document.getElementById('resultado').innerHTML = '';
}