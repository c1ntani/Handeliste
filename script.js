var productContainer = document.getElementById("product-container");
var productList = document.getElementById("product-list");

var productArray = [];

function addProduct() {
  let productInput = document.getElementById("product-input").value;

  productArray.push({ name: productInput });

  console.log(productArray);
  forArray();
}

function forArray() {
  productList.innerHTML = "";
  for (let i = 0; i < productArray.length; i++) {
    productList.innerHTML += `<li id="product-item">
        <p id="product-name">
      ${productArray[i].name}
        </p>
        <button id="delete-btn" onclick="deleteProduct(${i})">Slett</button>
        </li>
        `;
  }
}

function deleteProduct(i) {
  let confirmDelete = prompt(
    `Ønsker du å slette (vare)? "${productArray[i].name}"?
    Skriv ja eller nei.`
  );
  if (confirmDelete == "ja") {
    alert(`${productArray[i].name} er nå slettet.`);
    productArray.splice(i, 1);
    forArray();
  } else {
    alert("Sletting kansellert.");
  }
}

const form = document.getElementById("product-form");
const item = document.getElementById("item");
const amount = document.getElementById("amount");
const message = document.getElementById("message");
let groceryList = document.getElementById("grocery-list");
let total = document.querySelector(".total");

form.addEventListener("submit", function (e) {
  validateItem();
  calculateCost();
  e.preventDefault();
});

groceryList.addEventListener("click", deleteItem);

function validateItem() {
  if (item.value !== "" && amount.value !== "" && parseFloat(amount.value)) {
    addItem();
  } else if (
    item.value === "" &&
    (amount.value === "" || !parseFloat(amount.value))
  ) {
    item.classList.add("error");
    amount.classList.add("error");
    setMessage("Vennligst fyll ut alle felter", "error");
  } else if (amount.value === "" || !parseFloat(amount.value)) {
    amount.classList.add("error");
    setMessage("Vennligst fyll ut pris", "error");
  } else {
    item.classList.add("error");
    setMessage("Vennligst legg inn en vare", "error");
  }

  setTimeout(function () {
    item.classList.remove("error");
    amount.classList.remove("error");
    message.innerText = "";
    message.classList.remove("error");
  }, 2000);
}

function addItem() {
  let row = document.createElement("tr");
  row.innerHTML = `<td class="one column"><i class="far fa-trash-alt delete-item"></i></td>
                    <td class="eight columns">${item.value}</td>
                    <td class="three columns price">${amount.value}</td>`;
  groceryList.appendChild(row);
  setMessage(`${item.value} successfully added.`, "success");

  setTimeout(function () {
    message.innerText = "";
    message.classList.remove("success");
  }, 1000);
  item.value = "";
  amount.value = "";
}

function deleteItem(e) {
  if (e.target.classList.contains("delete-item")) {
    e.target.parentNode.parentNode.remove();
    console.log(groceryList);
    calculateCost();
    setMessage("Item deleted", "success");
    setTimeout(function () {
      message.innerText = "";
      message.classList.remove("success");
    }, 1000);
  }
}

function calculateCost() {
  let subTotal = 0;
  for (var i = 0, row; (row = groceryList.rows[i]); i++) {
    for (var j = 0, cell; (cell = row.cells[j]); j++) {
      if (cell.classList.contains("price")) {
        subTotal += parseFloat(cell.innerText);
      }
    }
  }
  total.innerText = "kr" + subTotal.toFixed(2);
  if (subTotal > 0) {
    total.classList.add("cost");
  } else {
    total.classList.remove("cost");
  }
}

function setMessage(messageText, messageClass) {
  message.innerHTML = `
        <p>${messageText}</p>
    `;
  message.classList.add(`${messageClass}`);
}
