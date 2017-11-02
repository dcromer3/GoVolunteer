function logOut() {
    sessionStorage.removeItem("registerId");
    sessionStorage.removeItem("search");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("eventId");
    sessionStorage.removeItem("editId");
    window.location.replace("login.html");
}