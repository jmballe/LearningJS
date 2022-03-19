class UI{
    constructor(){
        this.profile = document.getElementById('profile');
    }

    showProfile(user){
        this.profile.innerHTML = `
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid mb-2" src="${user.avatar_url}">
                    <div class="d-grid">
                        <a href="${user.html_url}" target="_blank" class= "btn btn-primary btn-block mb-4">View Profile</a>
                    </div>    
                </div>
                <div class="col-md-9">
                    <span class="badge bg-primary mb-1">Public Repos: ${user.public_repos}</span>
                    <span class="badge bg-secondary mb-1">Public Gists: ${user.public_gists}</span>
                    <span class="badge bg-success mb-1">Followers: ${user.followers}</span>
                    <span class="badge bg-info mb-1">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/Blog: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member since: ${user.created_at}</li>
                    </ul>
                </div>
            </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div id="repos"></div>
        `;
    }

    //Show user Repos
    showRepos(repos){
        let output = '';

        repos.forEach(function(repo){
            output += `
            <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                        <span class="badge bg-primary">Stars: ${repo.stargazers_count}</span>
                        <span class="badge bg-secondary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge bg-success">Forks: ${repo.forks}</span>
                    </div>
                </div>
            </div>
            `;
        });

        document.getElementById('repos').innerHTML= output;
    }


    //Show alert message
    showAlert(message, className){
        //Clear any remaining alert
        this.clearAlert();
        //Create container for alert message
        const div = document.createElement('div');
        div.className = className;
        //add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.searchContainer');
        //Get search box
        const search =document.querySelector('.search');
        //Insert alert
        container.insertBefore(div,search);

        setTimeout(() => {
            this.clearAlert();
        },3000)
    }

    //Clear alert message
    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }

    //Clear profile view
    clearProfile(){
        this.profile.innerHTML = '';
    }
}