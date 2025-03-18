// Lista de premios editable manualmente
let prizes = [
    "100 puntos",
    "Sticker exclusivo",
    "Saludo en stream",
    "Elección de juego",
    "Premio sorpresa"
];

// Elementos del DOM
const ball = document.getElementById("gacha-ball");
const prizeText = document.getElementById("prize-text");

let isSpinning = false;

// Función para girar el gachapon
function spinGachapon() {
    if (isSpinning) return;
    isSpinning = true;

    prizeText.textContent = "¡Girando...!";
    ball.classList.add("active");

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * prizes.length);
        const selectedPrize = prizes[randomIndex];
        prizeText.textContent = `¡Ganaste: ${selectedPrize}!`;

        setTimeout(() => {
            ball.classList.remove("active");
            prizeText.textContent = "¡Gira el Gachapon!";
            isSpinning = false;
        }, 2000);
    }, 5000);
}

// Integración con Twitch
window.Twitch = window.Twitch || {};
window.Twitch.ext = window.Twitch.ext || {};
window.Twitch.ext.onAuthorized = function(auth) {
    console.log("Extensión autorizada por Twitch");
    window.Twitch.ext.listen("channel-points", (channelId, data) => {
        // Reemplaza "TU_REWARD_ID_AQUI" con el ID de tu recompensa de puntos de canal
        if (data.rewardId === "TU_REWARD_ID_AQUI") {
            spinGachapon();
        }
    });
};