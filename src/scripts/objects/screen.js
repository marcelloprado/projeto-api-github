const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}"alt="Foto do perfil do usuário" />
                                            <div class="data">
                                                <h1>
                                                ${user.name ?? 'não possui nome cadastrado 😥'}
                                                </h1>
                                                <p>
                                                ${user.bio ?? 'não possui bio cadastrada 😥'}
                                                </p>
                                            </div>
                                            </div>
                                            <div class="seguir">
                                                <p class="seguidores">
                                                👥Seguidores: ${user.followers}
                                                </p>
                                                <p class="seguindo">
                                                👥Seguindo: ${user.following}
                                                </p>
                                            </divcl>`

        if (user.repositories.length > 0) {
            let repositoriesItem = ''
            user.repositories.forEach(repo => {
                repositoriesItem += `<li>
                                    <a href="${repo.html_url}" target="_blank">${repo.name}
                                    <ul>
                                        <li class="list repo">🍴${repo.forks}</li>
                                        <li class="list repo">⭐${repo.stargazers_count}</li>
                                        <li class="list repo">👀${repo.watchers}</li>
                                        <li class="list repo">👩‍💻${repo.language ?? 'sem linguagem'}</li>
                                    </ul>
                                </a>
                            </li>`
            })
            this.userProfile.innerHTML += `<div class="repositories info">
                                                <h2>repositórios</h2>
                                                <ul>${repositoriesItem}</ul><br>
                                            </div>`
        }

        if (user.events.length > 0) {
            let eventsItems = ''
            user.events.forEach(event => {
                if (event.payload) {
                    if (event.payload.commits) {
                        const commits = event.payload.commits
                        const commitsList = commits.filter(commit => `<a>${commit.message}</a>`)

                        eventsItems += `<li><a class="fontes">${event.repo.name} - </a>${commitsList[0].message}</li>`
                    } else {
                        eventsItems += `<h4 class="erro-commits">"Não possui Commits 😥"</h4>`
                    }
                }
            })
            this.userProfile.innerHTML += `<div class="events">
                                            <h3>Eventos</h3></br>
                                            <ul>${eventsItems}</ul>
                                        </div>`
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}
export { screen }