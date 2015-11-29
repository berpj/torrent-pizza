$(function(){
  var api = 'api.torrent.pizza';
  
  $('#input').on('input', function(e){
    if ($('#input').val().length > 0)
      $('#instructions').show();
    else
      $('#instructions').hide();
  });
  
  $('form').submit(function(e){
    e.preventDefault();
    
    $('form').hide();
    $('h2').hide();
    $('#examples').hide();
    
    $('#player-holder').html('<video id="player" autoplay="true" controls></video>');
    
    $('#console').html('Starting...');
    $('#console').show();

    //magnet = $('#input').val().trim().replace('magnet:?xt=urn:btih:', '').substr(0, 40);
    
    magnet = encodeURIComponent($('#input').val().trim());
    
    $.get('https://' + api + '/add/' + magnet, function(data) {
      $.get('https://' + api + '/metadata/' + magnet, function(data) {
        console.log(data);
        
        window.location.hash = data.torrent
        
        $('#console').html(data.name.substr(0, data.name.lastIndexOf('.')).split('.').join(' '));
        
        $('#player').html('<source src="https://' + api + '/stream/' + magnet + '" type="video/mp4">');
      });
    });
  });
  
  if (window.location.hash) {
    $('#input').val(window.location.hash.substr(window.location.hash.indexOf('#')+1));
    
    $('form').submit();
  }
  
  $('.hash-link').on('click', function(){
    location.reload();
  });
});
