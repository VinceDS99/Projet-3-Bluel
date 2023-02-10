var formConnex = document.getElementById('formulaireConnexion');

formConnex.addEventListener('submit', function(e)
{
    var maConnex = document.getElementById('email');
    if(maConnex.value.trim() =="")
    {
        e.preventDefault();
        window.alert("Merci d'entrer un mail");
    }

    else
    {
        var maConnex = document.getElementById('password');
        if(maConnex.value.trim() =="")
        {
            e.preventDefault();
            window.alert("Merci d'entrer un mot de passe")
        }
    }
}
)





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
            window.alert('User not found');
        } 

        else
        {
            window.location.href = 'Edit.html';
        }
        // 
    })
    .catch(error => console.log(error))
    


})




