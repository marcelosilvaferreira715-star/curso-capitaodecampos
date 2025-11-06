document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logout");

  // LOGIN
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const user = document.getElementById("username").value.trim();
      const pass = document.getElementById("password").value.trim();

      if (user === "alunoxp2045" && pass === "alunoxp876") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("progress", "0");
        window.location.href = "curso.html";
      } else {
        document.getElementById("loginMessage").textContent = "Usuário ou senha incorretos.";
      }
    });
  }

  // PROTEÇÃO
  if (window.location.pathname.includes("curso.html")) {
    const logged = localStorage.getItem("isLoggedIn");
    if (!logged) window.location.href = "index.html";
  }

  // LOGOUT
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "index.html";
    });
  }

  // MENU E PROGRESSO
  const links = document.querySelectorAll("#sidebar a");
  const conteudo = document.getElementById("conteudo");
  const progressBar = document.getElementById("progress-bar");

  if (links.length > 0) {
    let progress = JSON.parse(localStorage.getItem("progresso")) || [];

    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const page = link.dataset.page;
        fetch(`conteudos/${page}`)
          .then(r => r.text())
          .then(html => {
            conteudo.innerHTML = html;
            link.classList.add("active");
            if (!progress.includes(page)) {
              progress.push(page);
              localStorage.setItem("progresso", JSON.stringify(progress));
              atualizarProgresso();
            }
          });
      });
    });

    function atualizarProgresso() {
      const total = links.length;
      const atual = progress.length;
      const porcentagem = (atual / total) * 100;
      progressBar.style.width = `${porcentagem}%`;
    }

    atualizarProgresso();
  }
});
