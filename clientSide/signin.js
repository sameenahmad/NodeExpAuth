document.getElementById("signIn").addEventListener("submit", verifyCredentials);
function verifyCredentials(event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  fetch("http://localhost:4000/api/signin", {
    method: "GET",
    headers: new Headers(),
    body: JSON.stringify({ email: email, body: body })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}