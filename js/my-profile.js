const GET_SAVE_BUTTON = document.getElementById("saveButton");
const GET_DELETE_BUTTON = document.getElementById("deleteUserData");

var obtFullName = document.getElementById("fullName");
var obtAge = document.getElementById("age");
var obtMail = document.getElementById("eMail");
var obtNumber = document.getElementById("contactNum");

var imprFullName = document.getElementById("imprName");
var imprAge = document.getElementById("imprAge");
var imprMail = document.getElementById("impreMail");
var imprNumber = document.getElementById("imprContactNum");

function saveDataAndReload(){
    let userDataModel = {
        nameAndSurname: `Nombre: ${obtFullName.value}`,
        age: `Edad: ${obtAge.value}`,
        email: `eMail: ${obtMail.value}`,
        number: `Numero de contacto: ${obtNumber.value}`
        };

    if(obtFullName.value != "" && obtAge.value != "" && obtMail.value != "" && obtNumber.value != ""){
    localStorage.setItem("userdata", JSON.stringify(userDataModel));
    location.reload();
    };
};

function showData(){
    if(localStorage.getItem("userdata")) {
        let userDataObject = JSON.parse(localStorage.getItem("userdata"));
        imprFullName.innerHTML = userDataObject.nameAndSurname;
        imprAge.innerHTML = userDataObject.age;
        imprMail.innerHTML = userDataObject.email;
        imprNumber.innerHTML = userDataObject.number;
    };
};

document.addEventListener("DOMContentLoaded", function (e) {
    showData()
    GET_SAVE_BUTTON.addEventListener("click", function(e) {
        saveDataAndReload();
    });

    GET_DELETE_BUTTON.addEventListener("click", function(e) {
        if(localStorage.getItem("userdata")) {
            localStorage.removeItem("userdata");
            location.reload();
        };
    })
});