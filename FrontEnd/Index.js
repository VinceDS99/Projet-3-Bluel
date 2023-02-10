fetch('http://localhost:5678/api/works')
    .then(res => res.json())
    // .then (data => console.log(data))
    .then(data =>{

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


        const btncol = document.querySelectorAll('.btn');
        btncol.forEach(btn2=>{
            btn2.addEventListener("click", () =>{
            document.querySelector('.boutonActif')?.classList.remove;
            btn2.classList.add('boutonActif');
            })
        })

        






    
    })

