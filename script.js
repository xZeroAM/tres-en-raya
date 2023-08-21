var espacios = document.querySelectorAll("button"); // Variable guarda todos los espacios
var turno_actual = "x"; // Turno actual de juego
var jugadas_x = []; // Jugadas de "x"
var jugadas_o = []; // Jugadas de "o"
var pantalla_container = document.getElementById("pantalla-container"); // Pantalla que cuando "x" o "o" gana o para un empate
var btn_ok = document.getElementById("pantalla-btn");
var pantalla_texto = document.getElementById("pantalla-texto")
var num_jugadas = 0; // Contador de los turnos, al llegar a nueve sirve para marcar el empate

// Recursos
var sonido_click = new Audio("recursos/sound_pop.mp3");
var sonido_click2 = sonido_click.cloneNode();
var sonido_victoria = new Audio("recursos/sound_victoria_hw.mp3");
var sonido_victoria = sonido_victoria.cloneNode();
sonido_click.volume = 0.5;
sonido_victoria.volume = 0.3;

// Matriz con todas las combinaciones ganadoras
var combinaciones_ganadoras =
    [
        [1, 2, 3], [4, 5, 6],
        [7, 8, 9], [1, 4, 7],
        [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

espacios.forEach(espacio => {
    espacio.addEventListener("click", () => {
        agregarJugada(espacio);
        verificarGanador();
    })
})

btn_ok.addEventListener("click", () => {
    pantalla_container.classList.remove("activo");
    limpiar();
})

// Función para agregar la clase "x" o "o" a los espacios del juego
function agregarXO(espacio) {
    // Variable para verificar si el espacio ya tiene la clase "x" o "o"
    var tiene_xo = false;
    // Itera sobre las clases del espacio
    espacio.classList.forEach(clase => {
        // Verifica si el espacio ya tiene la clase "x" o "o"
        if (clase == "x" || clase == "o") {
            tiene_xo = true;
        }
    });

    // Si el espacio no tiene la clase ni "x" o "o", agrega la clase correspondiente
    if (!tiene_xo) {
        if (turno_actual == "x") {
            espacio.classList.add("x") // Agrega clase "x"
            turno_actual = "o" // Cambia el turno a "o"
        } else if (turno_actual == "o") {
            espacio.classList.add("o") // Agrega clase "o"
            turno_actual = "x"; // Cambia el turno a "x"
        }
    }
}

// Funcion para agregar las jugadas
function agregarJugada(espacio) {
    // Llama a la funcion que se encarga de poner las clases "x" y "o" para la vista
    agregarXO(espacio);
    // Verifica cual turno es, "x" o "o", y revisa que la jugada sea valida (no se haya hecho antes) para agregarla
    if (espacio.classList[1] == "x" && !(jugadas_x.includes(parseInt(espacio.id)))) {
        jugadas_x.push(parseInt(espacio.id));
        sonido_click.currentTime = 0;
        sonido_click.play();
        num_jugadas++; // agrega 1 al numero de jugadas
        console.log(jugadas_x);
    } else if (espacio.classList[1] == "o" && !(jugadas_o.includes(parseInt(espacio.id)))) {
        jugadas_o.push(parseInt(espacio.id));
        sonido_click.currentTime = 0;
        sonido_click.play();
        num_jugadas++; // agrega 1 al numero de jugadas
        console.log(jugadas_o);
    }
}

// Funcion para verficar el ganador 
function verificarGanador() {
    // Itereamos todas las combinaciones y en caso de que el vector con las jugadas "x" o "o"
    // contenga una combinacion ganadora, las variables ganador_x o ganador_o toman un valor false o true
    for (var i = 0; i < combinaciones_ganadoras.length; i++) {
        var ganador_x = combinaciones_ganadoras[i].every(posicion => jugadas_x.includes(posicion));
        var ganador_o = combinaciones_ganadoras[i].every(posicion => jugadas_o.includes(posicion));

        // En caso "ganador_x" sea true, se de muestra como ganador en la pantalla y lo mismo con "ganador_y"
        if (ganador_x) {
            console.log("Gano X");
            sonido_victoria.currentTime = 0;
            sonido_victoria.play();
            pantalla_texto.innerHTML = "<h1>Gano \"X\"</h1>"
            pantalla_container.classList.add("activo");
        } else if (ganador_o) {
            console.log("Gano O");
            sonido_victoria.currentTime = 0;
            sonido_victoria.play();
            pantalla_texto.innerHTML = "<h1>Gano \"O\"</h1>"
            pantalla_container.classList.add("activo");
        } else if (num_jugadas == 9) {
            console.log("Empate")
            sonido_victoria.currentTime = 0;
            sonido_victoria.play();
            pantalla_texto.innerHTML = "<h1>Empate</h1>"
            pantalla_container.classList.add("activo");
        }
    }
}

// Funcion para limpiar las jugadas y la vista
function limpiar() {
    jugadas_o = [];
    jugadas_x = [];
    num_jugadas = 0;
    turno_actual = "x";
    espacios.forEach((espacio) => {
        espacio.classList.remove("x");
        espacio.classList.remove("o");
    })
}