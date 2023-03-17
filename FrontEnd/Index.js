if(sessionStorage.getItem('token') == undefined)
{
}
else
{
    //Si l'utilisateur est connecté, il peut se déconnecter et accède à la page d'édition
    window.location.href = 'edit.html';

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










//On se connecte à l'API
fetch('http://localhost:5678/api/works')
    .then(res => res.json())
    .then(data =>
    {
            //Affichage de tous les projets
            for(let i = 0; i < data.length; i++)
            {
                //On crée un élement 'figure' avec pour parent la div 'gallery'
                let figure = document.createElement('figure');
                let gallery = document.getElementsByClassName('gallery')[0];
                gallery.appendChild(figure);

                //On crée un élement 'img' avec pour parent l'element 'figure'
                let images = document.createElement('img');
                images.src = data[i].imageUrl;
                images.alt = data[i].title;
                images.crossOrigin = 'anonymous';
                figure.appendChild(images);

                //On crée un élement 'figcaption' avec pour parent l'element 'figure'                
                let figcaption = document.createElement('figcapiton');
                figcaption.innerText = data[i].title;
                figure.appendChild(figcaption);
            }

            //Affichage des projets selon le filtre choisi
            function generation(filtre) 
            {
                document.querySelector(".gallery").innerHTML = '';

                for(let i = 0; i < data.length; i++)
                {
                let figure = document.createElement('figure');
                let gallery = document.getElementsByClassName('gallery')[0];
                gallery.appendChild(figure);

                let images = document.createElement('img');
                images.src = filtre[i].imageUrl;
                images.alt = filtre[i].title;
                images.crossOrigin = 'anonymous';
                figure.appendChild(images);
                
                let figcaption = document.createElement('figcapiton');
                figcaption.innerText = filtre[i].title;
                figure.appendChild(figcaption);
                }
            }
        
        //Filtre qui fait apparaitre tous les projets
        const boutonFiltreTous = document.querySelector("#boutonTous");
        boutonFiltreTous.addEventListener("click", function () 
        {
            const filtre = data.filter(obj => obj.category.id > 0);
            generation(filtre);
        });

        //Filtre qui fait apparaitre les projets définis comme "objets"
        const boutonFiltreObjets = document.querySelector("#boutonObjets");
        boutonFiltreObjets.addEventListener("click", function () 
        {
            const filtre = data.filter(obj => obj.category.id == 1);          
            generation(filtre);

        });

        //Filtre qui fait apparaitre les projets définis comme "Appartements"
        const boutonFiltreAppartement = document.querySelector("#boutonAppartement");
        boutonFiltreAppartement.addEventListener("click", function () 
        {
            const filtre = data.filter(obj => obj.category.id == 2);
            generation(filtre);
        });

        //Filtre qui fait apparaitre les projets définis comme "Hotêl ou restaurant"
        const boutonHotelsRestaurants = document.querySelector("#boutonHotelsRestaurants");
        boutonHotelsRestaurants.addEventListener("click", function () 
        {
            const filtre = data.filter(obj => obj.category.id == 3);
            generation(filtre);
        });

        boutonTous.classList.toggle("active");

        //Lors d'un click sur un bouton, celui-ci devient 'actif' et les autres 'inactif'
        let btncol = document.querySelectorAll('.btn');
        btncol.forEach(btn2=>{
            btn2.addEventListener("click", () =>
            {

                boutonFiltreTous.classList.remove("active");
                boutonFiltreObjets.classList.remove("active");
                boutonFiltreAppartement.classList.remove("active");
                boutonHotelsRestaurants.classList.remove("active");



                btn2.classList.toggle("active");
            })
        })


    
    })

