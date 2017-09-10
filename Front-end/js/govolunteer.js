var organizationId;
var arr = [];
var userArr = [];
var username;
var moreId;

$( document ).ready(function() {
  username = sessionStorage.getItem("username");
  console.log('username: ' + username);
  $.when(ajax2()).done(function() {
    if (userArr.length != 0) {
      iterURL();
    }
  });
});

function more(hid) {
    console.log(hid);
  var id = document.getElementById("desc0").value;

  console.log(id);
  //sessionStorage.setItem("moreId",id);
  //window.location.replace("eventProfile.html");
}

function ajax1() {
  return $.ajax({
      url:'https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organizationsinfo/',
      method: 'GET',
      dataType: 'json',
      success: function(getData) {
        for (var i = 0; i < getData.Items.length; i++) {
          arr[i] = (getData.Items[i].organization.S);
          //console.log(arr);
        }
      },
      error: function() {
        console.log('error loading data');
      }
  });
}

function ajax2() {
  return $.ajax({
      url:'https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/username/',
      method: 'GET',
      dataType: 'json',
      success: function(getData) {
        for (var i = 0; i < getData.Items.length; i++) {
          //userArr[i] = (getData.Items[i].username.S);
          if (username == getData.Items[i].username.S) {
            userArr.push(getData.Items[i].organization.S);
          }
        }
      },
      error: function() {
        console.log('error loading data');
      }
  });
}

function iterURL() {
  var temp = 0;
  for (var i = 0; i < userArr.length; i++) {
    $.ajax({
          url:'https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organization/'
          +encodeURIComponent(userArr[i]),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            if (getData.Items.length != 0) {
              organizationId = getData.Items[0].organization.S;
              var eventname = "eventname" + temp;
              var desc = "desc" + temp;
              var hid = "hid" + temp;
              console.log('organizationID : ' + organizationId);
              document.getElementById(eventname).innerHTML = getData.Items[0].eventname.S;
              document.getElementById(desc).innerHTML = getData.Items[0].description.S;
              document.getElementById(hid).innerHTML = organizationId;
              temp += 1;
            } else {
              //break;
            }
          },
          error: function() {
            console.log('error loading data');
            //break;
          }
    });
  }
}
function back() {
  window.location.replace("addNewEvent.html");
}
