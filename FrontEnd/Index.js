if(sessionStorage.getItem('token') == undefined)
{
}
else
{
    console.log("connecté");
    console.log(sessionStorage.getItem('token'));

    window.location.href = 'edit.html';

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

    let index = document.getElementById('index');
    index.href = 'edit.html';

}











fetch('http://localhost:5678/api/works')
    .then(res => res.json())
    .then(data =>{

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

        const boutonFiltreTous = document.querySelector("#boutonTous");
        boutonFiltreTous.addEventListener("click", function () 
        {
            const filtre = data.filter(obj => obj.category.id > 0);
            console.log(filtre);  
            generation(filtre);
        });

        const boutonFiltreObjets = document.querySelector("#boutonObjets");
        boutonFiltreObjets.addEventListener("click", function () 
        {
            const filtre = data.filter(obj => obj.category.id == 1);          
            console.log(filtre);  
            generation(filtre);

        });

        const boutonFiltreAppartement = document.querySelector("#boutonAppartement");
        boutonFiltreAppartement.addEventListener("click", function () 
        {
            const filtre = data.filter(obj => obj.category.id == 2);
            console.log(filtre);  
            generation(filtre);
        });

        const boutonHotelsRestaurants = document.querySelector("#boutonHotelsRestaurants");
        boutonHotelsRestaurants.addEventListener("click", function () 
        {
            const filtre = data.filter(obj => obj.category.id == 3);
            console.log(filtre);  
            generation(filtre);
        });


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

