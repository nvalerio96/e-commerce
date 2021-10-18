var cartInfo = {};



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(REAL_CART_INFO_URL).then(function (resultOBJ) {
        //si el status del json esta ok procede a realizar tareas
        if (resultOBJ.status === "ok") {
            cartInfo = resultOBJ.data;
        }
    });
});