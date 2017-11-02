var eventsArr = [];
var interest = new Map();
var org = new Map();
var options;
var shareArr = [];
var shareEvents = [];
var loc = new Map();
var locState = [];
var locCity = [];
var state;
var city;

$( document ).ready(function() {
  username = sessionStorage.getItem("username");
  console.log('username: ' + username);
  $.when(ajax2(),iterInt(),iterOrg()).done(function() {
    if (eventsArr.length != 0) {
      iterURL(eventsArr);
    }
  });
  $("#city").on("change", city);
  $("#state").on("change", state);
});


function state() {
  var temp = document.getElementById("state").value;
  state = temp;
  console.log(state);
}
function city() {
  var temp = document.getElementById("city").value;
  city = temp;
  console.log(city);
}
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
function iterLoc() {
  return $.ajax({
          url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/ae/loc',
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            for (var i =0; i < getData.Items.length; i++) {
              loc.set(getData.Items[i].eventId.S, getData.Items[i].location.S);
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
    search.style.display = "block";
    s.style.display = "none";
    c.style.display = "none";
    makeList(interest);
    $("#search").attr("placeholder", "Type what you interested").blur();
    sessionStorage.setItem("search","int"); 
  } else if (value == "Organization") {
    search.style.display = "block";
    s.style.display = "none";
    c.style.display = "none";
    makeList(org);
    $("#search").attr("placeholder", "Type a organization name").blur();
    sessionStorage.setItem("search","org");
  } else if(value == "Location") {
    //getLocation();
    search.style.display = "none";
    s.style.display = "block";
    c.style.display = "block";
    sessionStorage.setItem("search","loc");
    $.when(iterLoc()).done(function() {
      makeListLoc();
    });
  }
  console.log(value);

}
function makeListLoc() {
  for (var [key, value] of loc) {
      var str = JSON.stringify(value);
      locState.push(str.split(",")[2]);
      locCity.push(str.split(",")[1]);
  }
  locState = remove_duplicates_es6(locState);
  locCity = remove_duplicates_es6(locCity);
  //console.log(locState);
  makeOption();

}
function makeOption() {
  var options = '<option disabled selected value>'+ '--  select an state --'+'</option>';
  for (var i = 0; i < locState.length; i++) {
    options += '<option value =\''+locState[i]+'\'>'+locState[i]+'</option>'
  }
  document.getElementById("state").innerHTML = options;
  options = '';
  options = '<option disabled selected value>'+ '--  select an city --'+'</option>';
  for (var i = 0; i < locCity.length; i++) {
    options += '<option value =\''+locCity[i]+'\'>'+locCity[i]+'</option>'
  }
  document.getElementById("city").innerHTML = options;
  //options = '';
}

function submit() {
  var ser = sessionStorage.getItem("search");
  var temp = document.getElementById("search").value;
  shareArr = [];
  shareEvents = [];
  //locState = [];
  //locCity = [];
  if (ser == 'int') {
    for (var [key, value] of interest) {
      var str = JSON.stringify(value);
      if (str.includes(temp)) {
        shareArr.push(key);
      }
    }

    tempF();
    $(document).ajaxStop(function(){
      iterURL(shareEvents);
    });
    
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
  } else if (ser == 'loc') {
    for (var [key, value] of loc) {
      var str = JSON.stringify(value);
      if (str.includes(state) && str.includes(city)) {
        shareArr.push(key);
      }
    }
    tempF();
    $(document).ajaxStop(function(){
      iterURL(shareEvents);
    });
  }

}
function tempF() {
  $.each(shareArr, function (index, value) {
    //console.log(value);
    $.ajax({
        url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/'+encodeURIComponent(value),
        method: 'GET',
        dataType: 'json',
        success: function(getData) {
          //console.log('iter');
          shareEvents.push(getData.Items[0]);
          //return(getData.Items[0]);
        },
        error: function() {
          console.log('error loading data');
        }
    });
  });
}

function iterOrgEvents() {
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
    '<p class="hidden">'+ arr[i].description.S+'</p>'+
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
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function back() {
	sessionStorage.removeItem("registerId");
  sessionStorage.removeItem("search");
	window.location.replace("myevents.html");
}