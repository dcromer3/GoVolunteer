function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    $.ajax({
          url:'https://lce4l1fcek.execute-api.us-east-1.amazonaws.com/user/userlogin?userid='+encodeURIComponent(username)+'&password='+encodeURIComponent(password),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            if (getData.uservalid == false) {
                alert("Invalid user ID");
            } else if (getData.passvalid == false) {
                alert("Invalid password");
            }else if (getData.uservalid == true && getData.passvalid == true) {
                sessionStorage.setItem("username",username);

                $.ajax({
                      url:'https://lce4l1fcek.execute-api.us-east-1.amazonaws.com/beta/userid/'+encodeURIComponent(username),
                      method: 'GET',
                      dataType: 'json',
                      success: function(getData) {
                        if (getData.Items[0].type = "V") {
                          window.location.replace("myevents.html");
                        } else if (getData.Items[0].type = "O") {
                          window.location.replace("addNewEvent.html");
                        }
                      },
                      error: function() {
                        console.log('error loading data');
                      }
                });

                //window.location.replace("addNewEvent.html");
                return false;
            }
          },
          error: function() {
            console.log('error loading data');
          }
    });
}

function createId() {
  window.location.replace("register.html");
}