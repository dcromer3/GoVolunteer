var count = 0;


function myEvents() {
	window.location.replace("govolunteer.html");
}
function logout() {
	sessionStorage.removeItem("username");
	window.location.replace("login.html");
}
function createEvents() {
	/*
	var username = sessionStorage.getItem("username");
	var eventname = document.getElementById("name").value;
	var skills = document.getElementById("skill").value;
	var desc = document.getElementById("desc").value;
	console.log('user: '+ username);
	$.when(ajax1()).done(function() {
		console.log(eventname);
		 if (eventname == "") {
		 	alert("missing event name");
		} else if (desc == "") {
			alert("missing event description");
		} else if (skills == "") {
			alert("missing preferred skills");
		} else {
			var eventId = count.toString();
			var events = {
					  "eventId": eventId,
					  "description": desc,
					  "date": "10-03-17",
					  "location": "2445 dooley drive",
					  "orgs": {username},
					  "title": eventname,
					  "users": "0",
					  "skill": {skills}
					}
		    $.ajax({
		        type: "POST",
		        data :JSON.stringify(events),
		        url: "https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event",
		        contentType: "application/json"
		    });
    	}
    });*/
	var username = sessionStorage.getItem("username");
	var eventname = document.getElementById("name").value;
	var skills = document.getElementById("skill").value;
	var desc = document.getElementById("desc").value;
	var addr = document.getElementById("address").value;

	console.log('user: '+ username);
	$.when(ajax1()).done(function() {
		console.log(eventname);
		 if (eventname == "") {
		 	alert("missing event name");
		} else if (desc == "") {
			alert("missing event description");
		} else if (skills == "") {
			alert("missing preferred skills");
		} else {
			var num = count.toString();
			console.log(num);
			var events = {
							  "address": "2445 dooley drive",
							  "description": desc,
							  "eventname": eventname,
							  "organization": num,
							  "username": username,
							  "skills": skills
							}
		    $.ajax({
		        type: "POST",
		        data :JSON.stringify(events),
		        url: "https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organization",
		        contentType: "application/json"
		    });
		    alert('created');
		    window.location.replace("govolunteer.html");
		}
  	});
	
}

function ajax1() {
	var username = sessionStorage.getItem("username");
	return $.ajax({
      url:'https://u27x0no4t5.execute-api.us-east-1.amazonaws.com/organization/organizationsinfo',
      method: 'GET',
      dataType: 'json',
      success: function(getData) {
      	count = getData.Items.length + 1;
      },
      error: function() {
        console.log('error loading data');
      }
  	});
}