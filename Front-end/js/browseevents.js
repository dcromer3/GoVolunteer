var eventsArr = [];
var interest = new Map();
var options;

$( document ).ready(function() {
  username = sessionStorage.getItem("username");
  console.log('username: ' + username);
  $.when(ajax2()).done(function() {
    if (eventsArr.length != 0) {
      iterURL();
    }
  });
  $.when(iterInt()).done(function() {
    if (interest.size != 0) {
      makeList(interest); 
    }
  })
  
});

function makeList(arr) {
  //console.log(arr.size);
  var contents ="";
  for (var [key, value] of arr) {
    contents += '<option value =\''+value+'\'>'
  }
  document.getElementById("browsers").innerHTML = contents;
}


function iterInt() {
  return $.ajax({
          url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/ae/int',
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            for (var i =0; i < getData.Items.length; i++) {
              interest.set(getData.Items[i].eventId.S, getData.Items[i].interest.SS);
            }
            //console.log(interest);
          },
          error: function(xhr, textStatus, errorThrown) {
            console.log(xhr);
          }
  });
}
function opt(value) {
  options = value;
  console.log(value);

}

function iterURL() {
  /*
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
  }*/
  var temp = 0;
  var contents ="";
  for (var i = 0; i < eventsArr.length; i++) {
    contents += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">'+'<div class="event-tile">'+
    '<h5>'+eventsArr[i].title.S+'</h5>'+
    '<p>'+ eventsArr[i].description.S+'</p>'+
    '<div class="right">'+'<button onclick=more(\''+eventsArr[i].eventId.S+'\') class="your-event">'+"more..."+'</button>'+'</div>'+
    '</div>'+'</div>';
    temp += 1;
  }
  document.getElementById("contents").innerHTML = contents;
}
function more(hid) {

  //var id = document.getElementsByClassName(hid.id);
  //id = id[0].innerHTML;
  console.log(hid);
  sessionStorage.setItem("registerId",hid);
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