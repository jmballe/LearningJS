
const github = new GitHub;

const ui = new UI;
//Search input
const searchUser = document.getElementById('searchUser');

//Search input event EventListener
searchUser.addEventListener('keyup', (e) => {
    //Get input text
    const userText = e.target.value;

    if(userText !== ''){
        //Make http call
        github.getUser(userText)
        .then(data => {
            if (data.message === 'User Not Found') {
                //Show alert
                ui.showAlert('User Not Found','alert alert-danger');
            } else {
                //Show profile
                // ui.clearAlert();
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
            
        })
    } else {
        //Clear profile
        ui.clearProfile();
    }
})