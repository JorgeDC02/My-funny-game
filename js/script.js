/**
 * Created by Jordi on 05/04/2022.
 */
var tablero = new Array(fila);
//todo reordenar orden del programa
var fila = 18; var columna = 21;

var perseguidor = new Array(2); //0=>Eje X, 1=>Eje Y
perseguidor[0] = 0;//Posicion inicial del objeto perseguidor, eje X

var recorridoEjeX = [];
var recorridoEjeY = [];

var acumulaSuma = 0;
var desplazamiento = 0;
var jugadorEjeX;
var jugadorEjeY;

var ultimoMovimiento = -1;

//Guardar tablero en mem�ria
for(var i=0; i<fila; i++) {
    tablero[i] = new Array(columna);
}

for(var j=0; j<fila; j++) {
    for(var i=0; i<columna; i++) {
        tablero[j][i] = "<div class='celdas'></div>"
    }
}
//Fin guardar tablero en mem�ria

function generarCeldaInicial(){
    recorridoEjeX[0] = 3; //Posici�n inicial del eje X
    console.log("---------------generarCeldaInicial()---------------");
    var celdaInicialY; //columna, Eje Y
    celdaInicialY = Math.floor((Math.random() * 18) + 0);
    console.log("Valor de X inicial: "+recorridoEjeX[0]);
    console.log("Valor de Y inicial: "+celdaInicialY);

    recorridoEjeY[0] = celdaInicialY;//Guarda en memoria el eje Y de la posicion inicial
    perseguidor[1] =  celdaInicialY; // Guarda en memoria el eje Y de la posicion inicial del perseguidor

    jugadorEjeX = 0;
    jugadorEjeY = celdaInicialY;
    tablero[celdaInicialY][recorridoEjeX[0]] = '<div class="recorrido"><img width=25 src="img/raton.png"/></div>';
    tablero[celdaInicialY][perseguidor[0]] = '<div class="celdas"><img width=25 src="img/gato.jpg"/></div>';

}

function generaRecorrido(){
    console.log("---------------generaRecorrido()---------------");
    var posEjes;

    while(recorridoEjeX[recorridoEjeX.length-1] != 20){
        posEjes = recorridoEjeX.length; //Dimensi�n del array eje X
        console.log("==========[Valores del eje "+posEjes+"], longitud del array==========");
        if(recorridoEjeY[recorridoEjeY.length-1] == 0){
            generaValorMovimiento(2, 0, posEjes);
        }
        else if(recorridoEjeY[recorridoEjeY.length-1] == 17){
            generaValorMovimiento(2, 1, posEjes);
        }
        else{
            generaValorMovimiento(3, 0, posEjes);
        }
    }
}

function generaValorMovimiento(v_max, v_min, v_ejes){
    var opcionMovimiento = Math.floor((Math.random() * v_max)+v_min);
    var numMovimientos = Math.floor((Math.random() * 4)+1);
    var opcionMovimiento;
    var coincideMovimientoAnt;

    if(ultimoMovimiento == 0 && opcionMovimiento == 2 || ultimoMovimiento == 2 && opcionMovimiento == 0){
        coincideMovimientoAnt = true;
    }
    else{
        coincideMovimientoAnt = false;
    }

    while(coincideMovimientoAnt == true){
        if(ultimoMovimiento == 0 && opcionMovimiento == 2){
            opcionMovimiento = Math.floor((Math.random() * v_max)+v_min);
        }else if(ultimoMovimiento == 2 && opcionMovimiento == 0){
            opcionMovimiento = Math.floor((Math.random() * v_max)+v_min);
        }else{
            coincideMovimientoAnt = false;
        }
    }
    console.log("Valor de movimiento generado: "+opcionMovimiento);
    if(opcionMovimiento == 0){ 		// 0 => Movimiento de BAJADA
        console.log("----------------MOVIMIENTO DE BAJADA----------------");
        if(recorridoEjeY[v_ejes-1] + numMovimientos > 17){
            var count1 = 1;

            while(recorridoEjeY[v_ejes-1]+count1 <= 17){
                recorridoEjeX.push(recorridoEjeX[v_ejes-1]);
                recorridoEjeY.push(recorridoEjeY[v_ejes-1]+count1);
                count1++;
            }
        }else{
            for(var i = 1; i <= numMovimientos; i++){
                recorridoEjeX.push(recorridoEjeX[v_ejes-1]);
                recorridoEjeY.push(recorridoEjeY[v_ejes-1] + i);
            }
        }
    }
    else if(opcionMovimiento == 1){ // 1 => Movimiento de HORIZONTAL
        console.log("----------------MOVIMIENTO HORIZONTAL----------------");
        if(recorridoEjeX[v_ejes-1] + numMovimientos > 20){
            var count = 1;

            while(recorridoEjeX[v_ejes-1]+count <= 20){
                recorridoEjeY.push(recorridoEjeY[v_ejes-1]);
                recorridoEjeX.push(recorridoEjeX[v_ejes-1]+count);
                count++;
            }
        }else{
            for(var i = 1; i <= numMovimientos; i++){
                recorridoEjeX.push(recorridoEjeX[v_ejes-1]+i);
                recorridoEjeY.push(recorridoEjeY[v_ejes-1]);
            }
        }

    }
    else { 							// 2 => Movimiento VERTICAL de SUBIDA
        if(recorridoEjeY[v_ejes-1] - numMovimientos < 0){
            var count3 = 1;

            while(recorridoEjeY[v_ejes-1]-count3 >= 0){
                recorridoEjeX.push(recorridoEjeX[v_ejes-1]);
                recorridoEjeY.push(recorridoEjeY[v_ejes-1]-count3);
                count3++;
            }
        }else{
            for(var i = 1; i <= numMovimientos; i++){
                recorridoEjeX.push(recorridoEjeX[v_ejes-1]);
                recorridoEjeY.push(recorridoEjeY[v_ejes-1]-i);
            }
        }
    }
    ultimoMovimiento = opcionMovimiento; //Guarda en mem�ria la �ltima opci�n de movimiento
}

