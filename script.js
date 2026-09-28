
// ==========================================
// VARIABLES
// ==========================================

let datos = null;

let quoteIndex = 0;

let typingIndex = 0;

let deleting = false;

let typingPhrase = 0;


// ==========================================
// CARGAR JSON
// ==========================================

async function cargarJSON() {

    try {

        const respuesta =
            await fetch("data.json");

        if (!respuesta.ok) {

            throw new Error(
                "No se pudo cargar data.json"
            );

        }

        datos =
            await respuesta.json();

        iniciarPagina();

    } catch (error) {

        console.error(
            "ERROR:",
            error
        );

        console.log(
            "Abre la página con Live Server."
        );

    }

}


// ==========================================
// INICIAR
// ==========================================

function iniciarPagina() {

    cargarInformacion();

    iniciarFrases();

    crearRazones();

    iniciarTyping();

    iniciarCorazones();

    iniciarParticulas();

    actualizarContador();

    setInterval(
        actualizarContador,
        1000
    );

}


// ==========================================
// INFORMACIÓN
// ==========================================

function cargarInformacion() {

    const nombre =
        document.getElementById(
            "nameHero"
        );

    if (nombre) {

        nombre.textContent =
            datos.nombre;

    }


    const mensaje =
        document.getElementById(
            "message"
        );

    if (mensaje) {

        mensaje.textContent =
            datos.carta;

    }


    const firma =
        document.getElementById(
            "signature"
        );

    if (firma) {

        firma.textContent =
            datos.firma;

    }


    const surpriseTitle =
        document.getElementById(
            "surpriseTitle"
        );

    if (
        surpriseTitle &&
        datos.sorpresa
    ) {

        surpriseTitle.textContent =
            datos.sorpresa.titulo;

    }


    const surpriseText =
        document.getElementById(
            "surpriseText"
        );

    if (
        surpriseText &&
        datos.sorpresa
    ) {

        surpriseText.textContent =
            datos.sorpresa.mensaje;

    }

}


// ==========================================
// FRASES
// ==========================================

function iniciarFrases() {

    mostrarFrase();

    const boton =
        document.getElementById(
            "nextQuote"
        );

    boton.addEventListener(
        "click",
        siguienteFrase
    );

}


function mostrarFrase() {

    const elemento =
        document.getElementById(
            "quoteText"
        );

    elemento.style.opacity = "0";


    setTimeout(function () {

        elemento.textContent =
            datos.frases[quoteIndex];

        elemento.style.opacity = "1";

    }, 250);

}


function siguienteFrase() {

    quoteIndex++;

    if (
        quoteIndex >=
        datos.frases.length
    ) {

        quoteIndex = 0;

    }

    mostrarFrase();

}


// Cambiar frase automáticamente

setInterval(function () {

    if (!datos) {
        return;
    }

    siguienteFrase();

}, 8000);


// ==========================================
// TEXTO ESCRIBIÉNDOSE
// ==========================================

function iniciarTyping() {

    const frasesTyping = [

        "Eres mi coincidencia favorita. ❤️",

        "Entre millones de estrellas, te encontré. ✨",

        "Mi lugar favorito es contigo. 🌌",

        "Contigo quiero seguir escribiendo nuestra historia. 💕",

        "Tú haces especial mi universo. 🌙"

    ];


    function escribir() {

        const elemento =
            document.getElementById(
                "typingText"
            );


        const frase =
            frasesTyping[
                typingPhrase
            ];


        if (!deleting) {

            elemento.textContent =
                frase.substring(
                    0,
                    typingIndex + 1
                );

            typingIndex++;


            if (
                typingIndex ===
                frase.length
            ) {

                deleting = true;

                setTimeout(
                    escribir,
                    2200
                );

                return;

            }

        } else {

            elemento.textContent =
                frase.substring(
                    0,
                    typingIndex - 1
                );

            typingIndex--;


            if (
                typingIndex === 0
            ) {

                deleting = false;

                typingPhrase++;


                if (
                    typingPhrase >=
                    frasesTyping.length
                ) {

                    typingPhrase = 0;

                }

            }

        }


        setTimeout(
            escribir,
            deleting ? 40 : 80
        );

    }


    escribir();

}


// ==========================================
// RAZONES
// ==========================================

function crearRazones() {

    const container =
        document.getElementById(
            "reasonsContainer"
        );


    datos.razones.forEach(
        function (razon) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "reason-card";


            card.innerHTML = `

                <div class="icon">
                    ${razon.icono}
                </div>

                <h3>
                    ${razon.titulo}
                </h3>

                <p>
                    ${razon.texto}
                </p>

            `;


            container.appendChild(
                card
            );

        }
    );

}


// ==========================================
// CARTA
// ==========================================

