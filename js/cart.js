var cartInfo = [];
const GET_PRODUCTS_HTML = document.getElementById('products');
const GET_PAYTYPE_HTML = document.getElementById('payType');
const GET_SENDMETHOD_HTML = document.getElementById('sendMethod');
const GET_TOTAL_HTML = document.getElementById('total');

function showProducts(array) {
    let contentToAppend = "";

    for(let i = 0; i < array.length; i++) {
        let product = array[i];

        contentToAppend += `
        <tr>
            <td><img src="${product.src}"></td>
            <td class="info">${product.name}</td>
            <td class="info">${product.currency} ${product.unitCost}</td>
            <td class="info"><input type="number" value="${product.count}" min="1" id="prodCount${i}"></td>
            <td class="info" id="subT${i}">${product.unitCost * product.count}</td>
        </tr>
        `;
    };

    GET_PRODUCTS_HTML.innerHTML = contentToAppend;
};

function  subTotalMultiplier(productsArray) {
    for(i = 0; i < productsArray; i++) {
        let product = productsArray[i];
        let prodCount = document.getElementById(`prodCount${i}`);
        let subT = document.getElementById(`subT${i}`);

        prodCount.addEventListener("change", function(e){
            subT.innerHTML = toString(product.unitCost * parseInt(prodCount.value))
        });
    };
};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(REAL_CART_INFO_URL).then(function (resultOBJ) {
        //si el status del json esta ok procede a realizar tareas
        if (resultOBJ.status === "ok") {
            cartInfo = resultOBJ.data.articles;
            showProducts(cartInfo);
            subTotalMultiplier(cartInfo);
        }
    });
});