var productInfo = [];
var productsURL = [];
var productComments = [];

//funcion que carga la informacion del JSON al HTML
function showProductInfo(productData) {

    let product = productData[0];

    let contentToAppend = `
    <div class="row">
        <h1 class="col-sm-6 text-left mb-1">`+ product.name +`</h1>
        <div class="col-md-3 col-sm-2"></div>
        <h2 class="col-md-3 col-sm-4 mb-1 text-muted">` + product.currency + `` + product.cost + `</h2>
    </div><br>
    <h3> Imágenes ilustrativas </h3>
    <div class="row">
        <div id="carousel" class="col-lg-8" style="padding-bottom: 5px"></div>
        <div class="border_info col-lg-4">
        <p> ` + product.description + `</p>
        <p class="mb-0 text-muted text-right">Categoría: ` + product.category + ` <br> Cant. Vendidos: ` + product.soldCount + ` </p>
        </div>
    </div>
    `;

    document.getElementById("prod-info").innerHTML = contentToAppend;
};

//funcion que recorre la lista de imagenes del producto y la imprime en el HTML
function showCarousel(productData) {

    let product = productData[0].images;

    let imgToCarousel = "";

    let carouselIndicators = "";

    let carouselToAppend = `
    <div id="carouselExampleIndicators" class="carousel slide border_carousel" data-ride="carousel">
      <ol class="carousel-indicators" id="indicators">
      </ol>
      <div class="carousel-inner" id="imgSpot">
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    `;

    for(let i = 0; i < product.length; i++) {
        let img = product[i];

        if(i == 0){
            imgToCarousel += `
            <div class="carousel-item active">
                <img src="`+img+`" class="d-block w-100" alt="Imagen `+(i+1)+` del producto" id="img`+i+`">
            </div>
            `;
        } else {
            imgToCarousel += `
            <div class="carousel-item">
                <img src="`+img+`" class="d-block w-100" alt="Imagen `+(i+1)+` del producto" id="img`+i+`">
            </div>
            `;
        };

        if(i == 0){
            carouselIndicators += `
            <li data-target="#carouselExampleIndicators" data-slide-to="`+i+`" class="active"></li>
            `;
        } else {
            carouselIndicators += `
            <li data-target="#carouselExampleIndicators" data-slide-to="`+i+`"></li>
            `;
        };
    };

    document.getElementById('carousel').innerHTML = carouselToAppend;
    document.getElementById('imgSpot').innerHTML = imgToCarousel;
    document.getElementById('indicators').innerHTML = carouselIndicators;
};

function showRelatedProducts(relatedProductsArray, criteria) {
    let relatedToAppend = "";

    for(let i = 0; i < relatedProductsArray.length; i++){
        let productOfArray = relatedProductsArray[i]

        if(criteria.indexOf(relatedProductsArray.indexOf(productOfArray)) != -1) {
            relatedToAppend += `
            <div class="card col-lg-3 col-md-4 col-sm-6" style="max-width: 250px; max-height: 400px; padding-top: 5px">
                <img src="`+productOfArray.imgSrc+`" class="card-img-top" alt="`+productOfArray.name+`">
                <div class="card-body">
                    <h5 class="card-title overflow-auto" style="max-height: 50px">`+productOfArray.name+`</h5>
                    <p class="card-text overflow-auto" style="height: 75px">`+productOfArray.description+`</p>
                    <a href="#" class="btn btn-primary overflow-auto" style="width: 100%; max-height: 65px">VER PRODUCTO</a>
                </div>
            </div>
            `;
        };
    };

    document.getElementById('related').innerHTML = relatedToAppend;
};

//funcion que muestra los comentarios cargados del JSON
function showComments(comments) {

    let contentToAppend = "";

    for(let i = 0; i < comments.length; i++) {
        let comment = comments[i];
        let score = comment.score;
        let stars = "";
        
        //IFs que deciden cuantas estrellas imprimir de acuerdo al "score"
        if(score == 1) {
            stars = '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>'
        };
        if(score == 2) {
            stars = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>'
        };
        if(score == 3) {
            stars = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>'
        };
        if(score == 4) {
            stars = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>'
        };
        if(score == 5) {
            stars = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'
        };

        contentToAppend += `
        <div class="border_comment p-3">
            <div class="row">
                <h5 class="col-md-6 user" style="width: 100%"> ` + comment.user + ` </h5>
                <div class="col-md-3"></div>
                <h5 class="col-md-3 text-muted  date" style="width: 100%"> ` + comment.dateTime + ` </h5>
            </div>
            ` + stars + `
            <p class="overflow-auto comment" style="max-height: 75px"> ` + comment.description + ` </p>
        </div><br>
        `;

    };

    document.getElementById("prod-comments").innerHTML = `
    <div class="mt-4 px-4">
        `+ contentToAppend +`
    </div>`;
};

//funcion que genera interfaz para crear comentarios
function makeComment() {

    let contentToAppend = `
    <form class="p-4 w-100">
        <textarea placeholder="Postea un comentario!" name="comment" cols="50" rows="2" id="textarea" class="w-100"></textarea><br>
        <lavel for="rate">Valora el producto: </label>
        <select name="rate" id="rate">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <input type="submit" id="button">
    </form>
    `;

    document.getElementById('post-comments').innerHTML = contentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e){
    
    //funcion que carga el JSON con informacion sobre el producto
    getJSONData(PRODUCT_INFO_URL).then(function (resultOBJ) {
        //si el status del json esta ok procede a realizar tareas
        if (resultOBJ.status === "ok") {
            productInfo.push(resultOBJ.data);
            showProductInfo(productInfo);
            showCarousel(productInfo);
            getJSONData(PRODUCTS_URL).then(function (resultOBJ) {
                if (resultOBJ.status === "ok") {
                    productsURL = resultOBJ.data;
                    showRelatedProducts(productsURL, productInfo[0].relatedProducts);
                }
            });
        }
    });

    //funcion que carga el JSON de comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultOBJ) {
        if (resultOBJ.status === "ok") {
            productComments = resultOBJ.data;
            showComments(productComments);
            makeComment();
            //evento de click con la funcion para cancelar funcion del submit
            document.getElementById('button').addEventListener('click', function(e) {
                e.preventDefault();
            });
        }
    });
});