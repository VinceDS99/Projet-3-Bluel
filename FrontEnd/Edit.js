if(sessionStorage.getItem('token') == undefined)
{
    console.log("pas connecté");
    console.log(sessionStorage.getItem('token'));
    window.location.href = 'login.html';
    window.alert('Merci de vous connecter pour accéder aux modifications')
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
        window.location.href = 'index.html';
        sessionStorage.removeItem('token');
    });

}


fetch('http://localhost:5678/api/works')
.then(res => res.json())
// .then (data => console.log(data))
.then(data =>
{

    for(let i = 0; i < data.length; i++)
    {
        let figure = document.createElement('figure');
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
            console.log(url);


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
                console.log(data);
                window.location.href = 'Edit.html';
            }
            )
        }
        )

    }

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
        console.log('oui');
    }
}
)

document.querySelector("form[name='form']").addEventListener("submit", (e) => 
{
    var Photo = document.getElementById('image');
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
        if(Categorie.value.trim() =="")
        {
            e.preventDefault();
            window.alert("Merci d'entrer une catégorie")
        }
    }

    else
    {
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
            console.log(data);
            window.location.href = 'Edit.html';
        }
        )
    }
}
)





