var express = require('express');
var router = express.Router();

var webtorrent = require('webtorrent');
var client = new webtorrent()

getMovie = function (torrent) {
	var file;
	
	for (i = 0; i < torrent.files.length; i++) {
		if (!file || file.length < torrent.files[i].length) {
			file = torrent.files[i];
		}
	}
	
	return file
}

router.get('/video/:magnet', function(req, res, next) {
	
	var magnetUri = 'magnet:?xt=urn:btih:' + req.params.magnet;
	
	client.add(magnetUri, function (torrent) {		
		var file = getMovie(torrent);
		var total = file.length;
		
		var range = req.headers.range;
		var parts = range.replace(/bytes=/, "").split("-");
		var partialstart = parts[0];
		var partialend = parts[1];
		var start = parseInt(partialstart, 10);
		var end = partialend ? parseInt(partialend, 10) : total - 1;
		var chunksize = (end - start) + 1;
		
		console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);
		
		var stream = file.createReadStream({start: start, end: end});
		res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
		stream.pipe(res);
	});
});

module.exports = router;
