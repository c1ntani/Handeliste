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
