function verifyCredentials(){
var email=document.getElementById('email').value;
var password=document.getElementById('password').value;
fetch('http://localhost:4000/api/signin')

}
function registerUser(){
    var name= document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    fetch('http://localhost:4000/api/register')
}
