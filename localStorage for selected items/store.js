/*
// const datam=[
//     {
      "name": "Tandoori Pizza",
      "image": "Images/pizza.png",
      "price": "Rs.200"
    },
    {
      "name": "Veggie Supreme",
      "image": "Images/pizza.png",
      "price": "Rs.250"
    },
    {
      "name": "Veg Exotica",
      "image": "Images/pizza.png",
      "price": "Rs.300"
    },
    {
      "name": "Chicken Pepper Crunch",
      "image": "Images/pizza.png",
      "price": "Rs.400"
    }
// ];
*/
// document.getElementsByClassName("shop-items")[0].innerHTML=`${
//     datam.map((item)=>{
//         return `<div class="shop-item">
//         <span class="shop-item-title">${item.name}</span>
//         <img class="shop-item-image" src="${item.image}">
//         <div class="shop-item-details">
//             <span class="shop-item-price">${item.price}</span>
//             <button class="btn btn-primary shop-item-button"type="button">ADD TO CART</button>
//         </div>
//     </div>`
//     })
// }`;

/*
----------------------------------------------
DISPLAYING data.json on the UI - Start
----------------------------------------------
*/

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const allItemContainer = document.getElementById("all-items");
    //console.log(allItemContainer);

    data.pizza.forEach((item) => {
      let container = document.createElement("div");
      //container will contain <div class='shop-item'>
      container.classList.add("shop-item");
      container.id = item.id; //will add an id to the current div equal to the ID given in the json file
      console.log("Printing item", item);
      //console.log(item.id); //typeof is number
      let textHeading = document.createElement("span");
      textHeading.classList.add("shop-item-title");
      textHeading.appendChild(document.createTextNode(item.name));
      //textHeading contains <span class="shop-item-title">Tandoori Pizza</span>

      let images = document.createElement("img");
      images.classList.add("shop-item-image");
      images.src = item.image;
      //images contains <img class="shop-item-image" src="Images/pizza.png">

      let innerDiv = document.createElement("div");
      innerDiv.classList.add("shop-item-details");
      //innerDiv contains <div class="shop-item-details">
      console.log(innerDiv);

      let price = document.createElement("span");
      price.classList.add("shop-item-price");
      //<span class="shop-item-price">Rs.200</span>
      price.appendChild(document.createTextNode(item.price));

      //Creating <div class="shop-item-sizes"> for taking sizes for radio buttons
      let sizesRadio = document.createElement("div");
      sizesRadio.classList.add("shop-item-sizes");

      for (size in item.sizes) {
        //console.log(size); //small, medium, large
        //console.log(Object.keys(item.sizes)); - shows small, medium, large
        //console.log(item); - will contain entire details of one pizza item
        let sizesTemp = Object.keys(item.sizes);
        var newRadio = document.createElement("input");
        newRadio.type = "radio";
        newRadio.value = item.sizes[size]; //value will be stored as price of small, medium, large - 100, 200, 300
        console.log(newRadio.value);
        newRadio.name = "sizes";
        var label = document.createElement("label");
        label.appendChild(document.createTextNode(size));
        sizesRadio.appendChild(newRadio);
        sizesRadio.appendChild(label);
        innerDiv.appendChild(sizesRadio);
      }

      let butt = document.createElement("button");
      butt.classList.add("btn", "btn-primary", "shop-item-button");
      butt.innerText = "ADD TO CART";
      butt.onclick = addToCartClicked;

      innerDiv.appendChild(price);
      // innerDiv.appendChild(butt2);
      innerDiv.appendChild(butt);
      // innerDiv.appendChild(butt1);

      container.appendChild(textHeading);
      container.appendChild(images);
      container.appendChild(innerDiv);
      allItemContainer.appendChild(container);
    });
  });
/*
----------------------------------------------
DISPLAYING data.json on the UI - End
----------------------------------------------
*/

/*
ADDING EVENT LISTENERS TO ELEMENTS - Start
*/

//event listener attached when remove button is clicked on
var removeCartItemButtons = document.getElementsByClassName("btn-danger");
for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
}

//event listener attatched when quantity is increased or decreased
var quantityInputs = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

