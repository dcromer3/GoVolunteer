function encodeImageToBase64(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    return reader.result;
  }
  reader.readAsDataURL(file);
}