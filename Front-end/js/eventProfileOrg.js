
$(window).bind("load", function() { 
  //var organizationId = getOrganizationId();
  var id = sessionStorage.getItem("eventId");
  var usersArr;
  console.log(id);
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
            usersArr = getData.Items[0].users;
            document.getElementById("event-name").innerHTML = getData.Items[0].title.S;
            document.getElementById("desc").innerHTML = getData.Items[0].description.S;
            document.getElementById("skill").innerHTML = getData.Items[0].skill.SS;
            document.getElementById("date").innerHTML = getData.Items[0].date.S;
            document.getElementById("location").innerHTML = getData.Items[0].location.S;
          },
          error: function() {
            console.log('error loading data');
          }
  });
  $('#back').on('click', function() {
    sessionStorage.removeItem("eventId");
    window.location.replace("govolunteer.html");
  });
  $('#edit').on('click', function() {
    sessionStorage.setItem("editId",id);
    window.location.replace("editEvent.html");
  });

  $('#delete').on('click', function() {
    var deleteUser;
    if (usersArr.length > 1) {
      deleteUser = usersArr[1];
    }
    var deleteEvent = {
                        "eventId": id,
                      }
    $.ajax({
            method: "DELETE",
            data :JSON.stringify(deleteEvent),
            url: "https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event",
            contentType: "application/json",
            success: function() {
              var deleteUser = {
                        "eventId": id,
                        "userId": deleteUser
                      }
              $.ajax({
                      method: "DELETE",
                      data :JSON.stringify(deleteUser),
                      url: "https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/relatedusers",
                      contentType: "application/json",
                      success: function() {
                        sessionStorage.removeItem("eventId");
                        alert('Deleted');
                        window.location.replace("govolunteer.html");
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
