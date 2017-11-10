function back() {
	  window.location.replace("myevents.html");
}

$(window).bind("load", function() { 
  //var organizationId = getOrganizationId();
  var username = sessionStorage.getItem("username");

  $.ajax({
          url:'https://wouuuekpxj.execute-api.us-east-1.amazonaws.com/beta/volunteer/'
          +encodeURIComponent(username),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            console.log(getData);
            document.getElementById("userId").innerHTML = getData.Items[0].userid.S;
            document.getElementById("username").innerHTML = getData.Items[0].name.S;
            document.getElementById("email").innerHTML = getData.Items[0].email.S;
            document.getElementById("phone").innerHTML = getData.Items[0].phone.S;
          },
          error: function() {
            console.log('error loading data');
          }
  });
});


function checkPass() {
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(pass1.value == pass2.value){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!"
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
}  