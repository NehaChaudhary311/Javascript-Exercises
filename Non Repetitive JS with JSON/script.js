fetch("pizzas.json").then((response) =>
  response.json().then((data) => {
    let jsonSize = data.length;

    let htmlContent = "";
    let sizeContent = "";
    let cheeseContent = "";
    for (let i = 0; i < jsonSize; i++) {
      let id = data[i].id;
      let name = data[i].name;
      let img = data[i].img;
      let price = data[i].price;
      let sizes = data[i].sizes;
      let description = data[i].description;
      let cheese = data[i].cheese;

      htmlContent += `
          <div class="column-pizza">
            <a href="">
              <div class="pizza-item--img">
                <img src="${img}" id="pizza-img-${i}" />
              </div>
              <div class="pizza-item--add" id="selected-${i}">Add</div>
            </a>
            <div class="pizza-item--price" id="pizza-price-${i}">₹${price}</div>
            <div class="pizza-item--name" id="pizza-name-${i}">${name}</div>
            <div class="pizza-item--desc" id="pizza-desc-${i}">${description}</div>`;
      for (let j = 0; j < 3; j++) {
        sizeContent += `
        <div class="pizza-item--sizes" id="pizza-size-${i}">
             <input
               type="radio"
               id="small"
               name="sizes"
               value="small"
             />
             <label>${sizes[j]}<label>
            </div>`;
      }
      for (let j = 0; j < 3; j++) {
        cheeseContent += `
            <div class="pizza-item--cheese" id="pizza-cheese-${i}>
              <input
                type="radio"
                id="regular"
                name="cheese"
                value="regular"
              />
              <label>${cheese[j]}</label>
            </div>
          </div>
        </div>`;
      }
    } // for loop i ends
    document.querySelector("#root").innerHTML =
      htmlContent + sizeContent + cheeseContent;
  })
);
