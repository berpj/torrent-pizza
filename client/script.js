$(function(){  
  $('#submit').click(function(e){
    e.preventDefault();

    hash = $('#torrent').val();
    
    $('#player').html('<source src="http://api.pizza.bergeron.io/video/' + hash + '" type="video/mp4">');
    
    $.get('http://api.pizza.bergeron.io/video-info/' + hash, function(data) {
      console.log(data);
      
      window.location.hash = data.torrent
    });
  });
  
  if (window.location.hash) {
    hash = $('#torrent').val();
    
    $('#player').html('<source src="http://api.pizza.bergeron.io/video/' + hash + '" type="video/mp4">');
    
    $.get('http://api.pizza.bergeron.io/video-info/' + hash, function(data) {
      console.log(data);
      
      window.location.hash = data.torrent
    });
  }
});
