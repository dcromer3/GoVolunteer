
$(window).bind("load", function() { 
  var id = sessionStorage.getItem("editId");
  var utc;
  var eventId;
  $.ajax({
          url:'https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event/'
          +encodeURIComponent(id),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            eventId = getData.Items[0].eventId.S;
            document.getElementById("name").innerHTML = getData.Items[0].title.S;
            document.getElementById("desc").innerHTML = getData.Items[0].description.S;
            document.getElementById("skill").innerHTML = getData.Items[0].skill.SS;
            document.getElementById("date").innerHTML = getData.Items[0].date.S;
            utc = getData.Items[0].date.S;
            document.getElementById("location").innerHTML = getData.Items[0].location.S;
            document.getElementById("interest").innerHTML = getData.Items[0].interest.SS;

          },
          error: function(xhr, textStatus, errorThrown) {
            console.log(xhr);
            console.log(errorThrown);
          }
  });
  $('#back').on('click', function() {
    sessionStorage.removeItem("editId");
    window.location.replace("eventProfileOrg.html");
  });
  $('#edit').on('click', function() {
    var location = document.getElementById("location").value;
    var temp = new Array();
    temp = location.split(",");
    console.log(temp);
    var username = sessionStorage.getItem("username");
    var eventname = document.getElementById("name").value;
    var skills = document.getElementById("skill").value;
    var desc = document.getElementById("desc").value;
    var interest = document.getElementById("interest").value;
    var addr = temp[0];
    var city = temp[1];
    var state = temp[2];
    var zip = temp[3];
    console.log('user: '+ username);
    if (eventname == "") {
      alert("missing event name");
    } else if (desc == "") {
      alert("missing event description");
    } else if (skills == "") {
      alert("missing preferred skills");
    } else {
      var events = {
                      "eventId": eventId,
                      "description": desc,
                      "date": utc,
                      "address": addr,
                      "city": city,
                      "state":state,
                      "zipcode":zip,
                      "orgs": username,
                      "title": eventname,
                      "skill": skills,
                      "interest": interest
                    }
      $.ajax({
          type: "POST",
          data :JSON.stringify(events),
          url: "https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event",
          contentType: "application/json",
          success: function() {
            alert('edited');
            sessionStorage.removeItem("editId");
            window.location.replace("eventProfileOrg.html");
          },
          error: function() {
            console.log('error loading data');
          }
      });
    }
  });
});