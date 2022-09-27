const theMenuDiv = document.getElementById("ramen-menu")
const theDetailPanel = document.getElementById("ramen-detail")
const newRamenForm = document.getElementById("new-ramen")
let newRamenId = 1
let firstRamen = true
// set up listeners for ramen-menu and new-ramen form
// theMenuDiv.addEventListener("click", (e) => clickedMenuItem(e))
newRamenForm.addEventListener("submit", (e) => addNewRamen(e))

fetch("http://localhost:3000/ramens")
.then((resp) => resp.json())
.then((resp) => processRamens(resp))
.catch((err) => alert(err))

function processRamens(ramens) {
    ramens.forEach((ramen) => displayMenuItem(ramen))
}


// see all ramen images ✓
function displayMenuItem(ramen) {
    const menuImg = document.createElement("img")
    menuImg.src = ramen["image"]
    menuImg.id = ramen["id"]
    menuImg.onclick = () => displayDetail(ramen)
    theMenuDiv.appendChild(menuImg)
    newRamenId++
    // display detail for first loaded menu item
    if (firstRamen === true) {
        displayDetail(ramen)
        firstRamen = false
    }
}

// click image, see info in the detail panel ✓
// function clickedMenuItem(e) {
//     if (e.target = "img") {
//         // either I need a global array of ramen objects,
//         // or I need to do another GET request each time a menu
//         // item is clicked. I don't think doing another GET request
//         // for data I've already had in a function is elegant
//         // but I don't want to waste time figuring out how to 
//         // construct and return a global allRamenObjects object
//         // so I'm going to do another server call.
//         fetch(`http://localhost:3000/ramens/${e.target.id}`)
//         .then((resp) => resp.json())
//         .then(((resp) => displayDetail(resp)))
//         .catch((err) => alert(err))
//     }
// }

function displayDetail(ramen) {
    const theImage = document.getElementById("ramen-detail").getElementsByClassName("detail-image")[0]
    const theName = document.getElementById("ramen-detail").getElementsByClassName("name")[0]
    const theRestaurant = document.getElementById("ramen-detail").getElementsByClassName("restaurant")[0]
    const theRating = document.getElementById("rating-display")
    const theComment = document.getElementById("comment-display")
    theImage.src = ramen.image
    theName.textContent = ramen.name
    theRestaurant.textContent = ramen.restaurant
    theRating.textContent = ramen.rating
    theComment.textContent = ramen.comment
}

// create a new ramen after submitting the new-ramen form, add to menu div
// THE NEW RAMEN DOES NOT NEED TO PERSIST
function addNewRamen(e) {
    e.preventDefault()
    newName = document.getElementById("new-name").value
    newRestaurant = document.getElementById("new-restaurant").value
    newImage = document.getElementById("new-image").value
    newRating = document.getElementById("new-rating").value
    newComment = document.getElementById("new-comment").value
    newId = ++newRamenId
    // should create a new ramen object (incl ID!) and send it to
    // displayMenuItem
    // const newImageNode = document.createElement("img")
    // newImageNode.src = newImage
    // newImageNode.alt = newName
    // theMenuDiv.appendChild(newImageNode)
    // document.getElementById("ramen-detail").getElementsByClassName("detail-image")[0].src=newImage
    // document.getElementById("ramen-detail").getElementsByClassName("name")[0].textContent = newName
    // document.getElementById("ramen-detail").getElementsByClassName("restaurant")[0].textContent = newRestaurant
    const newRamenObject = {
        name: newName,
        restaurant: newRestaurant,
        image: newImage,
        rating: newRating,
        comment: newComment,
        id: newId
    }
    displayMenuItem(newRamenObject)
    displayDetail(newRamenObject)
    e.target.reset()
}



// advanced deliverables
// see details for first ramen as soon as page loads ✓
// update rating and comment for a ramen by submitting a form, not persistent ✓
