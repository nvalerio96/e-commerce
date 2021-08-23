    const obtUsuario = document.getElementById('userlog');
    const obtPassword = document.getElementById('passwordlog');
    const getButton = document.getElementById('button');
    const getButtonShowPassword = document.getElementById('showpassword')

    

document.addEventListener('DOMContentLoaded', function(e){

    getButton.addEventListener('click', start =>{
        start.preventDefault();

        let user = obtUsuario.value;
        let password = obtPassword.value;
    
        if(user.length >= 6 && password.length >= 6 ){
            location.href = './inicio.html';
        }
        else{
            document.getElementById('login').reset();
        }
    });

    
});