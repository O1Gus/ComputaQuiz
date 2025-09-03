window.onload = () => {
  document.activeElement.blur();
};

document.addEventListener("DOMContentLoaded", () => {
  const selects = Array.from(document.querySelectorAll("select"));
  let currentIndex = 0;

  // Foca o primeiro select ao iniciar
  selects[currentIndex].focus();

  document.addEventListener("keydown", async (e) => {
    const currentSelect = selects[currentIndex];

    switch (e.key) {
      case "ArrowRight":
        // Vai para o próximo select
        if (currentIndex < selects.length - 1) {
          const somEnter = new Audio("./sons/plim1.mp3");
          somEnter.currentTime = 0; // reinicia o som caso já esteja tocando
          somEnter.play()
          currentIndex++;
          selects[currentIndex].focus();
        }
        break;

      case "ArrowLeft":
        // Volta para o select anterior
        
        if (currentIndex > 0) {
          const somEnter = new Audio("./sons/plim2.mp3");
          somEnter.currentTime = 0; // reinicia o som caso já esteja tocando
          somEnter.play();
          currentIndex--;
          selects[currentIndex].focus();
        }
        break;

      case "ArrowUp":
        // Seleciona a opção anterior
        if (currentSelect.selectedIndex > 0) {
          const somEnter = new Audio("./sons/plim1.mp3");
          somEnter.currentTime = 0; // reinicia o som caso já esteja tocando
          somEnter.play();
          currentSelect.selectedIndex--;
        }
        break;

      case "ArrowDown":
        // Seleciona a próxima opção
        if (currentSelect.selectedIndex < currentSelect.options.length - 1) {
          const somEnter = new Audio("./sons/plim4.mp3");
          somEnter.currentTime = 0; // reinicia o som caso já esteja tocando
          somEnter.play();
          currentSelect.selectedIndex++;
        }
        break;  

      case "Enter":

        // Verifica se a tela de aviso está visível
        if (overlay.style.display === "flex") {
            const somEnter = new Audio("./sons/plim3.mp3");
            somEnter.currentTime = 0; // reinicia o som caso já esteja tocando
            somEnter.play();
            overlay.style.display = "none";
            break;
        }

    // Coleta os valores dos selects
    let caractere1 = document.getElementById("caractere1").value;
    let caractere2 = document.getElementById("caractere2").value;
    let caractere3 = document.getElementById("caractere3").value;

    // Concatena os caracteres para formar o nickname
    const nickname = caractere1 + caractere2 + caractere3;
    
    // **AQUI ESTÁ A CHAVE: Enviando o nickname para o back-end**
    try {
        const response = await fetch('/api/salvar-nickname', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname }),
            credentials: 'include' // <<< isso é obrigatório para sessão funcionar
        });

        const data = await response.json();

        if (data.success) {
          alert(`Nickname '${nickname}' salvo com sucesso!`);
          window.location.href = "/perguntas.html"; // redireciona automaticamente
        } else {
            alert(`Erro ao salvar nickname: ${data.message}`);
        }
        } catch (error) {
            const somEnter = new Audio("./sons/plim3.mp3");
            somEnter.currentTime = 0; // reinicia o som caso já esteja tocando
            somEnter.play();
            console.error('Erro de conexão:', error);
            alert('Não foi possível conectar ao servidor. Tente novamente.');
        }
        window.location.href = "/perguntas.html";
        break;
       
        

      default:
        e.preventDefault(); // Bloqueia outras teclas
        break;
    }

    e.preventDefault();
  });

  // Bloqueia uso do mouse
  document.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
});



let contadorCliques = 0;
document.addEventListener("click", () => {
    contadorCliques++;

    if (contadorCliques === 3) {
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