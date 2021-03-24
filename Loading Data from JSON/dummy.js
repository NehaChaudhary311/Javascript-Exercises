//Array for cart
let cart = [];

//Quantity of items
let modelQt = 1;

//To check which pizza is selected
let modelKey = 0;
/*
--------------------------------------
LOADING PIZZA DETAILS FOR LANDING PAGE document.onload() document.ready() - store the details in a global variable - now 
--------------------------------------
*/
//FIRST PIZZA
fetch("pizzas.json").then((response) =>
  response.json().then((data) => {
    //console.log(data[0].name);
    document.querySelector("#pizza-img-1").src = data[0].img;
    document.querySelector("#pizza-name-1").innerHTML = data[0].name;
    document.querySelector(
      "#pizza-price-1"
    ).innerHTML = `Rs ${data[0].price.toFixed(2)}`;
    document.querySelector("#pizza-desc-1").innerHTML = data[0].description;
  })
);
//SECOND PIZZA
fetch("pizzas.json").then((response) =>
  response.json().then((data) => {
    //console.log(data[0].name);
    document.querySelector("#pizza-img-2").src = data[1].img;
    document.querySelector("#pizza-name-2").innerHTML = data[1].name;
    document.querySelector(
      "#pizza-price-2"
    ).innerHTML = `Rs ${data[1].price.toFixed(2)}`;
    document.querySelector("#pizza-desc-2").innerHTML = data[1].description;
  })
);
//THIRD PIZZA - loading
fetch("pizzas.json").then((response) =>
  response.json().then((data) => {
    //console.log(data[2].name);
    document.querySelector("#pizza-img-3").src = data[2].img;
    document.querySelector("#pizza-name-3").innerHTML = data[2].name;
    document.querySelector(
      "#pizza-price-3"
    ).innerHTML = `Rs ${data[2].price.toFixed(2)}`;
    document.querySelector("#pizza-desc-3").innerHTML = data[2].description;
  })
);
/*
***********************************************
DOUBT - Why can't I get event info using id 
<div class="column-pizza">
              <a id="pizza-selection" href=""> 
***********************************************
//Stop the default action of clicking on add button 
document
  .getElementById("#pizza-selection")
  .addEventListener("click", function (event) {
    event.preventDefault();
    console.log(event);
    //Figuring out how to get the key for this event - which pizza was selected
    //let key = event.target.id; //pizza-img-1, pizza-img-2, pizza-img-3
    //console.log(key);
  });
*/
/*
--------------------------------------
FINDING WHICH PIZZA GOT SELECTED
--------------------------------------
*/
let key;
let sizeCost = 0;
let cheeseCost = 0;
let pizzaCost = 0;
//FIRST PIZZA
document
  .getElementById("selected-1")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let tempkey1 = event.target.id; //will store like selected-1
    console.log(tempkey1);
    key = 0;
    //Getting pizza cost from json file for pizza1
    fetch("pizzas.json").then((response) =>
      response.json().then((data) => {
        pizzaCost += data[key].price;
        console.log("Printing pizza cost Pizza 1", pizzaCost);
      })
    );
    //Calculating size cost for pizza1 depending on the size chosen from radio button
    let radiosSize1 = document.getElementsByClassName("pizza-item--sizes-1");
    for (var i = 0, length = radiosSize1.length; i < length; i++) {
      if (radiosSize1[i].checked) {
        fetch("pizzas.json").then((response) =>
          response.json().then((data) => {
            //console.log("Printing ", data[key].sizes[i]);
            sizeCost += data[key].sizes[i];
            console.log("Printing size cost Pizza 1", sizeCost);
          })
        );
        // only one radio can be logically checked, so we'll not check the rest
        break;
      }
    }
    //Calculating cheese cost for pizza1 depending on the cheese type chosen from radio button
    //Note that cheese in json now stores the price of cheese rather than the string cheese
    let radiosCheese1 = document.getElementsByClassName("pizza-item--cheese-1");
    for (var i = 0, length = radiosCheese1.length; i < length; i++) {
      if (radiosCheese1[i].checked) {
        fetch("pizzas.json").then((response) =>
          response.json().then((data) => {
            //console.log("Printing ", data[key].sizes[i]);
            cheeseCost += data[key].cheese[i];
            console.log("Printing cheese cost Pizza 1", cheeseCost);
          })
        );
        // only one radio can be logically checked, so we'll not check the rest
        break;
      }
    }
  });
