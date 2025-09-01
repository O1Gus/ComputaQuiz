let vidas = 3;
let pontuacao = 0;

function perderVida() {
  vidas--;
  if (vidas <= 0) {
    mostrarGameOver();
  }
}

function mostrarGameOver() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('game-over').classList.remove('hidden');
  document.getElementById('final-score').textContent = pontuacao;
}

function reiniciarJogo() {
  vidas = 3;
  pontuacao = 0;
  document.getElementById('game-over').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
}

// Simula o fim do jogo
function simularFimDeJogo() {
  pontuacao = Math.floor(Math.random() * 100); // valor de exemplo
  perderVida();
  perderVida();
  perderVida();
}