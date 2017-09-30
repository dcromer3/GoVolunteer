$( document ).ready(function() {
  username = sessionStorage.getItem("username");
  console.log('username: ' + username);
  $.ajax({
          url:'https://lce4l1fcek.execute-api.us-east-1.amazonaws.com/beta/userid/'+encodeURIComponent(username),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
          	console.log(getData.Items[0].events.L.length);
            if (getData.Items[0].events.L.length == 0) {
            	document.getElementById('find').style.display= 'block' ;
          	} else {
          		document.getElementById('events').style.display= 'block' ;
          	}
          },
          error: function() {
            console.log('error loading data');
          }
    });
});

function logout() {
	sessionStorage.removeItem("username");
	window.location.replace("login.html");
}