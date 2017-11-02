var organizationId;
var arr = [];
var eventsArr = [];
var username;
var moreId;

$( document ).ready(function() {
  username = sessionStorage.getItem("username");
  console.log('username: ' + username);
  $.when(ajax2()).done(function() {
    if (eventsArr.length != 0) {
      iterURL();
      console.log(eventsArr);
    }
  });
});

function more(hid) {

  sessionStorage.setItem("eventId",hid);
  window.location.replace("eventProfileOrg.html");
}

function ajax2() {
  return $.ajax({
      url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/relatedorgs/'+encodeURIComponent(username),
      method: 'GET',
      dataType: 'json',
      success: function(getData) {
        console.log(getData);
        for (var i = 0; i < getData.Items.length; i++) {
            eventsArr.push(getData.Items[i]);
        }
      },
      error: function() {
        console.log('error loading data');
      }
  });
}

function iterURL() {
  var temp = 0;
  var contents ="";
  for (var i = 0; i < eventsArr.length; i++) {
    contents += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">'+'<div class="event-tile">'+
    '<h5>'+eventsArr[i].title.S+'</h5>'+
    '<p class="hidden">'+ eventsArr[i].description.S+'</p>'+
    '<div class="right">'+'<button onclick=more(\''+eventsArr[i].eventId.S+'\') class="your-event">'+"more..."+'</button>'+'</div>'+
    '</div>'+'</div>';
    temp += 1;
  }
  document.getElementById("contents").innerHTML = contents;
}
function back() {
  sessionStorage.removeItem("eventId");
  window.location.replace("addNewEvent.html");
}
function myEvents() {
  window.location.replace("govolunteer.html");
}
