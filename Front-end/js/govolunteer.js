var organizationId;


$( document ).ready(function() {
  $.getJSON('https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organization/'
    +encodeURIComponent(0),
    function(data,err) {
      if (data !== null) {
        console.log('DB access : '+ err);
        iterURL();
      } else {
        console.log('DB is empty');
      }
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

function iterURL() {

  //while (true) {
  for (var i = 1; i < 5; i++) {
    $.ajax({
          url:'https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organization/'
          +encodeURIComponent(i),
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