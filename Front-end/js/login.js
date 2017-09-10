function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if ( username == "jitae" && password == "1234"){
        sessionStorage.setItem("username",username);
        window.location.replace("addNewEvent.html");
        //window.parent.showModal("main.html");
        return false;
    }
    else{
        alert("id or password incorrect! Try again.");
        // Disabling fields after 3 attempts.
    }
}

function createId() {
  window.location.replace("register.html");
}