const openLetter =
    document.getElementById(
        "openLetter"
    );


openLetter.addEventListener(
    "click",
    function () {

        const letter =
            document.getElementById(
                "letter"
            );


        letter.classList.remove(
            "hidden"
        );


        openLetter.style.display =
            "none";


        crearCorazones(25);


        letter.scrollIntoView({
            behavior: "smooth"
        });

    }
);


// ==========================================
// BOTÓN PRINCIPAL
// ==========================================

const startButton =
    document.getElementById(
        "startButton"
    );


startButton.addEventListener(
    "click",
    function () {

        document
            .getElementById("quotes")
            .scrollIntoView({
                behavior: "smooth"
            });


        crearCorazones(20);

    }
);


// ==========================================
// SORPRESA
// ==========================================

const surpriseButton =
    document.getElementById(
        "surpriseButton"
    );


surpriseButton.addEventListener(
    "click",
    function () {

        const surprise =
            document.getElementById(
                "surprise"
            );


        surprise.classList.remove(
            "hidden"
        );


        surpriseButton.style.display =
            "none";


        crearCorazones(80);


        crearExplosion();

    }
);


// ==========================================
// CORAZONES
// ==========================================

function crearCorazon() {

    const heart =
        document.createElement(
            "div"
        );


    heart.textContent =
        Math.random() > .3
            ? "❤️"
            : "💗";


    heart.style.position =
        "fixed";


    heart.style.left =
        Math.random() *
        100 +
        "vw";


    heart.style.bottom =
        "-50px";


    heart.style.fontSize =
        15 +
        Math.random() *
        30 +
        "px";


    heart.style.zIndex =
        "10";


    heart.style.pointerEvents =
        "none";


    const duracion =
        5 +
        Math.random() *
        5;


    heart.style.animation =
        `subirCorazon ${duracion}s linear`;


    document.body.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        duracion * 1000
    );

}


function iniciarCorazones() {

    setInterval(
        crearCorazon,
        900
    );

}


function crearCorazones(cantidad) {

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        setTimeout(
            crearCorazon,
            i * 60
        );

    }

}


// ==========================================
// PARTÍCULAS
// ==========================================

function iniciarParticulas() {

    const container =
        document.getElementById(
            "particles"
        );


    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.style.position =
            "fixed";


        particle.style.width =
            Math.random() *
            3 +
            1 +
            "px";


        particle.style.height =
            particle.style.width;


        particle.style.background =
            "white";


        particle.style.borderRadius =
            "50%";


        particle.style.left =
            Math.random() *
            100 +
            "vw";


        particle.style.top =
            Math.random() *
            100 +
            "vh";


        particle.style.opacity =
            Math.random();


        particle.style.boxShadow =
            "0 0 8px white";


        particle.style.animation =
            `particleFloat ${
                5 +
                Math.random() * 10
            }s infinite alternate ease-in-out`;


        container.appendChild(
            particle
        );

    }

}


// ==========================================
// EXPLOSIÓN FINAL
// ==========================================

function crearExplosion() {

    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.textContent =
            Math.random() > .5
                ? "✨"
                : "❤️";


        particle.style.position =
            "fixed";


        particle.style.left =
            "50%";


        particle.style.top =
            "70%";


        particle.style.fontSize =
            10 +
            Math.random() * 20 +
            "px";


        particle.style.zIndex =
            "100";


        particle.style.pointerEvents =
            "none";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            100 +
            Math.random() *
            500;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1.5)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    1200 +
                    Math.random() * 1000,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        );


        document.body.appendChild(
            particle
        );


        setTimeout(
            function () {

                particle.remove();

            },
            2500
        );

    }

}


// ==========================================
// CONTADOR
// ==========================================

// CAMBIA ESTA FECHA
// por la fecha real

const startDate =
    new Date(
        "2025-01-01T00:00:00"
    );


function actualizarContador() {

    const ahora =
        new Date();


    const diferencia =
        ahora.getTime() -
        startDate.getTime();


    if (diferencia < 0) {
        return;
    }


    const total =
        Math.floor(
            diferencia / 1000
        );


    const dias =
        Math.floor(
            total / 86400
        );


    const horas =
        Math.floor(
            (total % 86400) /
            3600
        );


    const minutos =
        Math.floor(
            (total % 3600) /
            60
        );


    const segundos =
        total % 60;


    document.getElementById(
        "days"
    ).textContent =
        dias;


    document.getElementById(
        "hours"
    ).textContent =
        horas;


    document.getElementById(
        "minutes"
    ).textContent =
        minutos;


    document.getElementById(
        "seconds"
    ).textContent =
        segundos;

}


// ==========================================
// ARRANCAR
// ==========================================

cargarJSON();