window.onload = () => {
  "use strict";
  let filaA = document.getElementsByName("a");
  let filaAR = document.getElementsByName("aR");
  let filaB = document.getElementsByName("b");
  let filaBR = document.getElementsByName("bR");
  let plenoA = document.getElementById("plenoA");
  let plenoAR = document.getElementById("plenoAR");
  let plenoB = document.getElementById("plenoB");
  let plenoBR = document.getElementById("plenoBR");
  let formulario = document.getElementById("miformulario");
  let formulario2 = document.getElementById("miformulario2");
  let gruposR = document.getElementsByClassName("equiposR");
  let grupos = document.getElementsByClassName("equipos");
  let mostrarGanadores = document.getElementById("mostrarGanadores");
  let ocultarGanadores = document.getElementById("ocultarGanadores");
  let fieldsetf1 = document.getElementById("fieldsetf1");
  let nueva = document.getElementById("nueva");
  let simple = document.getElementById("simple");
  let multiple = document.getElementById("multiple");
  let resultados = document.getElementsByClassName("resultado");
  let dobles = document.getElementById("dobles");
  let triples = document.getElementById("triples");
  let dt = document.getElementsByClassName("dt");
  let arrayGanadores = [];
  let arrayGreen = [0,0,0,0,0,0,0,0];
  let flagSimple = true;
  
  let arrayEquiposPrimeraOrdenado = [
    "Real Madrid","Barcelona","Alavés","Athletic Club","Atlético","Celta de Vigo","Deportivo","Eibar","Espanyol","Getafe",
    "Girona","Las Palmas","Leganés","Levante","Málaga","Real Betis","Real Sociedad","Sevilla","Valencia CF","Villareal",  
  ];
  let arrayEquiposSegundaOrdenado = [
    "Toledo","Coruxo","Cerceda","Pontevedra","Racing Ferrol","Navalcarnero","Fuenlabrada","S.S reyes","Celta B","R.M Castilla"
  ];
  let arrayEquiposPrimeraDesordenado = desordenar(arrayEquiposPrimeraOrdenado);
  let arrayEquiposSegundaDesordenado = desordenar(arrayEquiposSegundaOrdenado);
  let arrayTodos = arrayEquiposPrimeraDesordenado.concat(arrayEquiposSegundaDesordenado);
  let matrizParejas = [];
  let contador = 0;

  for (let i = 0; i<= (arrayTodos.length / 2) -1; i++){
    let array = [];
    
    for(let j = 0; j <= 1; j++){
      array[j] = arrayTodos[contador];
      contador++; 
    }
    matrizParejas.push(array);
  }
  // console.table(matrizParejas);

  for (let i = 0; i<= filaA.length -1; i++){
    filaA[i].innerHTML = matrizParejas[i+1][0];
    filaAR[i].innerHTML = matrizParejas[i+1][0];
    filaB[i].innerHTML = matrizParejas[i+1][1];
    filaBR[i].innerHTML = matrizParejas[i+1][1];

    let numeroA = filaA[i].innerHTML.length;
    let numeroB = filaB[i].innerHTML.length;
    let total = numeroA + numeroB;
    for (let j = total; j<= 26; j++){
      filaB[i].innerHTML += ".";
      filaBR[i].innerHTML += ".";
    }
    filaB[i].innerHTML += (`0${i+1}`).slice(-2);
    filaBR[i].innerHTML += (`0${i+1}`).slice(-2);
  }
  plenoA.innerHTML = matrizParejas[0][0];
  plenoAR.innerHTML = matrizParejas[0][0];
  plenoB.innerHTML = matrizParejas[0][1];
  plenoBR.innerHTML = matrizParejas[0][1];

  //EVENTOS//

  formulario.addEventListener("click",(e) =>{
    let mitarget = e.target;
    if (mitarget.tagName === "INPUT"){
      if ((mitarget.name === "nopulsado") || (!mitarget.name)){
        mitarget.style.color = "white";
        mitarget.style.backgroundColor = "red";
        mitarget.name = "pulsado";
      }else{
        
        if (mitarget.className.indexOf("grupoA") !== -1 ){
          mitarget.style.color = "white";
          mitarget.style.backgroundColor = "rgb(0, 64, 107)";
        }else{
          mitarget.style.color = "rgb(0, 64, 107)";
          mitarget.style.backgroundColor = "rgb(91, 182, 243)";
        }
        mitarget.name = "nopulsado";
      }
      let contadorDobles = 0;
      let contadorTriples = 0;
      for (let i = 0; i<= grupos.length - 1; i++){
        let contadorDobleTriple = 0;
        for(let j = 0; j<= 2;j++){
          if(grupos[i].children[j].name === "pulsado"){
            contadorDobleTriple++;
          } 
        }
        if (contadorDobleTriple === 2){
          contadorDobles++;
        }else if(contadorDobleTriple === 3){
          contadorTriples++;
        }
      }
      dobles.value = contadorDobles;
      triples.value = contadorTriples;
    }
    console.log(flagSimple);
  });

  mostrarGanadores.addEventListener("click",(e) =>{
    simple.setAttribute("disabled","disable");
    multiple.setAttribute("disabled","disable");
    formulario2.style.visibility = "visible";
    fieldsetf1.setAttribute("disabled","disable");
    mostrarGanadores.innerHTML="Mostrar Ganadores";
    //marcamos los ganadores//
    for (let i = 0; i<= grupos.length - 1; i++){
      for(let j = 0; j<= grupos[i].children.length - 1;j++){
        if((grupos[i].children[j].value === arrayGanadores[i]) && (grupos[i].children[j].name === "pulsado")){
          grupos[i].children[j].style.backgroundColor = "green";
          grupos[i].children[j].classList += " green";
        }
      }
    }
    // Con este for rellenamos el arrayGreen con los resultados contado las casillas ganadoras por quiniela del 1-8
    for (let i = 0; i<= grupos.length - 3; i++){
      let contadorGreen = 0;
      let contadorCiclos = 0;
      for(let j = 0; j<= grupos[i].children.length - 1;j++){
        contadorCiclos++;
        if(grupos[i].children[j].className.indexOf("green") !== -1){
          contadorGreen++;
        }
        if (contadorCiclos % 3 === 0){
          arrayGreen[(contadorCiclos/3 - 1)] += contadorGreen;
          contadorGreen = 0;
        }
      }
    }
    // con este for imprimimos el arrayGreen en pantalla
    for (let k = 0; k<= resultados.length -1;k++){
      resultados[k].value = arrayGreen[k];
    }

    console.log(arrayGreen);
    e.preventDefault();
  });

  ocultarGanadores.addEventListener("click",(e) =>{
    formulario2.style.visibility = "hidden";
    e.preventDefault();
  });

  nueva.addEventListener("click",() =>{
    location.reload();
  });

  simple.addEventListener("click",(e) =>{
    for (let i = 0; i<= grupos.length - 1; i++){
      for(let j = 3; j<= grupos[i].children.length - 1;j++){
        grupos[i].children[j].style.visibility = "visible";
      }
    }
    for (let i = 1; i<=resultados.length -1;i++){
      resultados[i].style.visibility = "visible";
    }
    for (let i = 0; i<=dt.length -1;i++){
      dt[i].style.visibility ="hidden";
    }
    flagSimple = true;
    e.preventDefault();
  });

  multiple.addEventListener("click",(e) =>{
    for (let i = 0; i<= grupos.length - 3; i++){
      let contadorChildren = 0;
      for(let j = 3; j<= grupos[i].children.length - 1;j++){
        grupos[i].children[j].style.visibility = "hidden";
      }
      console.log(contadorChildren);
    }

    for (let i = 1; i<=resultados.length -1;i++){
      resultados[i].style.visibility = "hidden";
    }
    for (let i = 0; i<=dt.length -1;i++){
      dt[i].style.visibility ="visible";
    }flagSimple = false;
    e.preventDefault();
  });  
  //FIN DE EVENTOS//
  //Seleccionamos al azar los ganadores//
  for (let i = 0; i<=gruposR.length - 3; i++){
    let random = numeroAleatorio(0,2);
    if (random === 0){
      arrayGanadores.push("1");
    }else if(random === 1){
      arrayGanadores.push("X");
    }else if (random ===2){
      arrayGanadores.push("2");
    }
    gruposR[i].children[random].style.backgroundColor = "green";
    gruposR[i].children[random].classList += " selected";
  }
  let random1 = numeroAleatorio(0,3);
  if (random1 === 0){
    arrayGanadores.push("0");
  }else if(random1 === 1){
    arrayGanadores.push("1");
  }else if (random1 ===2){
    arrayGanadores.push("2");
  }else{
    arrayGanadores.push("M");
  }
  let random2 = numeroAleatorio(0,3);
  if (random2 === 0){
    arrayGanadores.push("0");
  }else if(random2 === 1){
    arrayGanadores.push("1");
  }else if (random2 ===2){
    arrayGanadores.push("2");
  }else{
    arrayGanadores.push("M");
  }
  console.log(arrayGanadores);
  gruposR[14].children[random1].style.backgroundColor = "green";
  gruposR[14].children[random1].classList += " selected";
  gruposR[15].children[random2].style.backgroundColor = "green";
  gruposR[15].children[random2].classList += " selected";
};
//------FUNCIONES------//
let desordenar = (ordenado) =>{
  "use strict";
  let desordenado  = [];
  do {
    let aleatorio = (Math.round(Math.random() * (ordenado.length -1)));
    if (desordenado.indexOf(ordenado[aleatorio]) === -1) {
      desordenado.push(ordenado[aleatorio]);
    }
  } while (desordenado.length !== ordenado.length);
  return desordenado;
};

let numeroAleatorio = (min,max) =>{
  "use strict";
  let aleatorio = (Math.round(Math.random() * (max - min) + min));
  return aleatorio;
};

