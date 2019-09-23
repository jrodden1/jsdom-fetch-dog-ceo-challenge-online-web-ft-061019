// console.log('%c HI', 'color: firebrick')


// function addImages() {
   // get my images from the dog.ceo api in an array
   

   // let dogImg = {}
   // fetch(imgUrl)
   //    .then(resp => resp.json())
   //    .then(json => returnJson(json));
      
   // const imageArr = getImages()
   // // then create my img tag elements for each image
   

// }

function fetchImages() {
   const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

   fetch(imgUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
         imgActions(json)
      })
}

function fetchBreeds() {
   const breedUrl = "https://dog.ceo/api/breeds/list/all"

   fetch(breedUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
         breedActions(json)
      })
}



function imgActions(json) {
   const dogImgLinkArr = json.message
   let body = document.body
   
   dogImgLinkArr.forEach(link => {
      let element = document.createElement("img")
      element.src = link
      element.alt = "image of dog breed"
      body.appendChild(element)
   })
}

function changeColor(event) {
   event.currentTarget.style.color = "red"
}



function breedActions(json) {
   const dogBreeds = Object.entries(json.message)
   const dogBreedUl = document.querySelector("#dog-breeds")   

   // clears out existing dog breed Li's if exist
   while (dogBreedUl.firstChild) {
      dogBreedUl.removeChild(dogBreedUl.firstChild);
   }

   dogBreeds.forEach(breed => {
      const mainBreed = breed[0]
      if(breed[1].length == 0) {
         let li = document.createElement("li")
         li.textContent = mainBreed
         li.className = mainBreed
         li.addEventListener("click", changeColor)
         dogBreedUl.appendChild(li)
      } else {
         const breedNameArr = breed[1]
   
         breedNameArr.forEach(breedPrefix => {
            breedName = `${breedPrefix} ${mainBreed}`
            let li = document.createElement("li")
            li.textContent = breedName
            li.className = mainBreed
            li.addEventListener("click", changeColor)
            dogBreedUl.appendChild(li)
         })
      }
   })
}

// let imgJson = {}

// function parsedJson(json) {
//    imgJson = json
// }

// function getImages() {
   // const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
   
   // returns the json objects array of images
// }

// function createImgTagHtml(imageUrl) {
   // take in an image url and return a string of html 
// }
function filterBreedList(event) {
   event.preventDefault()
   const filteredLetter = document.querySelector("#breed-dropdown").value

   const breedsStartingWithLetter = document.querySelectorAll(`li[class^=\'${filteredLetter}\']`)
   // clears out my ul to only show the ones I want; should probably refactor this so that it hides instead of trashing the Li's
   const dogBreedUl = document.querySelector("#dog-breeds")   
   while (dogBreedUl.firstChild) {
      dogBreedUl.removeChild(dogBreedUl.firstChild);
   }
   
   const filteredDogBreedsArr = Object.entries(breedsStartingWithLetter)
   filteredDogBreedsArr.forEach(breedLi => {
      dogBreedUl.appendChild(breedLi[1])
   })
}

document.addEventListener("DOMContentLoaded", function() {
   // Initially fetch images and breed info into LIs 
   fetchImages()
   fetchBreeds()
   
   // enable listening for events on the filter
   const filterForm = document.querySelector("#filter-breed")
   filterForm.addEventListener("submit", filterBreedList)
   const resetFilter = document.querySelector("#reset-btn")
   resetFilter.addEventListener("click", fetchBreeds)

});