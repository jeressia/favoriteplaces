// XHL - XhlHttpRequest
let places = [];

const printToDom = (divId, textToPrint) => {
    const selectDiv= document.getElementById(divId);
    selectDiv.innerHTML =textToPrint;
}

const domStringBuilder = (arrayToPrint) => {
    let domString = '';
    arrayToPrint.forEach((place) => {
        domString += `<div class="card" style="width: 18rem;">`
        domString += `<h5 class="card-title">${place.cityName}, ${place.countryName}</h5>`
        domString += `<img src="${place.cityImage}" class="card-img-top" alt="...">`
        domString += `<div class="card-body">`
        domString += `<ul class="list-group list-group-flush">`
        domString += `<li class="list-group-item"><p class="bold"><i class="fas fa-utensils"></i><br>Favorite Restaurant:</p> ${place.favoriteRestaurant}</li>`
        domString += `<li class="list-group-item"><p class="bold"><i class="far fa-grin-stars"></i><br>Most Famous For:</p>  ${place.mostFamousFor}</li>`
        domString += `<li class="list-group-item"><p class="bold"><i class="fas fa-concierge-bell"></i><br>Favorite Hotel:</p>  ${place.favoriteHotel}</li>`
        domString += `<li class="list-group-item"><p class="bold"><i class="fas fa-binoculars"></i><br>Favorite Tourist Attraction:</p>  ${place.favoriteTouristAttraction}</li>`
        domString += `</ul>`
        domString += `<div class="card-footer" id="${place.tripType}">${place.tripType}</div>`
        domString += `</div>`
        domString += `</div>`
        
    });
    printToDom('placesDiv',domString);
}

//Once request is made, if it works, this makes the data do something
function executeThisCodeAfterFileLoads (){
    const data = JSON.parse(this.responseText);
    domStringBuilder(data.places);
    places= data.places;
    domStringBuilder(places);
}

//If XHR Request does not work, console text will be red
function executeThisCodeIfXHRFails (){
    console.error('oh shit');
}

//Requests the data
const getPlacesData = () => {
    const myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load',executeThisCodeAfterFileLoads);
    myRequest.addEventListener('error', executeThisCodeIfXHRFails);
    myRequest.open('GET','./db/places.json');
    myRequest.send();
    console.log(myRequest);
};

const buttonClick = (e) => {
    const buttonId = e.target.id;
      
      const selectedPlaces = [];
      places.forEach((place) => {
        if (place.tripType === buttonId) {
          selectedPlaces.push(place);
        }    
      });
  
      if (buttonId === 'All'){
        domStringBuilder(places);  
      } else{
        domStringBuilder(selectedPlaces);
      }
  };

const buttonEvents = () => {
    document.getElementById('Domestic').addEventListener('click',buttonClick);
    document.getElementById('International').addEventListener('click',buttonClick);
    document.getElementById('All').addEventListener('click',buttonClick);
}

const init = () => {
 getPlacesData();
 buttonEvents();
};

init();