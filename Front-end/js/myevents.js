var eventsArr = [];
var nameArr = [];

$( document ).ready(function() {
  username = sessionStorage.getItem("username");
  console.log('username: ' + username);
  $.ajax({
          url:'https://lce4l1fcek.execute-api.us-east-1.amazonaws.com/beta/userid/'+encodeURIComponent(username),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            if (getData.Items[0].events.SS.length == 1) {
            	document.getElementById('find').style.display= 'block' ;
          	} else {
          		nameArr.push(getData.Items[0].events.SS);
          		nameArr[0].shift();
          		$.when(ajax2()).done(function() {
				    if (eventsArr.length != 0) {
				    	iterURL();
				    }
				 });
          		document.getElementById('events').style.display= 'block' ;
          	}
          },
          error: function() {
            console.log('error loading data');
          }
    });
});
function iterURL() {
  var temp = 0;
  for (var i = 0; i < eventsArr.length; i++) {
      organizationId = eventsArr[i].eventId;
      var eventname = "eventname" + temp;
      var desc = "desc" + temp;
      var hid = "hid" + temp;
      console.log('organizationID : ' + organizationId);
      document.getElementById(eventname).innerHTML = eventsArr[i].title.S;
      document.getElementById(desc).innerHTML = eventsArr[i].description.S;
      document.getElementById(hid).innerHTML = eventsArr[i].eventId.S;
      temp += 1;
  }
}
function more(hid) {
  //var moreId = document.getElementById(hid);
  var id = document.getElementsByClassName(hid.id);
  id = id[0].innerHTML;
  sessionStorage.setItem("registerId",id);
  window.location.replace("registerEvent.html");
}
function ajax2() {
	var register = {
        "userId": username,
    }
    return $.ajax({
	              method: "POST",
	              data :JSON.stringify(register),
	              url: 'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/relatedusers',
	              contentType: "application/json",
	              success: function(data) {
	              	for (var i = 0; i < data.Items.length; i++) {
	              		eventsArr.push(data.Items[i]);
	              	}
	            },
	            error: function() {
	              console.log('error loading data');
	            }
        	});
}
function logout() {
	sessionStorage.removeItem("username");
	sessionStorage.removeItem("registerId");

	window.location.replace("login.html");
}