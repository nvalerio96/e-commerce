var cartInfo = [];
const GET_PRODUCTS_HTML = document.getElementById('products');
const GET_PAYTYPE_HTML = document.getElementById('payType');
const GET_SENDMETHOD_HTML = document.getElementById('sendMethod');
const GET_TOTAL_HTML = document.getElementById('total');
const GET_MONEDA_TYPE = document.getElementById('moneda');
var currentCurrency = "";
var currentTotal = "";
// funcion que muestra los productos de la pagina
function showProducts(productsArray) {
    let initialContentToAppend = "";
    let predeterminadoContentToAppend = "";
    let pesosContentToAppend = "";
    let dolaresContentToAppend = "";

    for(let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];
// if que muestra los productos como vienen, sin correccion de moneda
        if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "predeterminado") {
            currentCurrency = "";
            initialContentToAppend += `
            <tr>
                <td class="info"><img src="${product.src}"></td>
                <td class="info">${product.name}</td>
                <td class="info" id="unit${i}">${product.unitCost} ${product.currency}</td>
                <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                <td class="info" id="subT${i}">${product.unitCost * product.count} ${product.currency}</td>
            </tr>
            `;

            GET_PRODUCTS_HTML.innerHTML = initialContentToAppend;
        };
// event listener que cambia el tipo de moneda
        GET_MONEDA_TYPE.addEventListener("change", function(e) {
// ifs que controlas los cambios de moneda y el tipo de moneda actual para calcular subtotal
            if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "predeterminado") {
                initialContentToAppend = "";
                pesosContentToAppend = "";
                dolaresContentToAppend = "";
                currentCurrency = "";
                predeterminadoContentToAppend += `
                <tr>
                    <td class="info"><img src="${product.src}"></td>
                    <td class="info">${product.name}</td>
                    <td class="info" id="unit${i}">${product.unitCost} ${product.currency}</td>
                    <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                    <td class="info" id="subT${i}">${product.unitCost * product.count} ${product.currency} </td>
                </tr>
                `;
    
                GET_PRODUCTS_HTML.innerHTML = predeterminadoContentToAppend;
            };
    
            if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "pesos" && product.currency === "USD") {
                initialContentToAppend = "";
                predeterminadoContentToAppend = "";
                dolaresContentToAppend = "";
                currentCurrency = "UYU";
                pesosContentToAppend += `
                <tr>
                    <td class="info"><img src="${product.src}"></td>
                    <td class="info">${product.name}</td>
                    <td class="info" id="unit${i}">${product.unitCost * 40} ${currentCurrency}</td>
                    <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                    <td class="info" id="subT${i}">${(product.unitCost * 40) * product.count} ${currentCurrency}</td>
                </tr>
                `;
    
                GET_PRODUCTS_HTML.innerHTML = pesosContentToAppend;
            };
    
            if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "pesos" && product.currency === "UYU") {
                initialContentToAppend = "";
                predeterminadoContentToAppend = "";
                dolaresContentToAppend = "";
                currentCurrency = "UYU";
                pesosContentToAppend += `
                <tr>
                    <td class="info"><img src="${product.src}"></td>
                    <td class="info">${product.name}</td>
                    <td class="info" id="unit${i}">${product.unitCost} ${currentCurrency}</td>
                    <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                    <td class="info" id="subT${i}">${product.unitCost * product.count} ${currentCurrency}</td>
                </tr>
                `;
    
                GET_PRODUCTS_HTML.innerHTML = pesosContentToAppend;
            };
    
            if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "dolares" && product.currency === "UYU") {
                initialContentToAppend = "";
                predeterminadoContentToAppend = "";
                pesosContentToAppend = "";
                currentCurrency = "USD";
                dolaresContentToAppend += `
                <tr>
                    <td class="info"><img src="${product.src}"></td>
                    <td class="info">${product.name}</td>
                    <td class="info" id="unit${i}">${product.unitCost / 40} ${currentCurrency}</td>
                    <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                    <td class="info" id="subT${i}">${(product.unitCost / 40) * product.count} ${currentCurrency}</td>
                </tr>
                `;
    
                GET_PRODUCTS_HTML.innerHTML = dolaresContentToAppend;
            };

            if(GET_MONEDA_TYPE.options[GET_MONEDA_TYPE.selectedIndex].value === "dolares" && product.currency === "USD") {
                initialContentToAppend = "";
                predeterminadoContentToAppend = "";
                pesosContentToAppend = "";
                currentCurrency = "USD";
                dolaresContentToAppend += `
                <tr>
                    <td class="info"><img src="${product.src}"></td>
                    <td class="info">${product.name}</td>
                    <td class="info" id="unit${i}">${product.unitCost} ${currentCurrency}</td>
                    <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
                    <td class="info" id="subT${i}">${product.unitCost * product.count} ${currentCurrency}</td>
                </tr>
                `;
    
                GET_PRODUCTS_HTML.innerHTML = dolaresContentToAppend;
            };
        })
    };
};

