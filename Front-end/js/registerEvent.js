$(window).bind("load", function() { 
  //var organizationId = getOrganizationId();
  var username = sessionStorage.getItem("username");

  var id = sessionStorage.getItem("registerId");
  console.log('event id: ',id);
  $.ajax({
          url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/'
          +encodeURIComponent(id),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            console.log(getData);
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
    window.location.replace("browseevents.html");
  });

  $('#register').on('click', function() {
    var events = {
                "eventId": id,
                "user": username
              }
    var x = document.getElementById("required").checked 
    if (x == true) {
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
    } else {
      alert("Required skills needed");
    }
  });
});

function profile() {
  window.location.replace("organizationProfile.html");
}