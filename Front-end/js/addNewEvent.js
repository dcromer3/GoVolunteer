function myEvents() {
	window.location.replace("govolunteer.html");
}
function logout() {
	sessionStorage.removeItem("username");
	window.location.replace("login.html");
}