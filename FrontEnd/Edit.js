//Gestion des autorisations d'accés
if(sessionStorage.getItem('token') == undefined)
{
    window.location.href = 'login.html';
    window.alert('Merci de vous connecter pour accéder aux modifications')
}
else
{

    let log = document.getElementById('log');
    log.innerText = 'logout';
    log.href = '';

    const log2 = document.querySelector("#log");
    log2.addEventListener("click", function () 
    {
        window.location.href = 'index.html';
        sessionStorage.removeItem('token');
    });

    let index = document.getElementById('index');
    index.href = 'edit.html';
}





function generation () 
{
    fetch('http://localhost:5678/api/works')
    .then(res => res.json())
    .then(data =>
    {
        for(let i = 0; i < data.length; i++)
        {
            let figure = document.createElement('figure');
            figure.setAttribute('id', "accueil" + data[i].id);
            let gallery = document.getElementsByClassName('gallery')[0];
            gallery.appendChild(figure);

            let images = document.createElement('img');
            images.src = data[i].imageUrl;
            images.alt = data[i].title;
            images.crossOrigin = 'anonymous';
            figure.appendChild(images);
            
            let figcaption = document.createElement('figcapiton');
            figcaption.innerText = data[i].title;
            figure.appendChild(figcaption);
        }

        for(let i = 0; i < data.length; i++) 
        {
            let figure2 = document.createElement('figure');
            figure2.setAttribute('class', 'figure2');
            let modal1 = document.getElementsByClassName('modal1')[0];
            modal1.appendChild(figure2);

            let images2 = document.createElement('img');
            images2.src = data[i].imageUrl;
            images2.alt = data[i].title;
            images2.height = 150;
            images2.width = 100;
            images2.crossOrigin = 'anonymous';
            figure2.appendChild(images2);

            let icone  = document.createElement('i');
            icone.setAttribute('class', 'fa-solid fa-trash-can');
            icone.setAttribute('name', 'trash');
            figure2.appendChild(icone);

            
            let trash2 = document.getElementsByClassName('fa-trash-can')[i];

            trash2.addEventListener("click", function () 
            {

                let url = "http://localhost:5678/api/works/"+data[i].id;
                fetch(url,
                {
                    method: 'DELETE',
                    headers: 
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    },
                }
                )
                .then(data => 
                {
                    // let imageSuppr = document.getElementById(data[i].id)
                    // imageSuppr.parentElement.removeChild(imageSuppr);

                    // let accueilSuppr = document.getElementById("accueil"+ data[i].id)
                    // accueilSuppr.parentElement.removeChild(accueilSuppr);

                    document.querySelector(".gallery").innerHTML = '';
                    document.querySelector(".modal1").innerHTML = '';
                    generation();
                }
                )
            }
            )

        }

    }
    )
}

generation();








//Code des deux modales
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal()
{
    modalContainer.classList.toggle("active");
}

const modalContainer2 = document.querySelector(".modal-container2");
const modalTriggers2 = document.querySelectorAll(".modal-trigger2");

modalTriggers2.forEach(trigger => trigger.addEventListener("click", toggleModal2))

function toggleModal2()
{
    modalContainer.classList.remove("active");
    modalContainer2.classList.toggle("active");
}
var img = document.getElementById('image');



//Bouton de retour en arrière
const boutonRetourArriere = document.querySelector("#back");
boutonRetourArriere.addEventListener("click", function () 
{
    modalContainer.classList.toggle("active");
    modalContainer2.classList.remove("active");
});


//Appartion de l'image lors de l'ajout
img.addEventListener("change", inpute);
function inpute(){
    var input = document.getElementById('image');

    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function(event)
    {
        var img = document.getElementById("imagehtml");
        img.src = event.target.result;
        img.classList.toggle("active");

        var upload = document.getElementById("upload");
        upload.classList.toggle("active");
    }

}





//Envoi du formulaire à l'API


    document.querySelector("form[name='form']").addEventListener("submit", (e) => 
    {
        var Photo = document.getElementById('image');
        console.log(Photo.src);
        console.log(Photo.value);
        var Titre = document.getElementById('title');
        var Categorie = document.getElementById('category');
    
        e.preventDefault();
    
        if(Photo.value.trim() == "")
        {
        e.preventDefault();
        window.alert("Merci d'ajouter une photo");
        }
        
    
        else if(Titre.value.trim() == "")
        {
            e.preventDefault();
            window.alert("Merci d'ajouter un titre");
        }
    
        else if(Categorie.value.trim() == "")
        {
            e.preventDefault();
            window.alert("Merci d'entrer une catégorie")
        }
    
        else
        {
            let file;
            





            const formData = new FormData(e.target);
            console.log(formData);
    
            fetch('http://localhost:5678/api/works',
            {
                method: 'POST',
                headers: 
                {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: formData
            }
            )
            .then(res => res.json())
            .then(data => 
            {
                var modalContainer2 = document.getElementById("modal2");
                modalContainer2.classList.remove("active");

                // var modal1 = document.getElementById("modal1");
                // modal1.classList.toggle("active");

                document.querySelector(".gallery").innerHTML = '';
                document.querySelector(".modal1").innerHTML = '';
                generation();
            }
            )
        }
    }
    )
    