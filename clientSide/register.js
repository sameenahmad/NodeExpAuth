document.getElementById("register").addEventListener("submit", registerUser);
function registerUser() {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: new Headers(),
      body: JSON.stringify({ email: email, body: body, password: password })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
  