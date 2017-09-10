var organizationId;
var arr = [];


$( document ).ready(function() {
  
  $.when(ajax1()).done(function() {
    iterURL();
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
  $('#more4').on('click', function() {
    sessionStorage.setItem("id",4);
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
          console.log(getData.Items[i].organization.S);
          arr[i] = (getData.Items[i].organization.S);
          //console.log(arr);
        }
      },
      error: function() {
        console.log('error loading data');
      }
  });
}

function iterURL() {
  for (var i = 0; i <= arr.length; i++) {
    $.ajax({
          url:'https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organization/'
          +encodeURIComponent(arr[i]),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            if (getData.Items.length != 0) {
              organizationId = getData.Items[0].organization.S;
              var eventname = "eventname" + organizationId;
              var desc = "desc" + organizationId;
              console.log('organizationID : ' + organizationId);
              document.getElementById(eventname).innerHTML = getData.Items[0].eventname.S;
              document.getElementById(desc).innerHTML = getData.Items[0].description.S;
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

function getOrganizationId() {
  console.log(organizationId);
  return organizationId;
}