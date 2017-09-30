var eventsArr = [];


$( document ).ready(function() {
  username = sessionStorage.getItem("username");
  console.log('username: ' + username);
  $.when(ajax2()).done(function() {
  	console.log(eventsArr);
    if (eventsArr.length != 0) {
      iterURL();
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
  return $.ajax({
      url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event',
      method: 'GET',
      dataType: 'json',
      success: function(getData) {
        for (var i = 0; i < getData.Items.length; i++) {
          //console.log(getData.Items.length);
          //userArr[i] = (getData.Items[i].username.S);
            eventsArr.push(getData.Items[i]);
        }
      },
      error: function() {
        console.log('error loading data');
      }
  });
}

function back() {
	sessionStorage.removeItem("registerId");
	window.location.replace("myevents.html");
}