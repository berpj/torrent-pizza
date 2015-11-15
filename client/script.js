$(function(){  
  $('#submit').click(function(e){
    e.preventDefault();
    console.log('Post info hash');

    hash = $('#torrent').val();
    
    $('#player').html('<source src="http://api.pizza.bergeron.io/video/' + hash + '" type="video/mp4">');
  });
});
