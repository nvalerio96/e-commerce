    const obtUsuario = document.getElementById('userlog');
    const obtPassword = document.getElementById('passwordlog');
    const getButton = document.getElementById('button');
    const getButtonShowPassword = document.getElementById('buttonpasswordtext')

//funcion que muestra o esconde password
function showPassText(passSection) {
    if(passSection.type === "password") {
        passSection.type = "text";
    }else {
        passSection.type = "password";
    }
}
    
//funcion que guarda usermane en localstorage y pasa de login al sitio web
function saveUsernameAndEnterSite() {
    let user = obtUsuario.value;
    let password = obtPassword.value;
    
    if(user.length >= 6 && password.length >= 6 ){
        localStorage.setItem('username', user);
        location.href = './inicio.html';
    }
    else{
        document.getElementById('login').reset();
    }
}

document.addEventListener('DOMContentLoaded', function(e){

    //evento de click en boton de ingreso
    getButton.addEventListener('click', start =>{
        start.preventDefault();
        saveUsernameAndEnterSite();
    });

    //evento de click en boton para mostrar password
    getButtonShowPassword.addEventListener('click', start =>{
        start.preventDefault();
        showPassText(obtPassword);
    });
});