//get random pokemon function
getRandomPokemon(Math.floor(Math.random() * 100));

//get wrong Pokemon names
const wrongPokemon = [];

function getWrongPokemon(id) {
  for (let i=1; i<=10; i++) {
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id * i}`)
      .then((result) => {
        wrongPokemon.push(result.data);                  
  })
}

setTimeout(() => {
console.log(wrongPokemon);
}, 3000);
}

getWrongPokemon(Math.floor(Math.random() * 100+1));


//get correct Pokemon names and images
const correctPokemon = [];

function getRandomPokemon(id) {
  for (let i=1; i<=10; i++) {
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id * i}`)
      .then((result) => {
        correctPokemon.push(result.data);
    
  })
  }
}

//create and append all question lines to form
setTimeout(() => {
for (let i = 0; i < correctPokemon.length; i++) {
  console.log(correctPokemon[i].name)
  //declaring HTML elements to be appended
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("quiz__question");
  imgContainer.setAttribute("id", correctPokemon[i].name)
  const pokemonImg = document.createElement("img");
  pokemonImg.classList.add("quiz__img");
  pokemonImg.setAttribute("src", correctPokemon[i].sprites.front_default);
  
  imgContainer.appendChild(pokemonImg);
  const form = document.querySelector(".quiz");
  form.appendChild(imgContainer);
  const correctResponseContainer = document.createElement("div");
  const randomButtonNumber = Math.floor((Math.random()*2)+1)
  correctResponseContainer.classList.add(`quiz__button${randomButtonNumber}`);

  correctResponseContainer.addEventListener("click", correctAnswer)

  
  imgContainer.appendChild(correctResponseContainer);
  correctResponseContainer.innerText = correctPokemon[i].name;
  const wrongResponseContainer = document.createElement("div");
  wrongResponseContainer.classList.add(`quiz__button${3 - randomButtonNumber}`);
  imgContainer.appendChild(wrongResponseContainer);
  wrongResponseContainer.innerText = wrongPokemon[i].name;
  wrongResponseContainer.addEventListener("click", wrongAnswer)
  
}
}, 2500);
const button1 = document.querySelectorAll(`.quiz__button1`)
const button2 = document.querySelectorAll(`.quiz__button2`)

//handle correct answer click
function correctAnswer(e) {
  console.log(e);
  if (e.target.innerText === e.target.parentNode.id) {
    e.target.style.backgroundColor = "green"
  } else {
    e.target.style.backgroundColor = "red"
  }
}

//handle wrong answer click
function wrongAnswer(e) {
  console.log(e);
  if (e.target.innerText === e.target.parentNode.id) {
    e.target.style.backgroundColor = "green"
  } else {
    e.target.style.backgroundColor = "red"
    }
}
