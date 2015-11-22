$(function(){
  var api = 'api.pizza.bergeron.io';
  
  $('#submit').click(function(e){
    e.preventDefault();
    
    $('#console').append('Starting...<br>');

    hash = $('#torrent').val();
    
    $.get('http://' + api + '/video-info/' + hash, function(data) {
      console.log(data);
      
      window.location.hash = data.torrent
      
      $('#player').html('<source src="http://' + api + '/video/' + hash + '" type="video/mp4">');
    });
  });
  
  if (window.location.hash) {
    $('#torrent').val(window.location.hash.substr(window.location.hash.indexOf('#')+1));
    
    $('#console').append('Starting...<br>');
    
    hash = $('#torrent').val();
    
    $.get('http://' + api + '/video-info/' + hash, function(data) {
      console.log(data);
      
      window.location.hash = data.torrent
      
      $('#player').html('<source src="http://' + api + '/video/' + hash + '" type="video/mp4">');
      
      $('#console').append('Streaming ' + data.name + ' (' + (data.size / (1024 * 1024)).toFixed(2) + ' MB)<br>');
    });
  }
});
