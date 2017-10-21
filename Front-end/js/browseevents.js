var eventsArr = [];
var interest = new Map();
var org = new Map();
var options;
var shareArr = [];
var shareEvents = [];


$( document ).ready(function() {
  username = sessionStorage.getItem("username");
  console.log('username: ' + username);
  $.when(ajax2(),iterInt(),iterOrg()).done(function() {
    if (eventsArr.length != 0) {
      iterURL(eventsArr);
    }
  });

});

function makeList(arr) {
  //console.log(arr.size);
  var temp ="";
  for (var [key, value] of arr) {
    temp += '<option value =\''+value+'\'>'
  }
  document.getElementById("browsers").innerHTML = temp;
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

function iterOrg() {
  return $.ajax({
          url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/ae/org',
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            for (var i =0; i < getData.Items.length; i++) {
              org.set(getData.Items[i].eventId.S,getData.Items[i].orgs.SS);
            }
            //console.log(interest);
          },
          error: function(xhr, textStatus, errorThrown) {
            console.log(xhr);
          }
  });
}
function opt(value) {
  if (value == "Keyword") {
    makeList(interest);
    sessionStorage.setItem("search","int"); 
  } else if (value == "Organization") {
    makeList(org);
    sessionStorage.setItem("search","org");
  } else if(value == "Location") {
    sessionStorage.setItem("search","loc");
  }
  console.log(value);

}
function submit() {
  var ser = sessionStorage.getItem("search");
  var temp = document.getElementById("search").value;
  shareArr = [];
  if (ser == 'int') {
    for (var [key, value] of interest) {
      if (temp == value) {
        shareArr.push(key);
      }
    }
  } else if (ser == 'org') {
    for (var [key, value] of org) {
      if (temp == value) {
        shareArr.push(temp);
      }
    }
    shareArr = remove_duplicates_es6(shareArr);
    $.when(iterOrgEvents()).done(function() {
      iterURL(shareEvents);
    });
  }
  console.log(shareArr);

}

function iterOrgEvents() {
  //console.log('iterEvents');
  //$.each(shareArr, function (index, value) {
    //console.log(shareArr);
    return $.ajax({
        url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/relatedorgs/'+encodeURIComponent(shareArr[0]),
        method: 'GET',
        dataType: 'json',
        success: function(getData) {
          for (var i = 0; i < getData.Items.length; i++) {
            shareEvents.push(getData.Items[i]);
          }
        },
        error: function() {
          console.log('error loading data');
        }
    });
  //});
}

function remove_duplicates_es6(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
}

function iterURL(arr) {
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
  var contents ="";
  for (var i = 0; i < arr.length; i++) {
    contents += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">'+'<div class="event-tile">'+
    '<h5>'+arr[i].title.S+'</h5>'+
    '<p>'+ arr[i].description.S+'</p>'+
    '<div class="right">'+'<button onclick=more(\''+arr[i].eventId.S+'\') class="your-event">'+"more..."+'</button>'+'</div>'+
    '</div>'+'</div>';
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
  sessionStorage.removeItem("search");
	window.location.replace("myevents.html");
}