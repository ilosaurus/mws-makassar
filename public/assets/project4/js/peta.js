///////////////////////////////////        Leaflet plugin              //////////////////////////////////

var mymap = L.map('mapid').setView([-5.130262, 119.482400], 17);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <ahref="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken:'pk.eyJ1IjoiaWxvc2F1cnVzIiwiYSI6ImNqbWFtdWlsMTVnMWEzd29nZWR5ZmxlNjEifQ.t_PMiD_Tx4Dgm7fGddpguQ'
}).addTo(mymap);

//////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////        Fetch Json //           //////////////////////////////////

let places = [];
const URL="data.json";

fetch(URL).then(function(response){
    // console.log(response);
    if (response.status !== 200) { //HTTP Status
        console.log('Ada masalah. Status Code: '+response.status);
        throw response.statusText;
    }
    return response.json()
}).then ( resp => {
    // let places = resp.places;
    localStorage.setItem('places',JSON.stringify(resp.places));
    places= JSON.parse(localStorage.getItem('places'));
    for (var p of places) {
        var marker= L.marker(p.lokasi).addTo(mymap).bindPopup(p.sponsor);
        marker.on('click', showLocation);
    }

    console.log("variable places log di dalam fetch ->> ");
    console.log(places);
    
}).catch(function(err){
    console.log(err);
});


console.log("variable places log di luar ->> ");
console.log(places);

function findLocation(x,y) {
    console.log(x,y);
    for (var i=0; i< places.length;i++) {
        if (places[i].lokasi[0]==x && places[i].lokasi[1]==y) {
            return i;
        }
    }
    return -1;
}

function showLocation(e) {
    console.log("you clicked " + e.latlng.lat + " dan "+ e.latlng.lng);
    let ix= findLocation(e.latlng.lat,e.latlng.lng);
    
    if (ix >= 0) {
        img.src= places[ix].gambar;
        par.textContent=places[ix].review;
    }
    // console.log();
    
    // console.log(places[ix].review);
    
    
    // console.log(places[ix].gambar);
    
    
}

let gmb= document.getElementById("div_image");
let rev= document.getElementById("div_review");
let img= document.createElement('img');
let par= document.createElement('p');
gmb.appendChild(img);
rev.appendChild(par);



// (async function (){
//     const URL="data.json";
//     try {
//         let resp= await(fetch(URL));
//         let resp2= await resp.json();
//         console.log(resp2);
        
//         // localStorage.setItem('places',
//         // JSON.stringify(resp2.places));//
//     }
//     catch(err){
//         console.log(err);
//     }
// })(); // <--- IIFE


