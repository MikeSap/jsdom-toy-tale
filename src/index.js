  let addToy = false;

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector('#toy-collection')

  function main(){
    renderToys()
    addListeners()
  }

  function renderToys(){
    fetch (`http://localhost:3000/toys`)
    .then(resp => resp.json())
    .then(renderToy)
  }

  const renderToy = (toys) => {
    const renderable = Array.isArray(toys) ? toys : [toys]
    renderable.forEach(toy => {
    toyCollection.innerHTML += 
    `<div data-id=${toy.id} class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes}</p> 
        <p>Likes </p>
        <button data-id=${toy.id} class="like-btn"> Like </button>
    </div>`  
    })
  }

  function addListeners(){
  
    addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      addNewToy(e)
      form.reset()
      addBtn.click()
    })

    toyCollection .addEventListener('click', (e) => {
     if(e.target.className == 'like-btn') {
       addLike(e)
      }     
    })

}

function addLike(e){
  let likes = parseInt(e.target.previousElementSibling.previousElementSibling.innerText)
  
  const toyData = {
    likes: likes + 1
   }

   const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
      body: JSON.stringify(toyData)
    }

  fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, reqObj)
  .then(resp => resp.json())
  .then(updatedToy => {
    e.target.previousElementSibling.previousElementSibling.innerText = updatedToy.likes
  })
}

function addNewToy(e){
  const toyData = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
   }

   const reqObj = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
      body: JSON.stringify(toyData)
    }

  fetch(`http://localhost:3000/toys`, reqObj)
  .then(resp => resp.json())
  .then(renderToy)
}

main()