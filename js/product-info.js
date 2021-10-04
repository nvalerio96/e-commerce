var productInfo = [];
var productComments = [];

//funcion que carga la informacion del JSON al HTML
function showProductInfo(productData) {

    let product = productData[0];

    let contentToAppend = `
    <div class="d-flex w-100 justify-content-between">
        <h1 class="mb-1">`+ product.name +`</h1>
        <h2 class="mb-1 text-muted">` + product.currency + `` + product.cost + `</h2>
    </div><br>
    <h3> Imágenes ilustrativas </h3>
    <div class="container mt-5">
        <div id="img"></div>
        <p> ` + product.description + `</p>
        <p class="mb-1 text-muted text-right">Categoría: ` + product.category + ` <br> Cant. Vendidos: ` + product.soldCount + ` </p>
    </div>
    <h4 class="mt-4"> Productos relacionados </h4>
    <> ` + product.relatedProducts + ` </>`;

    document.getElementById("prod-info").innerHTML = contentToAppend;
};

//funcion que recorre la lista de imagenes del producto y la imprime en el HTML
function showImg(productData) {

    let product = productData[0].images;

    let imgToAppend = "";

    for(let i = 0; i < product.length; i++) {
        let img = product[i];

        imgToAppend += `
        <img src="`+img+`">
        `;
    };

    document.getElementById('img').innerHTML = imgToAppend;
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
        <div class="border border-primary p-4">
        <div class="d-flex w-100 justify-content-between">
            <h5> ` + comment.user + ` </h5>
            <h5 class="text-muted"> ` + comment.dateTime + ` </h5>
        </div>
        ` + stars + `
        <p> ` + comment.description + ` </p>
        </div><br>
        `;

    };

    document.getElementById("prod-comments").innerHTML = `
    <div class="container mt-4">
        `+ contentToAppend +`
    </div>`;
};

//funcion que genera interfaz para crear comentarios
function makeComment() {

    let contentToAppend = `
    <form>
        <textarea placeholder="Postea un comentario!" name="comment" cols="50" rows="2" id="textarea"></textarea><br>
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
            showImg(productInfo);
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