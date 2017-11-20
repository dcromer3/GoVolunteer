function postImage(element){

	String image = imageToBase64(this.element)

	String url = 'https://f5orbudj49.execute-api.us-east-1.amazonaws.com/image/event';

	$.ajax(){
          url:'https://f5orbudj49.execute-api.us-east-1.amazonaws.com/image/event'
          method: 'POST',
          dataType: 'json',
        /**  success: function(getData) {
            image;
            
          },
          error: function() {
            console.log('error loading data');
          **/
      }
  };
	}
}