const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const OBT_NAV_VAR = document.getElementById('navbar');
const OBT_LOCAL_STORAGE_USERNAME = localStorage.getItem('username');

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//funcion que llama la barra de navegacion en todas las paginas con o sin usuario
function spawnNavBar() {
  if(OBT_LOCAL_STORAGE_USERNAME){
    OBT_NAV_VAR.innerHTML =`<div class="container d-flex flex-column flex-md-row justify-content-between">
    <a class="py-2 d-none d-md-inline-block" href="inicio.html">Inicio</a>
    <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
    <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
    <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
    <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
    <input type="submit" value=` + OBT_LOCAL_STORAGE_USERNAME + ` class="py-2 d-none d-md-inline-block"  id="logout">
    </div>`
  }else {
    OBT_NAV_VAR.innerHTML = `<div class="container d-flex flex-column flex-md-row justify-content-between">
    <a class="py-2 d-none d-md-inline-block" href="inicio.html">Inicio</a>
    <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
    <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
    <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
    <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
    <a class="py-2 d-none d-md-inline-block" href="index.html">LogIn</a>
    </div>`
  }
}

//funcion de logout facil de modificar para proximas entregas
function logout() {
  localStorage.removeItem('username');
  location.href = './index.html';
}

document.addEventListener("DOMContentLoaded", function(e){
  
  spawnNavBar()
  
  const LOGOUT_BUTTON = document.getElementById('logout');
  
  //evento de click para desloguear
  LOGOUT_BUTTON.addEventListener("click", function(e){
    e.preventDefault();
    logout();
  });
});