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

    const modalContainer = document.querySelector(".modal-container");
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

    function toggleModal()
    {
        modalContainer.classList.toggle("active");
        console.log('fff');
    }
    
    })

