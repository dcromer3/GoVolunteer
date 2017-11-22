var count = 0;


function myEvents() {
	window.location.replace("govolunteer.html");
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
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var zip = document.getElementById("zip").value;
	var Interests = document.getElementById("Interests").value;
	var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

	console.log('user: '+ username);
	$.when(ajax1()).done(function() {
		//console.log(eventname);
		 if (eventname == "") {
		 	alert("missing event name");
		} else if (desc == "") {
			alert("missing event description");
		} else if (skills == "") {
			alert("missing preferred skills");
		} else {
			//var num = count.toString();
			//console.log(num);
			console.log(desc);
			console.log(utc);
			console.log(addr);
			console.log(city);
			console.log(state);
			console.log(zip);
			console.log(username);
			console.log(eventname);
			console.log(skills);
			console.log(Interests);

			var events = {
							  "description": desc,
							  "date": utc,
							  "address": addr,
							  "city": city,
							  "state":state,
							  "zipcode":zip,
							  "orgs": username,
							  "title": eventname,
							  "skill": skills,
							  "interest": Interests
							}
		    $.ajax({
		        type: "POST",
		        data :JSON.stringify(events),
		        url: "https://2ps02w2mjj.execute-api.us-east-1.amazonaws.com/beta/event",
		        contentType: "application/json",
		        success: function() {
                    alert('created');
		    		window.location.replace("govolunteer.html");
                },
                error: function() {
                  console.log('error loading data');
                }
		    });
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