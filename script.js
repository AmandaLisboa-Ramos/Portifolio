fetch('https://api.github.com/users/AmandaLisboa-Ramos/repos')
    .then(res => res.json())
    .then(repos => {
      const projetos = repos
        .filter(repo => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 4);

      const lista = document.getElementById('github-projetos');
      lista.innerHTML = "";

      projetos.forEach(repo => {
        const item = document.createElement('li');
        item.innerHTML = `
          <a href="${repo.html_url}" target="_blank">
            <strong>${repo.name}</strong><br>
            <span>${repo.description || "Sem descrição 😅"}</span>
          </a>
        `;
        lista.appendChild(item);
      });
    })
    .catch(error => {
      const lista = document.getElementById('github-projetos');
      lista.innerHTML = "<li>Erro ao carregar projetos. 😢</li>";
      console.error(error);
    });
