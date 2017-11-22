var emailArr = [];
$(window).bind("load", function() { 
  //var organizationId = getOrganizationId();
  var id = sessionStorage.getItem("eventId");
  var usersArr;
  console.log(id);
  var contents ='<a href='+"mailto:";
  $.when(getEmail(id)).done(function() {
    console.log(emailArr);
    if (emailArr.length != 0) {
      for (var i = 0; i < emailArr.length; i++) {
        contents += emailArr[i] +','
      }
      contents += '?Subject=[GoVolunteer] target="_top">' + 'Email to volunteers' + "</a>"
      document.getElementById("contact").innerHTML = contents;
    }
  });

  $.ajax({
          url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/'
          +encodeURIComponent(id),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            //console.log(getData);
            usersArr = getData.Items[0].users.SS;
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
      alert(deleteUser);
    }
      var deleteUser = {
                "eventId": id,
                "userId": deleteUser
              }
      $.ajax({ // ----> has problem
              method: "DELETE",
              data :JSON.stringify(deleteUser),
              url: 'https://wouuuekpxj.execute-api.us-east-1.amazonaws.com/beta/volunteer/register',
              contentType: "application/json",
              success: function() {

                var deleteEvent = {
                                    "eventId": id,
                                  }
                $.ajax({
                        method: "DELETE",
                        data :JSON.stringify(deleteEvent),
                        url: "https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event",
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

function getEmail(id) {
  return $.ajax({
          url:'https://wouuuekpxj.execute-api.us-east-1.amazonaws.com/beta/organization/ae/'
          +encodeURIComponent(id),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            console.log(getData);
            numberOfuser = getData.Items.length;
            if (numberOfuser == 0) {
              document.getElementById("contact").innerHTML = "N/A";
            } else {
              for (var i = 0; i < getData.Items.length; i++) {
                emailArr.push(getData.Items[i].email.S);
              }
            }
          },
          error: function() {
            console.log('error loading data');
          }
  });
}
