if(sessionStorage.getItem('token') == undefined)
{

}
else
{
    //Si l'utilisateur est connecté, il peut se déconnecter et accède à la page d'édition
    let log = document.getElementById('log');
    log.innerText = 'logout';
    log.href = '';

    const log2 = document.querySelector("#log");
    log2.addEventListener("click", function () 
    {
        sessionStorage.removeItem('token');
        window.location.href = 'index.html';
    });


    let index = document.getElementById('index');
    index.href = 'edit.html';
}








var formu = document.querySelector('.form');

formu.addEventListener('submit', event =>{
    event.preventDefault();

    const formData = new FormData(formu);

    const data = Object.fromEntries(formData);

    //On envoi le formulaire de connexion à l'API qui nous connecte si l'identifiant et le mot de passe sont correct

    fetch('http://localhost:5678/api/users/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    )
    .then(res => res.json())
    .then(data => {
        if(data.message == 'user not found') 
        {
            window.alert('E-mail incorrect !');
        } 

        else if(data.token === undefined)
        {

            window.alert('Mot de passe incorrect !');

        }
        else
        {
            //Si l'identifiant et le mot de passe sont correct, l'utilisateur est connecté et une session est crée
            window.location.href = 'Edit.html';
            sessionStorage.setItem('token', data.token)
        }
        // 
    })
    .catch(error => console.log(error))
    


})