function verRecorrido(){
    console.log("---------------verRecorrido()---------------");
    for (var i = 1; i < recorridoEjeX.length; i++){
        /*if (i == 0){
         tablero[recorridoEjeY[i]][recorridoEjeX[i]] = '<div class="recorrido"><img width=25 src="raton.png"/></div>';
         }else*/ if( i == recorridoEjeX.length-1){
            tablero[recorridoEjeY[i]][recorridoEjeX[i]] = '<div class="recorrido"><img width=25 src="img/queso.jpg"/></div>';
        }else{
            tablero[recorridoEjeY[i]][recorridoEjeX[i]] = "<div class='recorrido'></div>";
        }
    }

}

function mostrarTablero(){ //Inserta tablero guardado en memo en elemento div
    console.log("---------------mostrarTablero()---------------");
    for(var j=0; j<fila; j++) {
        for(var i=0; i<columna; i++) {
            $("#tablero").append(tablero[j][i]);
        }
    }
}

function generarNumerosSuma(){
    var num1 = Math.floor((Math.random() * 9)+1); var num2 = Math.floor((Math.random() * 9)+1);
    $(".num1").append(num1); $(".num2").append(num2);

    $("#sumar").click(function(){
        desplazamiento = num1+num2;
        acumulaSuma = acumulaSuma + desplazamiento;
        $("#tablero").empty();
        tablero[recorridoEjeY[0]][recorridoEjeX[0]] = '<div class="recorrido"></div>';

        console.log("===========generarNumerosSuma()===========");
        console.log("acumulaSuma = "+acumulaSuma);
        console.log("desplazamiento = "+desplazamiento);
        console.log("posicion meta: "+(recorridoEjeX.length-1));

        if($("#resultado").val() == desplazamiento){
            if(acumulaSuma < recorridoEjeX.length-1){
                tablero[recorridoEjeY[acumulaSuma]][recorridoEjeX[acumulaSuma]] = '<div class="recorrido"><img width=25 src="img/raton.png"/></div>';
                tablero[recorridoEjeY[0]][perseguidor[0]] = '<div class="celdas"></div>';
                tablero[recorridoEjeY[acumulaSuma-3]][recorridoEjeX[acumulaSuma-3]] = '<div class="celdas"><img width=25 src="img/gato.jpg"/></div>';
                num1 = Math.floor((Math.random() * 9)+1);
                num2 = Math.floor((Math.random() * 9)+1);
                $(".num1").empty(); $(".num2").empty();
                $(".num1").append(num1); $(".num2").append(num2);
                desplazamiento = num1 + num2;
                mostrarTablero();
                $("#resultado").val("");
            }else{
                //alert("HAS GANADO");
                $("h1").text("HAS GANADO");
                tablero[recorridoEjeY[recorridoEjeX.length-1]][recorridoEjeX[recorridoEjeX.length-1]] = '<div class="recorrido"><img width=25 src="img/raton.png"/></div>';
                tablero[recorridoEjeY[(recorridoEjeX.length-1)-3]][recorridoEjeX[(recorridoEjeX.length-1)-3]] = '<div class="celdas"><img width=25 src="img/gato.jpg"/></div>';
                mostrarTablero();
            }


        }else{alert("SUMA ERRONEA");}
    });
}


generarCeldaInicial();
generaRecorrido();
verRecorrido();

generarNumerosSuma();
mostrarTablero();

/*alert(recorridoEjeY[0]);
 $( ".celdas" ).each(function( index ) {
 console.log( index + ": " + $( this ).text() );
 if(index == recorridoEjeY[1]){
 $(this).addClass( "blue" );
 }
 });*/
