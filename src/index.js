let addToy = false;
const form = document.querySelector('.add-toy-form')
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

function main() {
  renderToys()

}

function renderToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      toys.forEach(renderToy)
    });
}

function renderToy(toy) {
  const toyCollection = document.querySelector('#toy-collection')
  toyCollection.innerHTML += `<p>${toy.name} - <img src= ${toy.image} alt=${toy.name}></p>`
}




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

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: e.target["name"].value,
      image: e.target["image"].value
    })
  })
  e.target.reset()

})




main()