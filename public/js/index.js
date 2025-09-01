// js/index.js
// -----------------------
// Variáveis e inicialização
// -----------------------
let contadorCliques = 0;
let vidaExtra = false;
let elementos = [];
let indexAtual = 0;

window.onload = () => {
    document.activeElement.blur();
};

// -----------------------
// Função que abre a tela login do Google
// -----------------------
function abrirLoginGoogle() {
    window.location.href = "/auth/google";
}

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
            indexAtual = (indexAtual + 1) % elementos.length;
            elementos[indexAtual].focus();
            // Limpa os balões ao mudar de item
            balaos.forEach(b => { b.style.opacity = "0"; b.style.transform = "translateY(0)"; });

        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            indexAtual = (indexAtual - 1 + elementos.length) % elementos.length;
            elementos[indexAtual].focus();
        }

        // Lógica da tecla Enter
        if (e.key === "Enter") {
            if (foco.tagName === "H2") {
                foco.classList.add('animar');
                setTimeout(() => {
                    foco.classList.remove('animar');
                    abrirLoginGoogle();
                }, 500);
            } else if (foco.tagName === "H1") {
                // Lógica dos balões
                if (vidaExtra) {
                    balaos[5].style.opacity = "1";
                    balaos[5].style.transform = "translateY(30px)";
                } else {
                    const estilo = window.getComputedStyle(foco);
                    const opacidade = parseFloat(estilo.opacity);
                    
                    if (opacidade <= 0.5) {
                        balaos[0].style.opacity = "1";
                        balaos[0].style.transform = "translateY(30px)";
                    } else if (opacidade > 0.5 && opacidade <= 0.6) {
                        balaos[1].style.opacity = "1";
                        balaos[1].style.transform = "translateY(30px)";
                    } else if (opacidade > 0.6 && opacidade <= 0.7) {
                        balaos[2].style.opacity = "1";
                        balaos[2].style.transform = "translateY(30px)";
                    } else if (opacidade > 0.7 && opacidade <= 0.9) {
                        balaos[3].style.opacity = "1";
                        balaos[3].style.transform = "translateY(30px)";
                    } else if (opacidade > 0.9) {
                        balaos[4].style.opacity = "1";
                        balaos[4].style.transform = "translateY(30px)";
                        vidaExtra = true;
                    }
                }
            }
        }
    });
});

// -----------------------
// Bloqueio de clique do mouse (opcional)
// -----------------------
document.addEventListener("click", () => {
    contadorCliques++;
    // Limpa os balões ao clicar
    const balaos = Array.from(document.querySelectorAll(".container img"));
    balaos.forEach(b => { b.style.opacity = "0"; b.style.transform = "translateY(0)"; });

    if (contadorCliques === 5) {
        alert("Você clicou 5 vezes!");
        contadorCliques = 0;
    }
});