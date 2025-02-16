import Storage from "./Storage.js";

if (Storage.getItem("auth") == 1) {
  window.location.href = "./home.html";
} 
