$(function(){				
  $('#submit').click(function(e){
    e.preventDefault();
    console.log('Post magnet uri');

    magnetUri = $('#magnet').val();
    
    $('#player').html('<source src="http://localhost:3000/video/' + magnetUri + '" type="video/mp4">');
  });
});
