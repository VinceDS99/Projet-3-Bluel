if(sessionStorage.getItem('token') == undefined)
{
}
else
{
    console.log("connecté");
    console.log(sessionStorage.getItem('token'));

    let log = document.getElementById('log');
    log.innerText = 'logout';
    log.href = '';

    const log2 = document.querySelector("#log");
    log2.addEventListener("click", function () 
    {
        console.log('clikkk'); 
        sessionStorage.removeItem('token');
        window.location.href = 'index.html';
    });
}












var formConnex = document.getElementById('formulaireConnexion');



var formu = document.querySelector('.form');

formu.addEventListener('submit', event =>{
    event.preventDefault();

    const formData = new FormData(formu);
    console.log(formData);

    const data = Object.fromEntries(formData);
    console.log(data);

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
        console.log(data);
        if(data.message == 'user not found') 
        {
            window.alert('E-mail incorrect !');
        } 

        else if(data.token === undefined)
        {
            console.log('token non defini');
            console.log(data.message);
            console.log(data.token)

            window.alert('Mot de passe incorrect !');

        }
        else
        {
            window.location.href = 'Edit.html';
            console.log('tout est bon');
            console.log(data.message);
            console.log(data.token)
            sessionStorage.setItem('token', data.token)
        }
        // 
    })
    .catch(error => console.log(error))
    


})




