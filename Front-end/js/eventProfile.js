
$(window).bind("load", function() { 
  //var organizationId = getOrganizationId();
  var id = sessionStorage.getItem("id");
  console.log(id);
  $.ajax({
          url:'https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organization/'
          +encodeURIComponent(id),
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            console.log(getData);
            document.getElementById("event-name").innerHTML = getData.Items[0].eventname.S;
            document.getElementById("desc").innerHTML = getData.Items[0].description.S;
            document.getElementById("skill").innerHTML = getData.Items[0].skills.S;
          },
          error: function() {
            console.log('error loading data');
          }
  });
  $('#back').on('click', function() {
    storage.removeItem("id");
    window.location.replace("govolunteer.html");
  });
});
