
$(window).bind("load", function() { 
  //var organizationId = getOrganizationId();
  var id = sessionStorage.getItem("eventId");
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
    window.location.replace("myevents.html");
  });

  $('#delete').on('click', function() {
    sessionStorage.removeItem("eventId");
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