//EVENT LISTENER FOR ORDER BUTTON
document
  .getElementsByClassName("btn-purchase")[0]
  .addEventListener("click", orderClicked);

function orderClicked() {
  window.location = "requestDeleivery.html";
  var cartItems = document.getElementsByClassName("cart-items")[0];
  //after ordering finally, all the cart items will vanish
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  //console.log(buttonClicked);
  let cartItem = buttonClicked.parentElement.parentElement; //cartItem wil store <div class="cart-row">
  let title = cartItem.getElementsByClassName("cart-item-title")[0].innerText; //will store like Tandoori Paneer
  var shopItems = document.getElementsByClassName("shop-items")[0]; //for fixing the + - button to "Add to Cart button" in the menu list
  var shopItemNames = shopItems.getElementsByClassName("shop-item-title"); //will return an HTMLCollection of 4 items with span.shop-item-
  /*
  console.log(
    shopItemNames[0].parentElement.parentElement.getElementsByClassName(
      "shop-item-button-minus"
    )
  );
  */
  for (var i = 0; i < shopItemNames.length; i++) {
    //loop through all the shopItemNames available in your application, and check if it's title matches with your chosen pizza title to be removed
    //if it matches, remove minus button, add button, and input box.
    //And insert a button - ADD TO CART
    //DOn't forget to append that button to
    if (shopItemNames[i].innerText == title) {
      shopItemNames[i].parentElement
        .getElementsByClassName("shop-item-details")[0]
        .getElementsByClassName("shop-item-button-minus")[0]
        .remove();
      shopItemNames[i].parentElement
        .getElementsByClassName("shop-item-details")[0]
        .getElementsByClassName("shop-item-button-add")[0]
        .remove();
      shopItemNames[i].parentElement
        .getElementsByClassName("shop-item-details")[0]
        .getElementsByClassName("shop-item-input")[0]
        .remove();
      let butt = document.createElement("button");
      butt.classList.add("btn", "btn-primary", "shop-item-button");
      butt.innerText = "ADD TO CART";
      butt.onclick = addToCartClicked;
      shopItemNames[i].parentElement
        .getElementsByClassName("shop-item-details")[0]
        .appendChild(butt);
    }
  }
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

//for the + buttons present in the menu list - not for the cart increase
function addONe(event) {
  let button = event.target; //stores the button class like <button class="btn btn-primary shop-item-button-add">+</button>
  let shopItem = button.parentElement.parentElement;
  //shopItem stores <div class="shop-item">title, image, details </div>
  let shopId = shopItem.getAttribute("id"); //get the ID of the shopItem

  let recParent = button.parentElement; //stores shop-item-details which is under "shop-item" in heirarchy
  let cinput = recParent.getElementsByClassName("shop-item-input")[0]; //will return the first <input class="shop-item-input">
  cinput.value++; //cinput.value stores the current quantity - typeof string
  var locStore = JSON.parse(localStorage.getItem("selectedProduct"));
  locStore.forEach((item) => {
    if (item.productID === shopId) {
      console.log("Checking for ID");
      item.quantity = cinput.value;
      console.log(item.quantity);
      localStorage.setItem("selectedProduct", JSON.stringify(item));
    }
  });

  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  //let cinTitle = title.innerHTML;
  var cartItems = document.getElementsByClassName("cart-items")[0]; //will return <div class="cart-items"> which is in CART
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title"); //will point to the title of the pizza present in the row of CART
  var cartinput = cartItems.getElementsByClassName("cart-quantity-input"); //will point to the quantity input present in the CART
  //Now, while increase in the quantity in the menu list, should show increase in the quantity in the CART as well
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      cartinput[i].value++;
    }
  }
  updateCartTotal();
}
//Let's apply the same logic for minusOne
function minusONe(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let recParent = button.parentElement;
  let cinput = recParent.getElementsByClassName("shop-item-input")[0];
  if (cinput.value > 1) {
    cinput.value--;
  }
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  var cartinput = cartItems.getElementsByClassName("cart-quantity-input");
  //Now, when theere is a decrease in quantity in the menu list, it should also reflect in the quantity in the CART as well.
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title && cartinput[i].value > 1) {
      cartinput[i].value--;
    }
  }
  updateCartTotal();
}

