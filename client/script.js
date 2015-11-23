$(function(){
  var api = 'api.pizza.bergeron.io';
  
  $('#input').on('input', function(e){
    if ($('#input').val().length > 0)
      $('#instructions').show();
    else
      $('#instructions').hide();
  });
  
  $('form').submit(function(e){
    e.preventDefault();
    
    $('form').hide();
    
    $('#player-holder').html('<video id="player" autoplay="true" controls></video>');
    
    $('#console').html('Starting...');
    $('#console').show();

    hash = $('#input').val();
    
    $.get('http://' + api + '/add/' + hash, function(data) {
      $.get('http://' + api + '/metadata/' + hash, function(data) {
        console.log(data);
        
        window.location.hash = data.torrent
        
        $('#console').html(data.name.substr(0, data.name.lastIndexOf('.')).split('.').join(' '));
        
        $('#player').html('<source src="http://' + api + '/stream/' + hash + '" type="video/mp4">');
      });
    });
  });
  
  if (window.location.hash) {
    $('#input').val(window.location.hash.substr(window.location.hash.indexOf('#')+1));
    
    $('form').submit();
  }
});
