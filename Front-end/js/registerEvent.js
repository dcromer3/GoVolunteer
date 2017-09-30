$(window).bind("load", function() { 
  //var organizationId = getOrganizationId();
  var username = sessionStorage.getItem("username");

  var id = sessionStorage.getItem("eventId");
  console.log('event id: ',id);
  $.ajax({
          url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/'
          +encodeURIComponent(id),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            document.getElementById("event-name").innerHTML = getData.Items[0].title.S;
            document.getElementById("desc").innerHTML = getData.Items[0].description.S;
            //document.getElementById("skill").innerHTML = getData.Items[0].skills.S;
          },
          error: function() {
            console.log('error loading data');
          }
  });
  $('#back').on('click', function() {
    sessionStorage.removeItem("eventId");
    window.location.replace("browseevents.html");
  });

  $('#register').on('click', function() {
    var events = {
                "eventId": id,
                "user": username
              }
    $.ajax({
            method: "PUT",
            data :JSON.stringify(events),
            url: 'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/addvol',
            contentType: "application/json",
            success: function() {
              
              var register = {
                "userId": username,
                "eventId": id
              }
              $.ajax({
                      method: "PUT",
                      data :JSON.stringify(register),
                      url: 'https://wouuuekpxj.execute-api.us-east-1.amazonaws.com/beta/volunteer/register',
                      contentType: "application/json",
                      success: function() {
                        window.location.replace("myevents.html");
                        //console.log(username);
                        //console.log(id);
                    },
                    error: function() {
                      console.log('error loading data');
                    }
              });
          },
          error: function() {
            console.log('error loading data');
          }
    });

  });
  $('#delete').on('click', function() {
    var deleteURL = "https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organizationdelete/"+encodeURIComponent(id); 
    $.ajax({
            method: "GET",
            dataType: 'json',
            url: deleteURL,
            contentType: "application/json",
            success: function() {
            alert('Deleted');
            window.location.replace("govolunteer.html");
          },
          error: function() {
            console.log('error loading data');
          }
        });
  });
});