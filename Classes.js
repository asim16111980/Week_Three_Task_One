// This file contains all classes that app needs it
class User {
  constructor(id, email, password, loginState = false) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.loginState = loginState;
  }
}

// Product class
class Product {
  constructor(id, name, desc, image, price) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.image = image;
    this.price = price;
  }
}

// Cart class
class Cart {
  constructor(userID, products) {
    this.userID = userID;
    this.products = products;
  }
}
// Card class
class Card {
  // Static Properties
  static parent = null;
  constructor(id, name, desc, image, price, action) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.image = image;
    this.price = price;
    this.action = action;
    this.create = () => {
      const newProductFragment = new DocumentFragment();
      const newProductContainer = document.createElement("div");
      newProductContainer.classList.add(
        "card",
        "rounded-lg",
        "shadow-lg",
        "overflow-hidden",
        "relative",
        "flex",
        "flex-col",
        "items-center",
        "min-h-[400px]",
        "sm:min-h-[470px]",
        "lg:min-h-[500px]"
      );
      newProductContainer.id = this.id;
      newProductContainer.innerHTML = `<div class="overflow-hidden w-full">
        <img src="images/products/${this.image}.jpg" alt="${
        this.name
      }" class="w-full cursor-pointer relative z-10 hover:scale-125 hover:-rotate-[4deg] duration-200" /><span
        class="absolute top-[20px] end-[10px] font-bold text-white text-lg z-10">${
          this.price
        }LE</span
        >
      </div>
      <div class="flex-1 flex flex-col p-2">
       <div class="flex-1 flex flex-col gap-4 py-2">
        <h2 class="text-base sm:text-xl font-bold text-blue-950">${
          this.name
        }</h2>
        <p class="my-3 text-sm sm:text-base text-gray-800 tracking-wider">
        ${this.desc}
        </p>
       </div>
       <button type="button" class="px-1 py-3 rounded-lg text-xs md:text-base text-center text-white ${
         this.action == "add"
           ? "add-to-cart bg-green-600 hover:bg-green-700"
           : "remove-from-cart bg-red-600 hover:bg-red-700"
       }">${this.action == "add" ? "ADD TO CART" : "REMOVE FROM CART"}</button>
      </div>`;
      newProductFragment.appendChild(newProductContainer);
      Card.parent.appendChild(newProductFragment);
    };
    this.create();
  }
}

export { User, Product, Cart, Card };
