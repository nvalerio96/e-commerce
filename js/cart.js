var cartInfo = [];

const GET_PRODUCTS_HTML = document.getElementById('productsBody');
const GET_MONEDA_TYPE = document.getElementById('moneda');
const GET_PRODUCTS_TABLE = document.getElementById('table');
const GET_SUBTOTALES = document.getElementById("subtotales");
const GET_FORMENVIO = document.getElementById("formEnvio");
const GET_NORMAL_METHOD = document.getElementById("normal");
const GET_EXPRESS_METHOD = document.getElementById("express");
const GET_SUPEREXPRESS_METHOD = document.getElementById("superExpress");
const GET_FORMPAGO = document.getElementById("formPago");
const GET_EFECTIVO_METHOD = document.getElementById("efectivo");
const GET_CREDITO_METHOD = document.getElementById("credito");
const GET_FULLPAGE = document.getElementById("fullPage");

// variable que contiene la moneda actual de la pagina que determina como se va a imprimier toda la pagina
var currentCurrency = `${GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "UYU"}`;

// funcion que muestra los productos de la pagina
function showProducts(productsArray) {
    let contentToAppend = "";

    for(let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];
// if que muestra los productos como vienen mientras no se aplica un change
        if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "pesos" && product.currency === "USD") {
            currentCurrency = "UYU";

            contentToAppend += `
            <tr>
                <td class="info"><img src="${product.src}"></td>
                <td class="info">${product.name}</td>
                <td class="info" id="unit${i}">${product.unitCost * 40} ${currentCurrency}</td>
                <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                <td class="info" id="subT${i}">${(product.unitCost * 40) * product.count} ${currentCurrency}</td>
            </tr>
            `;

            GET_PRODUCTS_HTML.innerHTML = contentToAppend;
        };

        if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "pesos" && product.currency === "UYU") {
            currentCurrency = "UYU";
            
            contentToAppend += `
            <tr>
                <td class="info"><img src="${product.src}"></td>
                <td class="info">${product.name}</td>
                <td class="info" id="unit${i}">${product.unitCost} ${currentCurrency}</td>
                <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                <td class="info" id="subT${i}">${product.unitCost * product.count} ${currentCurrency}</td>
            </tr>
            `;

            GET_PRODUCTS_HTML.innerHTML = contentToAppend;
        };
    };
// event listener que cambia el tipo de moneda
    GET_MONEDA_TYPE.addEventListener("change", function(e) {
        contentToAppend = "";

        for(let i = 0; i < productsArray.length; i++){
            let product = productsArray[i];
// ifs que controlas los cambios de moneda y el tipo de moneda actual para calcular subtotal
            if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "pesos" && product.currency === "USD") {
                currentCurrency = "UYU";

                contentToAppend += `
                <tr>
                    <td class="info"><img src="${product.src}"></td>
                    <td class="info">${product.name}</td>
                    <td class="info" id="unit${i}">${product.unitCost * 40} ${currentCurrency}</td>
                    <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                    <td class="info" id="subT${i}">${(product.unitCost * 40) * product.count} ${currentCurrency}</td>
                </tr>
                `;
    
                GET_PRODUCTS_HTML.innerHTML = contentToAppend;
            };
    
            if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "pesos" && product.currency === "UYU") {
                currentCurrency = "UYU";
                
                contentToAppend += `
                <tr>
                    <td class="info"><img src="${product.src}"></td>
                    <td class="info">${product.name}</td>
                    <td class="info" id="unit${i}">${product.unitCost} ${currentCurrency}</td>
                    <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                    <td class="info" id="subT${i}">${product.unitCost * product.count} ${currentCurrency}</td>
                </tr>
                `;
    
                GET_PRODUCTS_HTML.innerHTML = contentToAppend;
            };
    
            if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "dolares" && product.currency === "UYU") {
                currentCurrency = "USD";
                
                contentToAppend += `
                <tr>
                    <td class="info"><img src="${product.src}"></td>
                    <td class="info">${product.name}</td>
                    <td class="info" id="unit${i}">${product.unitCost / 40} ${currentCurrency}</td>
                    <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                    <td class="info" id="subT${i}">${(product.unitCost / 40) * product.count} ${currentCurrency}</td>
                </tr>
                `;
    
                GET_PRODUCTS_HTML.innerHTML = contentToAppend;
            };

            if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "dolares" && product.currency === "USD") {
                currentCurrency = "USD";
                
                contentToAppend += `
                <tr>
                    <td class="info"><img src="${product.src}"></td>
                    <td class="info">${product.name}</td>
                    <td class="info" id="unit${i}">${product.unitCost} ${currentCurrency}</td>
                    <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                    <td class="info" id="subT${i}">${product.unitCost * product.count} ${currentCurrency}</td>
                </tr>
                `;
    
                GET_PRODUCTS_HTML.innerHTML = contentToAppend;
            };
        };
    });
};

