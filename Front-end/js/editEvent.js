
$(window).bind("load", function() { 
  var id = sessionStorage.getItem("editId");
  $.ajax({
          url:'https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organization/'
          +encodeURIComponent(id),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            document.getElementById("name").innerHTML = getData.Items[0].eventname.S;
            document.getElementById("desc").innerHTML = getData.Items[0].description.S;
            document.getElementById("skill").innerHTML = getData.Items[0].skills.S;
          },
          error: function(xhr, textStatus, errorThrown) {
            console.log(xhr);
            console.log(errorThrown);
          }
    });
  $('#back').on('click', function() {
    sessionStorage.removeItem("editId");
    window.location.replace("eventProfile.html");
  });
  $('#edit').on('click', function() {
    var username = sessionStorage.getItem("username");
    var eventname = document.getElementById("name").value;
    var skills = document.getElementById("skill").value;
    var desc = document.getElementById("desc").value;
    console.log('user: '+ username);
    if (eventname == "") {
      alert("missing event name");
    } else if (desc == "") {
      alert("missing event description");
    } else if (skills == "") {
      alert("missing preferred skills");
    } else {
      var num = id.toString();
      var events = {
                "address": "2445 dooley drive",
                "description": desc,
                "eventname": eventname,
                "organization": num,
                "skills": skills,
                "username": username
              }
        $.ajax({
            type: "POST",
            data :JSON.stringify(events),
            url: "https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organization",
            contentType: "application/json"
        });
        alert('edited');
        sessionStorage.removeItem("editId");
        window.location.replace("eventProfile.html");
    }
  });
});