// funcion que multiplica el subtotal en base a la cantidad de productos
function  subtotalMultiplier(productsArray) {
    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];
        let prodCount = document.querySelector(`#prodCount${i}`);
        let subT = document.querySelector(`#subT${i}`);
        let newUnitCost = document.querySelector(`#unit${i}`).textContent;
// funcion change que activa la multiplicacion en base a productCount
        prodCount.addEventListener("change", function(e){
            // if que no permite colocar menos de un item
            if(prodCount.value < 1) {
                prodCount.value = 1;
            };
// ifs que filtran segun el tipo de moneda actual para hacer los calculos del subtotal
            if(currentCurrency === "") {
                subT.innerHTML = `${(product.unitCost * parseInt(prodCount.value)).toString()} ${product.currency}`;
            };

            if(currentCurrency === "UYU") {
                subT.innerHTML = `${(parseFloat(newUnitCost, 0.1) * parseInt(prodCount.value)).toString()} ${currentCurrency}`;
            };
                
            if(currentCurrency === "USD") {
                subT.innerHTML = `${(parseFloat(newUnitCost, 0.1) * parseInt(prodCount.value)).toString()} ${currentCurrency}`;
            };
        }); 
    };
};
// funcion que crea la seccion tipo de pago
function payMethod() {

    let contentToAppend = `
    <p>Selecciona metodo de pago:</p>
    <input type="radio" name="pago" value="efectivo" id="efectivo" checked>
    <label for="efectivo">Efectivo</label>
    <input type="radio" name="pago" value="tarjeta de credito" id="credito" disabled>
    <label for="credito">Tarjeta de credito</label>
    `;

    GET_PAYTYPE_HTML.innerHTML = contentToAppend;
}
// funcion que crea la seccion tipo de envio
function sendMethod() {

    let contentToAppend = `
    <p>Selecciona metodo de envio:</p>
    <input type="radio" name="local" value="buscar" id="local" checked>
    <label for="local">Buscar al local</label>
    <input type="radio" name="envio" value="envio" id="envio" disabled>
    <label for="envio">Envio a su puerta</label>
    `;

    GET_SENDMETHOD_HTML.innerHTML = contentToAppend;
};

function totalMultiplier(cartInfo) {
    let contentToAppend = "";
    let subTSum = [];

    for(let i = 0; i < cartInfo.length; i++) {
        let prodSubT = document.getElementById(`subT${i}`).textContent;
        subTSum.push(prodSubT);

        contentToAppend = `
        <p id="subtotales"></p>
        <p>Metodo de envio: Buscar al local (+ UYU 0)</p>
        <p>Modo de pago: Efectivo (+ UYU 0)</p>
        <p id="totales">Total: </p>
        <button value="Comprar" class="mb-1" id="buyButton">Comprar!</button>
        `;
    };
    GET_TOTAL_HTML.innerHTML = contentToAppend;
    document.getElementById('subtotales').innerHTML = `Subtotales: ${subTSum}`;
    document.getElementById('totales').innerHTML = `Total: ${parseFloat(subTSum[0]) + parseFloat(subTSum[1])} ${currentCurrency}`;
    if(currentCurrency ==="") {
        document.getElementById('totales').innerHTML = "No se puede mezclar divisas"
        document.getElementById('buyButton').setAttribute("disabled", "")
    }
};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(REAL_CART_INFO_URL).then(function (resultOBJ) {
        //si el status del json esta ok procede a realizar tareas
        if (resultOBJ.status === "ok") {
            cartInfo = resultOBJ.data.articles;
            showProducts(cartInfo);
            payMethod()
            sendMethod()
            totalMultiplier(cartInfo);
            // funcion que actualiza los datos cada vez que un algun dato cambia en la pagina
            window.addEventListener("change", function(e) {
                subtotalMultiplier(cartInfo);
                totalMultiplier(cartInfo);
            })
        }
    });
});