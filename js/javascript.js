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
  let guardarResultados = document.getElementById("guardarResultados");
  let recuperarResultados = document.getElementById("recuperarResultados");
  let aleatorios = document.getElementsByClassName("random");
  let basura = document.getElementsByClassName("basura");
  let borrarTodo = document.getElementById("borrarAll");
  let aleatorioTodo = document.getElementById("aleatorioAll");
  let arrayGanadores = [];
  let arrayGreen = [0,0,0,0,0,0,0,0];
  let flagSimple = true;
  let matriz = new Array(14);

  let arrayEquiposPrimeraOrdenado = [
    "Real Madrid","Barcelona","Alaves","Athletic Club","Atletico","Celta de Vigo","Deportivo","Eibar","Espanyol","Getafe",
    "Girona","Las Palmas","Leganes","Levante","Malaga","Real Betis","Real Sociedad","Sevilla","Valencia CF","Villareal",
  ];
  let arrayEquiposSegundaOrdenado = [
    "Toledo","Coruxo","Cerceda","Pontevedra","Racing Ferrol","Navalcarnero","Fuenlabrada","S.S reyes","Celta B","R.M Castilla"
  ];
  let arrayEquiposPrimeraDesordenado = desordenar(arrayEquiposPrimeraOrdenado);
  let arrayEquiposSegundaDesordenado = desordenar(arrayEquiposSegundaOrdenado);
  let arrayTodos = arrayEquiposPrimeraDesordenado.concat(arrayEquiposSegundaDesordenado);
  // Rellenamos la matriz con ceros
  for (let i = 0; i<=13 ;i++){
    matriz[i] = new Array (7);
    for (let j = 0; j<=7 ;j++){
      matriz[i][j] = 0;
    }
  }
  mostrarEquipos(arrayTodos,filaA,filaB,filaAR,filaBR,plenoA,plenoB,plenoAR,plenoBR);
  //EVENTOS//

  formulario.addEventListener("click",(e) =>{
    let mitarget = e.target;
    //Para Simples
    if (flagSimple){
      if((mitarget.tagName ==="INPUT") && (mitarget.name !== "btnNone")){
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
      }
      
      for (let i = 0; i<= grupos.length - 3; i++){
        let contadorUnico = 0;
        let flagUnico = false;
        for(let j = 0; j<= grupos[i].children.length - 1;j++){
          contadorUnico++;
          if(grupos[i].children[j].name === "pulsado"){
            flagUnico = true;
          }
          if (contadorUnico % 3 === 0){
            if(flagUnico === true){
              matriz[i][contadorUnico / 3 - 1] = 1;
              flagUnico = false;
            }else{
              matriz[i][contadorUnico / 3 - 1] = 0;
            }
          }
        }
      }
      console.table(matriz);

      // for (let i = 0; i<= grupos.length - 3; i++){
      //   let contadorProbar= 0;
      //   for(let j = 0; j<= 7;j++){
      //     contadorProbar++;
      //     if (contadorProbar % 3 === 0){
      //       if (matriz[i][contadorProbar / 3 - 1] === 1){
      //         console.log(matriz[i][contadorProbar / 3 - 1]);
      //         console.log("ya hay uno pulsado!!!");
      //       }
      //     }
      //   }
      // }

    //Para multiples
    }else{
      if ((mitarget.tagName === "INPUT") && (mitarget.name !== "btnNone")){
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
    }
  });

  mostrarGanadores.addEventListener("click",(e) =>{
    simple.setAttribute("disabled","disable");
    multiple.setAttribute("disabled","disable");
    aleatorioTodo.setAttribute("disabled","disable");
    borrarTodo.setAttribute("disabled","disable");
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

    // console.log(arrayGreen);
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
    simple.setAttribute("disabled","disable");
    for (let i = 0; i<= grupos.length - 3; i++){
      // let contadorChildren = 0;
      for(let j = 3; j<= grupos[i].children.length - 1;j++){
        grupos[i].children[j].style.display = "none";
      }
      // console.log(contadorChildren);
    }

    for (let i = 1; i<=resultados.length -1;i++){
      resultados[i].style.display = "none";
    }
    for (let i = 0; i<=dt.length -1;i++){
      dt[i].style.visibility ="visible";
    }flagSimple = false;
    e.preventDefault();
  });

  aleatorios[0].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[0],grupos,0,2,"impar");
    rellenarAleatorios(aleatorios[0],grupos,0,2);
    e.preventDefault();
  });

  aleatorios[1].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[1],grupos,3,5,"par");
    rellenarAleatorios(aleatorios[1],grupos,3,5);
    e.preventDefault();
  });
  aleatorios[2].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[2],grupos,6,8,"impar");
    rellenarAleatorios(aleatorios[2],grupos,6,8);
    e.preventDefault();
  });
  aleatorios[3].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[3],grupos,9,11,"par");
    rellenarAleatorios(aleatorios[3],grupos,9,11);
    e.preventDefault();
  });
  aleatorios[4].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[4],grupos,12,14,"impar");
    rellenarAleatorios(aleatorios[4],grupos,12,14);
    e.preventDefault();
  });
  aleatorios[5].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[5],grupos,15,17,"par");
    rellenarAleatorios(aleatorios[5],grupos,15,17);
    e.preventDefault();
  });
  aleatorios[6].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[6],grupos,18,20,"impar");
    rellenarAleatorios(aleatorios[6],grupos,18,20);
    e.preventDefault();
  });
  aleatorios[7].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[7],grupos,21,23,"par");
    rellenarAleatorios(aleatorios[7],grupos,21,23);
    e.preventDefault();
  });

  basura[0].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[0],grupos,0,2,"impar");
    e.preventDefault();
  });

  basura[1].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[1],grupos,3,5,"par");
    e.preventDefault();
  });

  basura[2].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[2],grupos,6,8,"impar");
    e.preventDefault();
  });

  basura[3].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[3],grupos,9,11,"par");
    e.preventDefault();
  });

  basura[4].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[4],grupos,12,14,"impar");
    e.preventDefault();
  });

  basura[5].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[5],grupos,15,17,"par");
    e.preventDefault();
  });

  basura[6].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[6],grupos,18,20,"impar");
    e.preventDefault();
  });

  basura[7].addEventListener("click",(e) =>{
    limpiarColumna(aleatorios[7],grupos,21,23,"par");
    e.preventDefault();
  });

  aleatorioTodo.addEventListener("click",(e)=>{
    borrarTodos(aleatorios,grupos);
    rellenarAleatorios(aleatorios[0],grupos,0,2);
    rellenarAleatorios(aleatorios[1],grupos,3,5);
    rellenarAleatorios(aleatorios[2],grupos,6,8);
    rellenarAleatorios(aleatorios[3],grupos,9,11);
    rellenarAleatorios(aleatorios[4],grupos,12,14);
    rellenarAleatorios(aleatorios[5],grupos,15,17);
    rellenarAleatorios(aleatorios[6],grupos,18,20);
    rellenarAleatorios(aleatorios[7],grupos,21,23);
    e.preventDefault();
  });

  borrarTodo.addEventListener("click",(e)=>{
    borrarTodos(aleatorios,grupos);
    e.preventDefault();
  });
  //FIN DE EVENTOS//
  //EVENTOS COOCKIES//
  guardarResultados.addEventListener("click",(e) =>{
    setCookie("equipos",arrayTodos,5);
    setCookie("resultados",arrayGanadores,5);
    e.preventDefault();
  });

  recuperarResultados.addEventListener("click",(e) =>{
    let equiposRecuperados =  getCookie("equipos");
    let array = equiposRecuperados.split(",");
    let resultadosRecuperados = getCookie("resultados");
    let arrayResultados = resultadosRecuperados.split(",");
    mostrarEquipos(array,filaA,filaB,filaAR,filaBR,plenoA,plenoB,plenoAR,plenoBR);
    console.log(arrayResultados);
    for (let i = 0; i <= gruposR.length -3; i++){
      let resultado = arrayResultados[i];
      if(resultado === "1"){
        gruposR[i].children[0].style.backgroundColor = "green";
        gruposR[i].children[1].style.backgroundColor = "rgb(0, 64, 107)";
        gruposR[i].children[2].style.backgroundColor = "rgb(0, 64, 107)";
      }else if (resultado === "X"){
        gruposR[i].children[0].style.backgroundColor = "rgb(0, 64, 107)";
        gruposR[i].children[1].style.backgroundColor = "green";
        gruposR[i].children[2].style.backgroundColor = "rgb(0, 64, 107)";
      }else if (resultado === "2"){
        gruposR[i].children[0].style.backgroundColor = "rgb(0, 64, 107)";
        gruposR[i].children[1].style.backgroundColor = "rgb(0, 64, 107)";
        gruposR[i].children[2].style.backgroundColor = "green";
      }
    }
    for (let i = 14; i <= 15; i++){
      let resultado = arrayResultados[i];
      if(resultado === "0"){
        gruposR[i].children[0].style.backgroundColor = "green";
        gruposR[i].children[1].style.backgroundColor = "rgb(91, 182, 243)";
        gruposR[i].children[2].style.backgroundColor = "rgb(91, 182, 243)";
        gruposR[i].children[3].style.backgroundColor = "rgb(91, 182, 243)";
      }else if (resultado === "1"){
        gruposR[i].children[0].style.backgroundColor = "rgb(91, 182, 243)";
        gruposR[i].children[1].style.backgroundColor = "green";
        gruposR[i].children[2].style.backgroundColor = "rgb(91, 182, 243)";
        gruposR[i].children[3].style.backgroundColor = "rgb(91, 182, 243)";
      }else if (resultado === "2"){
        gruposR[i].children[0].style.backgroundColor = "rgb(91, 182, 243)";
        gruposR[i].children[1].style.backgroundColor = "rgb(91, 182, 243)";
        gruposR[i].children[2].style.backgroundColor = "green";
        gruposR[i].children[3].style.backgroundColor = "rgb(91, 182, 243)";
      }else if (resultado === "M"){
        gruposR[i].children[0].style.backgroundColor = "rgb(91, 182, 243)";
        gruposR[i].children[1].style.backgroundColor = "rgb(91, 182, 243)";
        gruposR[i].children[2].style.backgroundColor = "rgb(91, 182, 243)";
        gruposR[i].children[3].style.backgroundColor = "green";
      }
    }

    formulario.style.visibility = "hidden";
    e.preventDefault();
  });
  //FIN EVENTOS COOKIES//
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
  // console.log(arrayGanadores);
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
  return (Math.round(Math.random() * (max - min) + min));
};