//console.log(key); // showing undefined ... Why??

//SECOND PIZZA
document
  .getElementById("selected-2")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let tempkey2 = event.target.id; //will store selected-2
    console.log(tempkey2);
    key = 1;
    //Getting pizza cost from json file for pizza1
    fetch("pizzas.json").then((response) =>
      response.json().then((data) => {
        //console.log("Printing ", data[key].sizes[i]);
        pizzaCost += data[key].price;
        console.log("Printing pizza cost Pizza 2", pizzaCost);
      })
    );

    //Calculating size cost for pizza2 depending on the size chosen from radio button
    let radiosSize1 = document.getElementsByClassName("pizza-item--sizes-2");
    for (var i = 0, length = radiosSize1.length; i < length; i++) {
      if (radiosSize1[i].checked) {
        fetch("pizzas.json").then((response) =>
          response.json().then((data) => {
            //console.log("Printing ", data[key].sizes[i]);
            sizeCost += data[key].sizes[i];
            console.log("Printing size cost Pizza 2", sizeCost);
          })
        );
        // only one radio can be logically checked, so we'll not check the rest
        break;
      }
    }
    //Calculating cheese cost for pizza2 depending on the cheese type chosen from radio button
    //Note that cheese in json now stores the price of cheese rather than the string cheese
    let radiosCheese1 = document.getElementsByClassName("pizza-item--cheese-2");
    for (var i = 0, length = radiosCheese1.length; i < length; i++) {
      if (radiosCheese1[i].checked) {
        fetch("pizzas.json").then((response) =>
          response.json().then((data) => {
            //console.log("Printing ", data[key].sizes[i]);
            cheeseCost += data[key].cheese[i];
            console.log("Printing cheese cost Pizza 2", cheeseCost);
          })
        );
        // only one radio can be logically checked, so we'll not check the rest
        break;
      }
    }
  });

//THIRD PIZZA
document
  .getElementById("selected-3")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let tempkey3 = event.target.id; //will store selected-3
    console.log(tempkey3);
    key = 2;
    //Getting pizza cost from json file for pizza1
    fetch("pizzas.json").then((response) =>
      response.json().then((data) => {
        pizzaCost += data[key].price;
        console.log("Printing pizza cost Pizza 3", pizzaCost);
      })
    );

    //Calculating size cost for pizza2 depending on the size chosen from radio button
    let radiosSize1 = document.getElementsByClassName("pizza-item--sizes-3");
    for (var i = 0, length = radiosSize1.length; i < length; i++) {
      if (radiosSize1[i].checked) {
        fetch("pizzas.json").then((response) =>
          response.json().then((data) => {
            //console.log("Printing ", data[key].sizes[i]);
            sizeCost += data[key].sizes[i];
            console.log("Printing size cost Pizza 3", sizeCost);
          })
        );
        // only one radio can be logically checked, so we'll not check the rest
        break;
      }
    }

    //Calculating cheese cost for pizza2 depending on the cheese type chosen from radio button
    //Note that cheese in json now stores the price of cheese rather than the string cheese
    let radiosCheese1 = document.getElementsByClassName("pizza-item--cheese-3");
    for (var i = 0, length = radiosCheese1.length; i < length; i++) {
      if (radiosCheese1[i].checked) {
        fetch("pizzas.json").then((response) =>
          response.json().then((data) => {
            //console.log("Printing ", data[key].sizes[i]);
            cheeseCost += data[key].cheese[i];
            console.log("Printing cheese cost Pizza 3", cheeseCost);
          })
        );
        // only one radio can be logically checked, so we'll not check the rest
        break;
      }
    }
  });

  //Add this function in every pizza document call
function updateCart() {}
//PRINTING THE SIZE COST
/*
document.querySelector(
  "cart-totalitem size span:last-child"
).innerHTML = `Rs ${sizeCost.toFixed(2)}`;
*/
