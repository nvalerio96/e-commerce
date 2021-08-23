//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let listadoCategorias = [];

function showCategoriesList(lista){

    let contentToAppend = "";
    for(let i = 0; i < lista.length; i++){
        let categoria = lista[i];

        contentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + categoria.imgSrc + `" alt="` + categoria.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ categoria.name +`</h4>
                        <small class="text-muted">` + categoria.currency + `` +categoria.cost + `</small>
                    </div>
                <p>` + categoria.description + `</p>
                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = contentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
            listadoCategorias = result.data;
            showCategoriesList(listadoCategorias);
        }
    });

});