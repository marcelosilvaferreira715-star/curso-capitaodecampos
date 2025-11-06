document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const user = document.getElementById("username").value.trim();
      const pass = document.getElementById("password").value.trim();

      if (user === "alunoxp2045" && pass === "alunoxp876") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "curso.html";
      } else {
        document.getElementById("loginMessage").textContent = "Usuário ou senha incorretos.";
      }
    });
  }

  // Protege a página do curso
  if (window.location.pathname.includes("curso.html")) {
    const logged = localStorage.getItem("isLoggedIn");
    if (!logged) window.location.href = "index.html";
  }
});
