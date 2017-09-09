
var organizationId;

$( document ).ready(function() {
  $.ajax({
          url:'https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organization/1',
          method: 'GET',
          dataType: 'json',
          success: function(getData) {
            organizationId = getData.Items[0].organization.S;
            console.log(organizationId);
            document.getElementById("event-name").innerHTML = getData.Items[0].eventname.S;
            document.getElementById("desc").innerHTML = getData.Items[0].description.S;
          },
          error: function() {
            console.log('error loading data');
          }
  });
  $('#more').on('click', function() {
    sessionStorage.setItem("id",organizationId);
    window.location.replace("eventProfile.html");
  });
});

function getOrganizationId() {
  console.log(organizationId);
  return organizationId;
}