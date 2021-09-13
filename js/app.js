//Get Api Data
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product borders">
      <div class="image-center">
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="fs-5 fw-bold text-primary">${product.title}</h3>
      <p><span class="fw-bold">Category:</span> ${product.category}</p>
      <h2 class="fs-5 fw-bold">Price: <span class="text-danger">$ ${product.price}</span></h2>
      <p><b>rating: <small>${product?.rating?.rate}/5 (${product?.rating?.count})</small></b></p>
      <div>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">Add to cart</button>
      <button onclick="showDetails(${product.id})" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// Calculation Cart Option
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};
// Single Product Details Api here
const showDetails = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data => showSingleProductsDetails(data));
}
// Single Product Details UI
const showSingleProductsDetails = (data) => {
  const div = document.getElementById('show-details');
  div.style.display = "block";
  div.innerHTML = `
  <div class="row g-0">
            <div class="col-md-4">
              <img src="${data.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title text-primary fw-bold">${data.title}</h5>
                <p class="card-text fs-6">${data.description}</p>
                <h2 class="fs-5 fw-bold">Price: <span class="text-danger">$ ${data.price}</span></h2>
                <button onclick="addToCart(${data.price})" id="addToCart-btn" class="buy-now btn btn-primary">Add to cart</button>
              </div>
            </div>
          </div>
  `
}
// Convert Price
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = decimalValue(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = decimalValue(value);
};
// For Convert Decimal 2 digit
function decimalValue(x) {
  return Number.parseFloat(x).toFixed(2);
}
// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};
//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = decimalValue(grandTotal);
};