//When Add To Cart is clicked, this button needs to be removed, and butt2, butt1 and input should appear using createElement()
//Do not forget to append the newly created Elements
//When Add to cart is clicked, this function is triggered
function addToCartClicked(event) {
  //Getting all the details of the pizza item that was clickedc
  var button = event.target;
  var shopItem = button.parentElement.parentElement; //shopItem stores the container details <div class="shop-item" id="1">
  var id = shopItem.getAttribute("id"); //fetch the id attached to the shopItemv - working fine - verified
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText; //in the form of Rs. 400
  var sizePrices = document.getElementsByName("sizes"); //get all the radio buttons which have name="sizes"
  var size_price;
  for (var i = 0; i < sizePrices.length; i++) {
    //check among all the sizePrices, whether it is checked or not
    if (sizePrices[i].checked) {
      size_price = sizePrices[i].value;
      //Added break, because only one radio button could be selected at one time
      break;
    }
  }
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src; //http://127.0.0.1:5500/Images/pizza.png
  price = parseFloat(price.replace("Rs.", "")) + parseFloat(size_price);
  /*
  ----------------------------------------------------
  STORING THE SELECTED ITEMS IN LOCAL STORAGE - Start -  Successful!!
  ----------------------------------------------------
  */
  // let products = {
  //   productId: id,
  //   image: imageSrc,
  //   price: price,
  //   title: title,
  //   sizePrice: size_price,
  //   quantity: 0,
  // };
  // productsString = JSON.stringify(products);
  // var oldItems = localStorage.getItem("selectedProduct");
  // //console.log("Check me");
  // //console.log(typeof oldItems);
  // //I tried this too
  // //https://stackoverflow.com/questions/19902670/append-objects-in-local-storage/19902764#:~:text=Basically%20you%20have%20to%20retrieve,write%20it%20back%20to%20localStorage%20.&text=There%20are%20two%20options%3A,new%20element%2C%20then%20use%20setItem%20.
  // var newItems = oldItems ? oldItems + "," + productsString : productsString;
  // localStorage.setItem("selectedProduct", newItems);

  var newItem = {
    productID: id,
    image: imageSrc,
    price: price,
    title: title,
    sizePrice: size_price,
    quantity: 1,
  };
  if (localStorage.getItem("selectedProduct") === null) {
    var oldItems = [];

    console.log("Check");
  } else {
    var oldItems = JSON.parse(localStorage.getItem("selectedProduct"));
  }
  oldItems.push(newItem);
  localStorage.setItem("selectedProduct", JSON.stringify(oldItems));
  /*
  ----------------------------------------------------
  STORING THE SELECTED ITEMS IN LOCAL STORAGE - End
  ----------------------------------------------------
  */
  // var itemsInLocalStore = localStorage.getItem("selectedProduct");
  // console.log(itemsInLocalStore);

  var changebutt = button.parentElement; //Will store <div class="shop-item-details">Price, button -, input, button +

  let butt2 = document.createElement("button");
  butt2.classList.add("btn", "btn-primary", "shop-item-button-minus");
  butt2.innerText = "-";
  butt2.onclick = minusONe;

  let input = document.createElement("input");
  input.classList.add("shop-item-input", "cart-quantity-input");
  input.value = 1;

  let butt1 = document.createElement("button");
  butt1.classList.add("btn", "btn-primary", "shop-item-button-add");
  butt1.innerText = "+";
  butt1.onclick = addONe;

  button.remove();

  changebutt.appendChild(butt2);
  changebutt.appendChild(input);
  changebutt.appendChild(butt1);

  updateCartTotal();
}
//utility function for addToCartClicked
//This will make sure that a new cart row is created under CART
function addItemToCart() {
  var itemsInLocalStore = localStorage.getItem("selectedProduct");
  //console.log(JSON.parse(itemsInLocalStore)); //JSON.parse converts text into a Javascript object
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  //Putting the data
  var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
            <span class="cart-item-size">"Rs.${size_price}"</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("Rs.", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "Rs." + total;
}
