// This is javascript file to handling cart page
import Storage from "./Storage.js";
import { Card } from "./Classes.js";

// Get products count in cart
let cartProductsCount = Storage.getItem("cart").length;
// Function to render cart badge
const renderCartBadge = () => {
  const badge = `<span class="flex justify-center items-center w-3 h-3 bg-red-500 text-white text-[10px] rounded-full absolute -top-1 -right-1">${cartProductsCount}</span> </span
  >`;
  const cartBadge = document.querySelector("#cartBadge");
  cartBadge.innerHTML = badge;
};
// Validate authorization
const body = document.querySelector("#app");
if (body) {
  if (Storage.getItem("auth") === 1) {
    body.innerHTML = `<div>
    <!-- Header -->
    <header
      id="header"
      class="w-full h-14 flex items-center justify-between relative bg-gray-200"
    >
      <nav class="flex-1 px-4">
        <ul class="w-full flex gap-6">
          <li class="flex items-center">
            <a
              href="./home.html"
              class="cursor-pointer text-lg font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2"
              ><span class="sm:hidden"><i class="fa-solid fa-house"></i></span
              ><span class="hidden sm:block">Home</span></a
            >
          </li>
          <li class="flex items-center">
          <a
            href="./cart.html"
            class="cursor-pointer text-lg font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2"
            ><span class="relative"
              ><i class="fa-solid fa-cart-shopping"></i><span id="cartBadge" ><span class="flex justify-center items-center w-3 h-3 bg-red-500 text-white text-[10px] rounded-full absolute -top-1 -right-1">${cartProductsCount}</span></span> </span
            ><span class="hidden sm:block">Cart</span></a
          >
        </li>
          <li class="flex justify-center items-center ms-auto">
            <button
              id="signout"
              type="button"
              class="text-sm p-2 font-normal sm:text-base sm:font-bold text-center bg-blue-600 text-white hover:bg-blue-700 decoration-transparent rounded-2xl sm:px-4 sm:py-2"
            >
              <span class="sm:hidden px-3"
                ><i class="fa-solid fa-right-from-bracket"></i
              ></span>
              <span class="hidden sm:block"> Sign out</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <h1
      class="mx-auto my-6 text-3xl md:text-5xl text-blue-950 font-bold text-center"
    >
      My Cart 
    </h1>
    <div
      id="products"
      class="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] p-4 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 lg:p-4"
    ></div>
    <div id="snackbar"
    class="min-w-64 h-14 invisible z-10 fixed right-6 bottom-6 flex justify-center items-center rounded text-base px-4 py-2 text-white shadow-md bg-gray-800"
  ></div>
  </div>`;

    // Handling the active link
    const navbar = document.querySelector("nav ul");
    const currentLocation = window.location.pathname;
    const currentLink = navbar.querySelector(
      `a[href $= "${currentLocation.split("/").at(-1)}"]`
    );
    currentLink.classList.replace("text-blue-600", "text-blue-950");
    currentLink.classList.remove("hover:text-blue-700");
  } else {
    body.innerHTML = `<div class="w-full h-screen flex flex-col justify-center items-center gap-3 px-4">
    <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-950">401</h1>
    <p class="text-base sm:text-xl md:text-2xl text-gray-600 text-center">
      Unauthorized: Access is denied due to invalid credentials.
    </p>
    <a
      href="./"
      class="w-40 py-3 text-center text-sm sm:text-base text-white bg-gray-600  hover:bg-gray-800 rounded"
      >Go Back</a
    >
  </div>
  `;
  }
}

// Function to show snackbar
const snackbar = document.querySelector("#snackbar");
const showSnackbar = (msg) => {
  snackbar.innerHTML = msg;
  snackbar.classList.add("show");
  setTimeout(() => {
    snackbar.classList.remove("show");
  }, 3000);
};

// Get cards parent and assign to Card psrent property
const productsParent = document.querySelector("#products");
if (productsParent) {
  Card.parent = productsParent;
  // Function to loop on products data then create product card and add it in page
  const addProducts = () => {
    const cartProducts = Storage.getItem("cart");
    [...cartProducts].forEach((product) => {
      const { id, name, desc, image, price } = { ...product };
      const card = new Card(id, name, desc, image, price, "remove");
    });
    // Handling the click event of the ADD TO CART button
    productsParent.addEventListener("click", (e) => {
      const currentButton = e.target;
      const card = e.target.parentElement.parentElement;
      if (currentButton.matches(".remove-from-cart")) {
        cartProductsCount--;
        renderCartBadge();
        showSnackbar("Removed from shopping cart");
        const Product = [...cartProducts].filter((product) => {
          return product.id == card.id;
        });
        Storage.delete("cart", Product[0].id);
        card.remove();
      }
    });
  };
  addProducts();
}

// Handling signout click event
const signoutButton = document.querySelector("#signout");
signoutButton.addEventListener("click", () => {
  Storage.removeItem("auth");
  window.location.href = "./";
});
