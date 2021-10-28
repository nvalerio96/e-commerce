const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const REAL_CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const OBT_NAV_VAR = document.getElementById('navbar');
const OBT_LOCAL_STORAGE_USERNAME = localStorage.getItem('username');

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
};

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
};

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
};

//funcion que llama la barra de navegacion en todas las paginas con o sin usuario
function spawnNavBar() {
  if(OBT_LOCAL_STORAGE_USERNAME){
    OBT_NAV_VAR.innerHTML = `
    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse flex-column" id="navbarSupportedContent">
    <ul class="navbar-nav w-75 justify-content-between">
      <li class="nav-item active">
        <a class="nav-link" href="inicio.html">Inicio</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="categories.html">Categorías</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="products.html">Productos</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="sell.html">Vender</a>
      </li>
      <li class="nav-item active">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            ` + OBT_LOCAL_STORAGE_USERNAME + `
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="./my-profile.html">Mi perfil</a>
            <a class="dropdown-item" href="./cart.html">Ver mi carrito</a>
            <a class="dropdown-item" id="logout" href="#">Cerrar sesión</a>
          </div>
        </div>
      </li>
    </ul>
    </div>`
    // <input type="submit" value=` + OBT_LOCAL_STORAGE_USERNAME + ` class="nav-item py-2"  id="logout">

    // <div class="container d-flex flex-column flex-md-row justify-content-between collapse navbar-collapse" id="navbarSupportedContent">
    // <a class="py-2 d-none d-md-inline-block" href="inicio.html">Inicio</a>
    // <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
    // <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
    // <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
    // <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
    // <input type="submit" value=` + OBT_LOCAL_STORAGE_USERNAME + ` class="py-2 d-none d-md-inline-block"  id="logout">
    // </div>`
  }else {
    OBT_NAV_VAR.innerHTML = `
    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse flex-column" id="navbarSupportedContent">
    <ul class="navbar-nav w-75 justify-content-between">
      <li class="nav-item active">
        <a class="nav-link" href="inicio.html">Inicio</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="categories.html">Categorías</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="products.html">Productos</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="sell.html">Vender</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="cart.html">Mi carrito</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="index.html">LogIn</a>
      </li>
    </ul>
    </div>`
  }
};

//funcion de logout facil de modificar para proximas entregas
function logout() {
  localStorage.removeItem('username');
  location.href = './index.html';
};

document.addEventListener("DOMContentLoaded", function(e){
  
  spawnNavBar();
  
  const LOGOUT_BUTTON = document.getElementById('logout');
  
  //evento de click para desloguear
  LOGOUT_BUTTON.addEventListener("click", function(e){
    e.preventDefault();
    logout();
  });
});