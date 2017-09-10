var organizationId;
var arr = [];
var userArr = [];
var username;

$( document ).ready(function() {
  username = sessionStorage.getItem("username");
  console.log('username: ' + username);
  $.when(ajax2()).done(function() {
    if (userArr.length != 0) {
      iterURL();
    }
  });
  $('#more0').on('click', function() {
    sessionStorage.setItem("id",0);
    window.location.replace("eventProfile.html");
  });
  $('#more1').on('click', function() {
    sessionStorage.setItem("id",1);
    window.location.replace("eventProfile.html");
  });
  $('#more2').on('click', function() {
    sessionStorage.setItem("id",2);
    window.location.replace("eventProfile.html");
  });
  $('#more3').on('click', function() {
    sessionStorage.setItem("id",3);
    window.location.replace("eventProfile.html");
  });

});

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
              console.log('organizationID : ' + organizationId);
              document.getElementById(eventname).innerHTML = getData.Items[0].eventname.S;
              document.getElementById(desc).innerHTML = getData.Items[0].description.S;
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


function getOrganizationId() {
  console.log(organizationId);
  return organizationId;
}