function main() {
  renderToys()
  createFormListeners()
  updateLikes()
}

const toyCollection = document.querySelector('#toy-collection')


function renderToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      toys.forEach(renderToy)
    });
}

function renderToy(toy) {
  toyCollection.innerHTML += `<div class="card"><h2>${toy.name}</h2> <img src= ${toy.image} alt=${toy.name} class = 'toy-avatar'><p>${toy.likes} Likes</p><button data-id= ${toy.id} class='like-btn'>Like</button></div>`
}


function createFormListeners() {

  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('.add-toy-form')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault()  

    const formData = {
      name: e.target["name"].value,
      image: e.target["image"].value,
      likes: 0
    }

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(resp => resp.json())
      .then(toy => renderToy(toy))
    e.target.reset()
    addToy = !addToy;
    toyFormContainer.style.display = "none"
  })  
}

function updateLikes(){
 
  toyCollection.addEventListener('click', function(e){
    if (e.target.className === 'like-btn'){
      updateLike(e)
    } else if (e.target.className === 'toy-avatar'){
      e.target.parentNode.setAttribute('style', 'background-color: red;')
    } else if (e.target.className === 'card'){
      e.target.setAttribute('style', 'background-color: red;')
    }
  })

  function updateLike(e){    
    const toyId = e.target.dataset.id
    const toyLikes = e.target.previousElementSibling.innerText.split(' ')

    const formData = {
      likes: parseInt(toyLikes[0]) + 1
    }    

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })      
      .then(resp => resp.json())      
      .then(toy => e.target.previousElementSibling.innerHTML = `${toy.likes} Likes`)
  }
}








main()