// funcion que multiplica el subtotal en base a la cantidad de productos
function  subtotalMultiplier(productsArray) {
// funcion change que activa la multiplicacion en base a productCount 
    GET_PRODUCTS_TABLE.addEventListener("change", function(e){
        for (let i = 0; i < productsArray.length; i++) {       
            let product = productsArray[i];
            let unitCost = document.getElementById(`unit${i}`);
            let prodCount = document.getElementById(`prodCount${i}`);
            let subT = document.getElementById(`subT${i}`);
// if que no permite colocar menos de un item
            if(prodCount.value < 1) {
                prodCount.value = 1;
            };
// ifs que filtran segun el tipo de moneda actual para hacer los calculos del subtotal
            if(currentCurrency == "UYU") {
                subT.innerHTML = `${(parseFloat(unitCost.textContent) * parseInt(prodCount.value)).toString()} ${currentCurrency}`;
            };
                
            if(currentCurrency == "USD") {
                subT.innerHTML = `${(parseFloat(unitCost.textContent) * parseInt(prodCount.value)).toString()} ${currentCurrency}`;
            };        
        };
    }); 
};
// funcion que imprime la tabla de de resumen de precios
function totalMultiplier(productsArray) {
    let subSumArray = [];
    let subSum = 0;
    let taxes = 0;
    let payType = "";
    let totalAndTaxes = 0;
// ifs que segun la moneda añade los subtotales un array para luego sumarlos en UYU
    if(currentCurrency == "UYU"){
        subSumArray = [];
        subSum = 0;
// for que mete subtotales en array
        for(let i = 0; i < productsArray.length; i++) {
            let subT = document.getElementById(`subT${i}`);

            subSumArray.push(subT);
        };
//for que suma los subtotales del array 
        for(let i = 0; i < subSumArray.length; i++) {
            let sub = subSumArray[i];
            subSum += parseFloat(sub.innerText);
        };

        GET_SUBTOTALES.innerHTML = `${subSum} ${currentCurrency}`;
    };
// ifs que segun la moneda añade los subtotales un array para luego sumarlos en USD
    if(currentCurrency == "USD"){
        subSumArray = [];
        subSum = 0;
        for(let i = 0; i < productsArray.length; i++) {
            let subT = document.getElementById(`subT${i}`);

            subSumArray.push(subT);
        };

        for(let i = 0; i < subSumArray.length; i++) {
            let sub = subSumArray[i];
            subSum += parseFloat(sub.innerText);
        };

        GET_SUBTOTALES.innerHTML = `${subSum} ${currentCurrency}`;
    };
//change que segun las variaciones de los productos calcula como los ifs anteriores
    GET_PRODUCTS_TABLE.addEventListener("change", function(e){
        if(currentCurrency == "UYU"){
            subSumArray = [];
            subSum = 0;

            for(let i = 0; i < productsArray.length; i++) {
                let subT = document.getElementById(`subT${i}`);
    
                subSumArray.push(subT);
            };
    
            for(let i = 0; i < subSumArray.length; i++) {
                let sub = subSumArray[i];
                subSum += parseFloat(sub.innerText);
            };
    
            GET_SUBTOTALES.innerHTML = `${subSum} ${currentCurrency}`;
        };

        if(currentCurrency == "USD"){
            subSumArray = [];
            subSum = 0;
            for(let i = 0; i < productsArray.length; i++) {
                let subT = document.getElementById(`subT${i}`);
    
                subSumArray.push(subT);
            };
    
            for(let i = 0; i < subSumArray.length; i++) {
                let sub = subSumArray[i];
                subSum += parseFloat(sub.innerText);
            };
    
            GET_SUBTOTALES.innerHTML = `${subSum} ${currentCurrency}`;
        };
    });
// change que segun cambie las opciones de envio imprime la informacion en el resumen
    GET_FORMENVIO.addEventListener("change", function(e){
        if(GET_NORMAL_METHOD.checked) {
            taxes = GET_NORMAL_METHOD.value;
            document.getElementById("porcentajeEnvio").innerHTML = `${taxes}`;
            document.getElementById("metodoSeleccionado").innerHTML = GET_NORMAL_METHOD.id;
        };
        if(GET_EXPRESS_METHOD.checked) {
            taxes = GET_EXPRESS_METHOD.value
            document.getElementById("porcentajeEnvio").innerHTML = `${taxes}`;
            document.getElementById("metodoSeleccionado").innerHTML = GET_EXPRESS_METHOD.id;
        };
        if(GET_SUPEREXPRESS_METHOD.checked) {
            taxes = GET_SUPEREXPRESS_METHOD.value;
            document.getElementById("porcentajeEnvio").innerHTML = `${taxes}`;
            document.getElementById("metodoSeleccionado").innerHTML = GET_SUPEREXPRESS_METHOD.id;
        };
    });
// change que segun cambien alguna informacion de la pagina entera actualiza el costo total
    GET_FULLPAGE.addEventListener("change", function(e){
        totalAndTaxes = `${subSum + (subSum * (parseFloat(taxes)/100))}${currentCurrency}`;
        document.getElementById("totales").innerHTML = totalAndTaxes;
    });
// change que segun cambios en la forma de pago actualiza la informacion en el resumen
    GET_FORMPAGO.addEventListener("change", function(e){
        if(GET_EFECTIVO_METHOD.checked) {
            payType = GET_EFECTIVO_METHOD.value;
            document.getElementById("formaSeleccionada").innerHTML = payType;
        };

        if(GET_CREDITO_METHOD.checked) {
            payType = GET_CREDITO_METHOD.value;
            document.getElementById("formaSeleccionada").innerHTML = payType;
        };
    });
};
// funcion que habilita el boton de compra segun los campos requeridos
function buyButton() {
    const GET_CALLE = document.getElementById("calle");
    const GET_ESQUINA = document.getElementById("esq");
    const GET_NUMERO = document.getElementById("numero");
    const GET_BUYBUTTON = document.getElementById("buyButton");
// change que recive el boton deshabilitado y lo habilita o lo vuelve a deshabilitar
    GET_FULLPAGE.addEventListener("change", function(e){
        // if que habilita
        if((GET_CALLE.value != "" && GET_ESQUINA.value != "" && GET_NUMERO.value != "") && (GET_CREDITO_METHOD.checked || GET_EFECTIVO_METHOD.checked) && (GET_NORMAL_METHOD.checked || GET_EXPRESS_METHOD.checked || GET_SUPEREXPRESS_METHOD.checked)){
            GET_BUYBUTTON.disabled = false;
        };
        // if que deshabilita
        if((GET_CALLE.value == "" || GET_ESQUINA.value == "" || GET_NUMERO.value == "") || (GET_CREDITO_METHOD.checked == false && GET_EFECTIVO_METHOD.checked == false) || (GET_NORMAL_METHOD.checked == false && GET_EXPRESS_METHOD.checked == false && GET_SUPEREXPRESS_METHOD.checked == false)){
            GET_BUYBUTTON.disabled = true;
        };
    });
// evento de click que ejecuta la compra cuando le das al boton
    GET_BUYBUTTON.addEventListener("click", function(e){
        location.href = "#";
        document.getElementById("success").innerHTML = "Has realizado tu compra con exito!!";
        document.getElementById("success").style = "background-color: skyblue;";
    });
};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(REAL_CART_INFO_URL).then(function (resultOBJ) {
        //si el status del json esta ok procede a realizar tareas
        if (resultOBJ.status === "ok") {
            cartInfo = resultOBJ.data.articles;
            showProducts(cartInfo);
            subtotalMultiplier(cartInfo);
            totalMultiplier(cartInfo);
            buyButton();
        }
    });
});