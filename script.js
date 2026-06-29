
window.addEventListener("scroll", function() {
    let menu = document.getElementById("menu");

    if (window.scrollY > 50) {
        menu.classList.add("scrolleado");
    } else {
        menu.classList.remove("scrolleado");
    }
});


function abrirCalculadora() {


    let nuevoDiv = document.createElement("div");


    nuevoDiv.innerHTML = `
        <h2>Calculadora de Impacto</h2>
        <p>Elegí o ingresá un monto y mirá cuánto impacto genera tu donación.</p>

        <div class="calc-montos-fijos">
            <button class="montoFijo" value="500">$500</button>
            <button class="montoFijo" value="1000">$1.000</button>
            <button class="montoFijo" value="2500">$2.500</button>
            <button class="montoFijo" value="5000">$5.000</button>
        </div>

        <div class="calc-input-grupo">
            <label>O ingresá un monto personalizado (ARS):</label>
            <input type="number" id="montoDonacion" placeholder="Ej: 3000" min="1">
            <button id="calcularImpacto">Calcular</button>
        </div>

        <div id="resultadoImpacto" class="calc-resultado" style="display: none;">
            <p class="calc-resultado-titulo">Con tu donación vas a contribuir a:</p>
            <div class="calc-cards">
                <div class="calc-card calc-coral">
                    <span id="cantidadCorales" class="calc-numero">0</span>
                    <span class="calc-etiqueta">🪸 corales restaurados</span>
                </div>
                <div class="calc-card calc-basura">
                    <span id="cantidadBasura" class="calc-numero">0</span>
                    <span class="calc-etiqueta">🗑️ kg de residuos removidos</span>
                </div>
            </div>
            <p id="mensajeEquivalencia" class="calc-equivalencia"></p>
        </div>

        <button id="hacerDonacion">Hacer la donación</button>
        <button id="cerrar">Cerrar</button>
    `;


    document.body.appendChild(nuevoDiv);


    nuevoDiv.classList.add("calc-overlay");


    let inputMonto          = nuevoDiv.querySelector("#montoDonacion");
    let botonCalcular       = nuevoDiv.querySelector("#calcularImpacto");
    let botonesMontoFijo    = nuevoDiv.querySelectorAll(".montoFijo");
    let resultadoImpacto    = nuevoDiv.querySelector("#resultadoImpacto");
    let cantidadCorales     = nuevoDiv.querySelector("#cantidadCorales");
    let cantidadBasura      = nuevoDiv.querySelector("#cantidadBasura");
    let mensajeEquivalencia = nuevoDiv.querySelector("#mensajeEquivalencia");
    let botonHacerDonacion  = nuevoDiv.querySelector("#hacerDonacion");
    let botonCerrar         = nuevoDiv.querySelector("#cerrar");


    let CORALES_POR_PESO = 5200  / 2000000;
    let BASURA_POR_PESO  = 12000 / 2000000;


    function calcularImpacto(monto) {


        monto = Number(monto);


        if (!monto || monto <= 0) {
            alert("Ingresá un monto mayor a 0.");
            return;
        }

        let corales = Math.round(monto * CORALES_POR_PESO);
        let basura  = Math.round(monto * BASURA_POR_PESO * 10) / 10;

        if (corales === 0) corales = "< 1";
        if (basura  === 0) basura  = "< 0.1";

  
        cantidadCorales.textContent = corales;
        cantidadBasura.textContent  = basura;


        if (monto < 500) {
            mensajeEquivalencia.textContent = "Cada aporte suma. Hasta la donación más pequeña tiene impacto real.";
        } else if (monto < 2000) {
            mensajeEquivalencia.textContent = "Con esto ayudás a financiar una inmersión de limpieza en zona costera.";
        } else if (monto < 5000) {
            mensajeEquivalencia.textContent = "Equivale a costear el equipamiento de un voluntario por un día de trabajo.";
        } else if (monto < 15000) {
            mensajeEquivalencia.textContent = "Con este monto podemos trasplantar una colonia de corales entera a un arrecife deteriorado.";
        } else {
            mensajeEquivalencia.textContent = "¡Donación extraordinaria! Esto financia una expedición completa de restauración marina.";
        }

 
        resultadoImpacto.style.display = "block";
    }


    botonCalcular.addEventListener("click", function() {
        let monto = inputMonto.value;
        calcularImpacto(monto);
    });

    botonesMontoFijo.forEach(function(boton) {

        boton.addEventListener("click", function() {
            let monto = boton.value;

            botonesMontoFijo.forEach(function(b) { b.classList.remove("seleccionado"); });
            boton.classList.add("seleccionado");

         
            inputMonto.value = monto;

            calcularImpacto(monto);
        });
    });

 
    botonCerrar.addEventListener("click", function() {
        nuevoDiv.remove();
    });

    botonHacerDonacion.addEventListener("click", function() {

 
        if (resultadoImpacto.style.display === "none") {
            alert("Primero ingresá un monto para ver tu impacto.");
            return;
        }

   
        let montoFinal = Number(inputMonto.value);


        nuevoDiv.innerHTML = `
            <h2>¡Gracias por tu donación!</h2>
            <p>Tu aporte de <strong>$${montoFinal.toLocaleString("es-AR")}</strong> ya está siendo parte del cambio.</p>
            <p>Tu contribución ayuda a restaurar corales y limpiar océanos para las generaciones futuras.</p>
            <button id="volverHome">Volver al inicio</button>
        `;


        let botonVolverHome = nuevoDiv.querySelector("#volverHome");

        botonVolverHome.addEventListener("click", function() {
            window.location.href = "index.html";
        });
    });
}
