//var count = 0;
function createId() {
	$.when(ajax2()).done(function() {
		alert('created');
		back();
	});
	
}
function ajax2() {
	//console.log(count);
	var userId = document.getElementById("userid").value;
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;
	var events = {
					  "email": email,
					  "name": username,
					  "password": password,
					  "phone": phone,
					  "userid": userId,
					  "dob":"12-08-94"
					}
	return $.ajax({
	        type: "POST",
	        data :JSON.stringify(events),
	        //url: "https://lce4l1fcek.execute-api.us-east-1.amazonaws.com/user/userid",
	        url:"https://wouuuekpxj.execute-api.us-east-1.amazonaws.com/beta/volunteer",
	        contentType: "application/json"
	});
}

function ajax1() {
	return $.ajax({
      url:'https://lce4l1fcek.execute-api.us-east-1.amazonaws.com/user/usersinfo',
      method: 'GET',
      dataType: 'json',
      success: function(getData) {
      	count = getData.userids.length + 1;
      },
      error: function() {
        console.log('error loading data');
      }
  	});
}

function back() {
	  window.location.replace("login.html");
}