// js/index.js
// -----------------------
// Variáveis e inicialização
// -----------------------

const valor = localStorage.getItem("Score");
document.getElementById("resultado").textContent = `Pontuação ${valor}`;

let contadorCliques = 0;
let elementos = [];
let indexAtual = 0;
let timer;

window.onload = () => {
    document.activeElement.blur();
};


// -----------------------
// Evento principal: Navegação e ações
// -----------------------
document.addEventListener("DOMContentLoaded", () => {
    elementos = Array.from(document.querySelectorAll("h1, h2"));
    
    // Define o foco inicial
    elementos[indexAtual].focus();
    document.addEventListener("keydown", (e) => {
     
        const foco = document.activeElement;
        const balaos = Array.from(document.querySelectorAll(".container img"));

        // Lógica de navegação
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {

            const somEnter = new Audio("./sons/plim1.mp3");
            somEnter.currentTime = 0; // reinicia o som caso já esteja tocando
            somEnter.play()
            indexAtual = (indexAtual + 1) % elementos.length;
            elementos[indexAtual].focus();
            // Limpa os balões ao mudar de item
            balaos.forEach(b => { b.style.opacity = "0"; b.style.transform = "translateY(0)"; });

        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            const somEnter = new Audio("./sons/plim2.mp3");
            somEnter.currentTime = 0; // reinicia o som caso já esteja tocando
            somEnter.play();
            indexAtual = (indexAtual - 1 + elementos.length) % elementos.length;
            elementos[indexAtual].focus();
        }

        // Lógica da tecla Enter
        if (e.key === "Enter") {
            if (foco.tagName === "H2") {
                foco.classList.add('animar');
                const somEnter = new Audio("./sons/8 Bit Video Game - 32.mp3");
                somEnter.currentTime = 0; // reinicia o som caso já esteja tocando
                somEnter.play();
                setTimeout(() => {
                    foco.classList.remove('animar');
                    window.location.href = "./index.html";
                    
    
                }, 500);

            } else if (foco.tagName === "H1") {
                foco.classList.add('animar');
                const somEnter = new Audio("./sons/plim3.mp3");
                somEnter.currentTime = 0; // reinicia o som caso já esteja tocando
                somEnter.play();
                setTimeout(() => {
                    foco.classList.remove('animar');
                    window.location.href = "./perguntas.html";
    
                }, 500);
           
            }
        }
    });
});

// -----------------------
// Bloqueio de clique do mouse (opcional)
// -----------------------
document.addEventListener("click", () => {
    contadorCliques++;
    const balaos = Array.from(document.querySelectorAll(".container img"));
    balaos.forEach(b => { b.style.opacity = "0"; b.style.transform = "translateY(0)"; });
    const somEnter = new Audio("./sons/8 Bit Video Game - 11.mp3");
    somEnter.currentTime = 0;
    somEnter.play();

    if (contadorCliques === 3) {
        const somEnter = new Audio("./sons/8 Bit Video Game - 10.mp3");
        somEnter.currentTime = 0;
        somEnter.play();
        const overlay = document.getElementById("overlay");
        overlay.style.display = "flex";
      
      document.addEventListener("keydown", async (e) => {
        if (e.key === "Enter" && overlay.style.display === "flex") {
          overlay.style.display = "none";
        }
      });
     
      contadorCliques = 0;
    }
});
