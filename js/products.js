const ORDER_ASC_BY_PRICE = "Menor a mayor precio";
const ORDER_DESC_BY_PRICE = "Mayor a menor precio";
const ORDER_DESC_PROD_SOLD_COUNT = "Relevancia";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    //ifs que establecen modos de ordenamiento de la lista segun un criterio
    if (criteria === ORDER_ASC_BY_PRICE){
        //la variable vacia result se llena con la lista ingresada como parametro, ordenada por la funcion sort
        result = array.sort(function(a, b) {
            //"-1" establece que el objeto "a" ira por delante de objeto "b" si se cumple la condicion,"1" se situara por detras y "0" quedan iguales
            //estos return solo afectan a la funcion sort, no a la lista, la sita va a ser modificada por la funcion sort
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_PROD_SOLD_COUNT){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }
    //la funcion sortProducts da como resultado un return con la variable result, esta es una lista ordenada segun el criterio
    return result;
}


function showProductsList(){

    let contentToAppend = "";
    
    //for que recorre cada objeto de la lista
    for(let i = 0; i < currentProductsArray.length; i++){
        let item = currentProductsArray[i];

        //if que verifica si el objeto debe ser impreso de acuerdo a condiciones de filtrado
        if (((minCost == undefined) || (minCost != undefined && item.cost >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && item.cost <= maxCost))){

         //variable vacia que se llena de info de los objetos para ser enviada al html      
        contentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + item.imgSrc + `" alt="` + item.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ item.name +`</h4>
                        <small class="text-muted">` + item.currency + `` + item.cost + `<br> Cant. Vendidos: ` + item.soldCount + `</small>
                    </div>
                <p>` + item.description + `</p>
                </div>
            </div>
        </a>
        `
        }
        
        //funcion que rellena el contenedor html con los datos de los objetos establecidos en la variable contentToAppend
        document.getElementById("prod-list-container").innerHTML = contentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){

    //variable de criterio actual es modificada
    currentSortCriteria = sortCriteria;

    //if indica que si el segundo parametro esta definido, la lista de productos actual se toma de ese parametro
    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    //Ordeno la lista de productos con un criterio
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro la lista de productos ordenada
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    //funcion que recoge informacion json de una url de forma asincrona para llenar el html
    getJSONData(PRODUCTS_URL).then(function (resultOBJ) {
        //si el status del json esta ok procede a realizar tareas
        if (resultOBJ.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultOBJ.data);
        }
    });
    
    //evento de clickeo para el boton sortAsc
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    //evento de clickeo para el boton sortDesc
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    //evento de clickeo para el boton Relevance
    document.getElementById("sortByRelevance").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_PROD_SOLD_COUNT);
    });

    //evento de clickeo para el boton de limpiado de filtro
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        //se llama la funcion showProductsList que rellena el html con los items ya sin filtrado
        showProductsList();
    });

    //evento de clickeo para el boton de filtro
    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        //ifs que rellenan variables minCost y maxCost de acuerdo a lo establecido por el usuario
        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost) >= 0)){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost) >= 0)){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        //se llama la funcion showProductsList que rellena el html con los items ya filtrados
        showProductsList();
    });
});