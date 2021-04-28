//import * as fetch from "node-fetch";
/*
----------------------------------------------
DISPLAYING data.json on the UI - Start
----------------------------------------------
----
*/
document.onload = (function runOnLoad() {
  fetch("./data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const allItemContainer = document.getElementById("all-items");
      var fragment = document.createDocumentFragment();

      data.pizza.forEach((item) => {
        let container = document.createElement("div");
        //container will contain <div class='shop-item'>
        container.classList.add("shop-item");
        container.id = item.id; //will add an id to the current div equal to the ID given in the json file
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
        //innerDiv contains <div class="shop-item-details"

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
          let newRadio = document.createElement("input");
          newRadio.type = "radio";
          newRadio.value = item.sizes[size]; //value will be stored as price of small, medium, large - 100, 200, 300
          //console.log(newRadio.value);
          newRadio.name = "sizes";
          let label = document.createElement("label");
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
        fragment.appendChild(container);
        allItemContainer.appendChild(fragment);
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
  //parent element - cart-items add onClick
  //stop propagation -- event.stop propagation not required if we identify the target

  //Event Delegation
  for (const el of document.querySelectorAll(".cart-items")) {
    el.addEventListener("click", function (e) {
      if (e.target.matches(".btn-danger")) {
        removeCartItem(e.target);
      }
    });
    el.addEventListener("change", function (e) {
      if (e.target.matches(".cart-quantity-input")) {
        quantityChanged(e.target);
      }
    });
  }

  //EVENT LISTENER FOR ORDER BUTTON
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", orderClicked);

  function orderClicked() {
    window.location = "requestDeleivery.html";
    let cartItems = document.getElementsByClassName("cart-items")[0];
    //after ordering finally, all the cart items will vanish
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
  }

  function removeFromLocalStorage(pizzaId) {
    let locStore = JSON.parse(localStorage.getItem("selectedProduct"));
    let temp = locStore.filter((item) => item.productID !== pizzaId);
    localStorage.setItem("selectedProduct", JSON.stringify(temp));
  }
  function removeCartItem(event) {
    let buttonClicked = event.target;
    let cartItem = buttonClicked.parentElement.parentElement; //cartItem wil store <div class="cart-row">
    console.log(cartItem);
    let cartItemId = cartItem.id;
    let title = cartItem.getElementsByClassName("cart-item-title")[0].innerText; //will store like Tandoori Paneer
    //shopItems stores <div id=​"all-items" class=​"shop-items">​…​</div>​
    let shopItems = document.getElementsByClassName("shop-items")[0]; //for fixing the + - button to "Add to Cart button" in the menu list
    let shopItemForId = document.getElementsByClassName("shop-item");
    let pizzaId = shopItemForId.item(cartItemId - 1); //minus 1 cause of index issues
    pizzaId = pizzaId.getAttribute("id");
    let shopItemNames = shopItems.getElementsByClassName("shop-item-title"); //will return an HTMLCollection of 4 items with span.shop-item-

    /*
  -------------------------------------
  REMOVING ADD ITEM TO CART BUTTON and adding +, -, input for the pizza item which is being identified by the ID
  -------------------------------------
  */
    shopItemNames[cartItemId - 1].parentElement
      .getElementsByClassName("shop-item-details")[0]
      .getElementsByClassName("shop-item-button-minus")[0]
      .remove();
    shopItemNames[cartItemId - 1].parentElement
      .getElementsByClassName("shop-item-details")[0]
      .getElementsByClassName("shop-item-button-add")[0]
      .remove();
    shopItemNames[cartItemId - 1].parentElement
      .getElementsByClassName("shop-item-details")[0]
      .getElementsByClassName("shop-item-input")[0]
      .remove();
    let butt = document.createElement("button");
    butt.classList.add("btn", "btn-primary", "shop-item-button");
    butt.innerText = "ADD TO CART";
    butt.onclick = addToCartClicked;
    shopItemNames[cartItemId - 1].parentElement
      .getElementsByClassName("shop-item-details")[0]
      .appendChild(butt);

    buttonClicked.parentElement.parentElement.remove();
    removeFromLocalStorage(pizzaId);

    updateCartTotal();
  }

  function quantityChanged(event) {
    let input = event.target;
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
    let locStore = JSON.parse(localStorage.getItem("selectedProduct"));

    locStore.forEach((item) => {
      //console.log(item.productID);
      if (item.productID === shopId) {
        //look for match with ID
        item.quantity = cinput.value; //add one
      }
    });
    localStorage.setItem("selectedProduct", JSON.stringify(locStore)); //put the object back

    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    let cartItems = document.getElementsByClassName("cart-items")[0]; //will return <div class="cart-items"> which is in CART
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title"); //will point to the title of the pizza present in the row of CART
    let cartinput = cartItems.getElementsByClassName("cart-quantity-input"); //will point to the quantity input present in the CART
    //Now, while increase in the quantity in the menu list, should show increase in the quantity in the CART as well
    for (let i = 0; i < cartItemNames.length; i++) {
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
    let shopId = shopItem.getAttribute("id"); //get the ID of the shopItem
    let recParent = button.parentElement;
    let cinput = recParent.getElementsByClassName("shop-item-input")[0];
    if (cinput.value > 1) {
      cinput.value--;
    }
    let locStore = JSON.parse(localStorage.getItem("selectedProduct"));
    locStore.forEach((item) => {
      console.log(item.productID);
      if (item.productID === shopId) {
        //look for match with ID
        item.quantity = cinput.value;
      }
    });
    localStorage.setItem("selectedProduct", JSON.stringify(locStore)); //put the object back
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    let cartItems = document.getElementsByClassName("cart-items")[0];
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    let cartinput = cartItems.getElementsByClassName("cart-quantity-input");
    //Now, when theere is a decrease in quantity in the menu list, it should also reflect in the quantity in the CART as well.
    for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title && cartinput[i].value > 1) {
        cartinput[i].value--;
      }
    }
    updateCartTotal();
  }

  //When Add to cart is clicked, this function is triggered
  function addToCartClicked(event) {
    //Getting all the details of the pizza item that was clicked
    let button = event.target;
    let shopItem = button.parentElement.parentElement; //shopItem stores the container details <div class="shop-item" id="1">
    let id = shopItem.getAttribute("id"); //fetch the id attached to the shopItemv - working fine - verified
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText; //in the form of Rs. 400
    let sizePrices = document.getElementsByName("sizes"); //get all the radio buttons which have name="sizes"
    let size_price;
    let flagForSizeRadio = false; //false means not selected
    for (let i = 0; i < sizePrices.length; i++) {
      //check among all the sizePrices, whether it is checked or not
      if (sizePrices[i].checked) {
        size_price = sizePrices[i].value;
        flagForSizeRadio = true;

        //Added break, because only one radio button could be selected at one time
        break;
      }
    }
    if (flagForSizeRadio == false) {
      alert("Please choose the size of pizza. ");
    } else {
      let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src; //http://127.0.0.1:5500/Images/pizza.png
      price = parseFloat(price.replace("Rs.", "")) + parseFloat(size_price);
      /*
  ----------------------------------------------------
  STORING THE SELECTED ITEMS IN LOCAL STORAGE - Start -  Successful!!
  ----------------------------------------------------
  */

      let newItem = {
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
      renderItemsInCart();
      /*
  ----------------------------------------------------
  STORING THE SELECTED ITEMS IN LOCAL STORAGE - End
  ----------------------------------------------------
  */
      let changebutt = button.parentElement; //Will store <div class="shop-item-details">Price, button -, input, button +

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
      flagForSizeRadio = false;
    }
  }
  //utility function for addToCartClicked
  //This will make sure that a new cart row is created under CART
  function addItemToCart(item) {
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    cartRow.id = item.productID;
    let cartItems = document.getElementsByClassName("cart-items")[0]; //<div class="cart-items">
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    //Putting the data
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${item.image}" width="100" height="100">
            <span class="cart-item-title">${item.title}</span>
            <span class="cart-item-size">"Rs.${item.sizePrice}"</span>
        </div>
        <span class="cart-price cart-column">${item.price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    //cartRowContents = cartRowContents.join("");

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", removeCartItem);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", quantityChanged);
  }

  /**
   * Render all the items in cart,
   * call this instead of addItemToCart after an item was added to local storage.
   **/
  function renderItemsInCart() {
    let cartItems = document.getElementsByClassName("cart-items")[0]; //<div class="cart-items">
    cartItems.innerHTML = "";
    let locStore = JSON.parse(localStorage.getItem("selectedProduct"));
    let cartRowContents = locStore.map((item) => addItemToCart(item));
  }

  function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0];
    let cartRows = cartItemContainer.getElementsByClassName("cart-row");
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      let priceElement = cartRow.getElementsByClassName("cart-price")[0];
      let quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      let price = parseFloat(priceElement.innerText.replace("Rs.", ""));
      let quantity = quantityElement.value;
      total = total + price * quantity;
    }
    document.getElementsByClassName("cart-total-price")[0].innerText =
      "Rs." + total;
  }
})();
