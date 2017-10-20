
$(window).bind("load", function() { 
  //var organizationId = getOrganizationId();
  var id = sessionStorage.getItem("registerId");
  console.log(id);
  var username = sessionStorage.getItem("username");
  console.log(username);

  $.ajax({
          /*url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/'
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
          }*/
          url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/'
          +encodeURIComponent(id),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            document.getElementById("event-name").innerHTML = getData.Items[0].title.S;
            document.getElementById("desc").innerHTML = getData.Items[0].description.S;
            document.getElementById("skill").innerHTML = getData.Items[0].skill.SS;
            document.getElementById("date").innerHTML = getData.Items[0].date.S;
            document.getElementById("location").innerHTML = getData.Items[0].location.S;
            document.getElementById("Interests").innerHTML = getData.Items[0].interest.SS;
          },
          error: function() {
            console.log('error loading data');
          }
  });
  $('#back').on('click', function() {
    sessionStorage.removeItem("registerId");
    window.location.replace("myevents.html");
  });

  $('#Unregister').on('click', function() {
    var events = {
                "eventId": id,
                "userId": username
              }
    $.ajax({
            method: "DELETE",
            data :JSON.stringify(events),
            url: 'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/relatedusers',
            contentType: "application/json",
            success: function() {
              var register = {
                "userId": username,
                "eventId": id
              }
              $.ajax({
                      method: "DELETE",
                      data :JSON.stringify(register),
                      url: 'https://wouuuekpxj.execute-api.us-east-1.amazonaws.com/beta/volunteer/register',
                      contentType: "application/json",
                      success: function() {
                        sessionStorage.removeItem("registerId");
                        alert('Deleted');
                        window.location.replace("myevents.html");
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
});
