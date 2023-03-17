//Gestion des autorisations d'accés
if(sessionStorage.getItem('token') == undefined)
{
    //Si l'utilisateur n'est pas connecté il n'a pas accés à la page d'édition
    window.alert('Merci de vous connecter pour accéder aux modifications')
    window.location.href = 'login.html';
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
        window.location.href = 'index.html';
        sessionStorage.removeItem('token');
    });

    let index = document.getElementById('index');
    index.href = 'edit.html';
}




//Fonction permettant de générer tous les travaux de l'API
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

            let div = document.createElement('div');
            div.setAttribute('class', 'imagediv');
            figure2.appendChild(div);


            let images2 = document.createElement('img');
            images2.src = data[i].imageUrl;
            images2.alt = data[i].title;
            images2.height = 150;
            images2.width = 100;
            images2.crossOrigin = 'anonymous';
            div.appendChild(images2);




            //Ajout d'une icône 'poubelle' à côté de chaque image de projet
            let icone  = document.createElement('i');
            icone.setAttribute('class', 'fa-solid fa-trash-can');
            icone.setAttribute('name', 'trash');
            div.appendChild(icone);
            let trash2 = document.getElementsByClassName('fa-trash-can')[i];

            if(i == 0)
            {
                let icone  = document.createElement('i');
                icone.setAttribute('class', 'fa-solid fa-arrows-up-down-left-right');
                icone.setAttribute('name', 'arrow');
                div.appendChild(icone);
            }
            
            let figcaption = document.createElement('figcaption');
            figcaption.innerText = "éditer";
            figcaption.setAttribute('class', 'figcaption');
            figure2.appendChild(figcaption);



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
                    //On met à jour la page sans l'actualiser
                    document.querySelector(".gallery").innerHTML = '';
                    document.querySelector(".modal1").innerHTML = '';

                    //Re-génération de la page sans le projet supprimé
                    generation();
                }
                )
            }
            )

        }

    }
    )
}

//Première génération de la page
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



//Bouton de retour en arrière
const boutonRetourArriere = document.querySelector("#back");
boutonRetourArriere.addEventListener("click", function () 
{
    modalContainer.classList.toggle("active");
    modalContainer2.classList.remove("active");
});




//Appartion de l'image lors de l'ajout de projet
var img = document.getElementById('image');
img.addEventListener("change", inpute);
function inpute()
{
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

        str = img.src;
        jpg = str.substring(11, 15);
        png = str.substring(11,14);

        if(jpg == "jpeg")
        {
            console.log("jpeg");
        } 
        
        else if(png == "png")
        {
            console.log("png");
        } 
        else
        {
            var imge = document.getElementById("imagehtml");
            imge.removeAttribute("src");
            imge.classList.remove("active");
            var upl = document.getElementById("upload");
            upl.classList.remove("active");
            window.alert("Format d'image invalide !");
        }
        }
}





//Envoi du formulaire d'ajout à l'API
document.querySelector("form[name='form']").addEventListener("submit", (e) => 
{
    var Photo = document.getElementById('image');
    var Titre = document.getElementById('title');
    var Categorie = document.getElementById('category');
    

    //On vérifie que tous les champs sont remplis
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
        const formData = new FormData(e.target);

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
            //On fait disparaitre la fenêtre modale après l'ajout du projet
            var modalContainer2 = document.getElementById("modal2");
            modalContainer2.classList.remove("active");

            //On met à jour la page sans l'actualiser
            document.querySelector(".gallery").innerHTML = '';
            document.querySelector(".modal1").innerHTML = '';

            //On réinitialise le formulaire d'ajout afin qu'il soit à nouveau utilisable
            var imge = document.getElementById("imagehtml");
            imge.removeAttribute("src");
            imge.classList.remove("active");
            var upl = document.getElementById("upload");
            upl.classList.remove("active");

            document.getElementById("formProjet").reset();

            //On re-génere les projets avec cette fois le nouveau qui vient d'être ajouté
            generation();
        }
        )
    }
}
)
    