let rellenarAleatorios = (boton,grupos,a,b) =>{
  "use strict";
  for (let i= 0; i<=grupos.length -3; i++){
    let aleatorio = numeroAleatorio(a,b);
    console.log(aleatorio);
    grupos[i].children[aleatorio].style.backgroundColor = "red";
    grupos[i].children[aleatorio].name = "pulsado";
  }
  // boton.setAttribute("disabled","disable");
};

let limpiarColumna = (aleatorio,grupos,a,b,posicion) => {
  "use strict";
  aleatorio.removeAttribute("disabled");
  if (posicion ==="impar"){
    for (let i= 0; i<=grupos.length -3; i++){
      for (let j = a; j<= b; j++){
        grupos[i].children[j].style.backgroundColor = "rgb(0, 64, 107)";
        grupos[i].children[j].name = "";
      }

    }
  }else{
    for (let i= 0; i<=grupos.length -3; i++){
      for (let j = a; j<= b; j++){
        grupos[i].children[j].style.backgroundColor = "rgb(91, 182, 243)";
        grupos[i].children[j].name = "";
      }
    }
  }
};

let borrarTodos = (aleatorios,grupos) => {
  "use strict";
  for (let i= 0; i<=grupos.length -3; i++){
    for (let j = 0; j<= grupos[i].children.length-1; j++){
      grupos[i].children[j].name = "";
      if(grupos[i].children[j].className.indexOf("grupoA") !== -1 ){
        grupos[i].children[j].style.backgroundColor = "rgb(0, 64, 107)";
      }else{
        grupos[i].children[j].style.backgroundColor = "rgb(91, 182, 243)";
      }
    }
  }
  for (let i= 0; i<=aleatorios.length -3; i++){
    aleatorios[i].removeAttribute("disabled");
  }
};

//------FUNCIONES COOCKIES------//

let setCookie = (cname, cvalue, exdays) => {
  "use strict";
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

let getCookie = (cname) => {
  "use strict";
  let name = `${cname}=`;
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

let mostrarEquipos = (arrayEquipos,filaA,filaB,filaAR,filaBR,plenoA,plenoB,plenoAR,plenoBR) =>{
  "use strict";
  let matrizParejas = [];
  let contador = 0;
  for (let i = 0; i<= (arrayEquipos.length / 2) -1; i++){
    let array = [];

    for(let j = 0; j <= 1; j++){
      array[j] = arrayEquipos[contador];
      contador++;
    }
    matrizParejas.push(array);
  }
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
  return true;
};
