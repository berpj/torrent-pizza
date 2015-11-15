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

router.get('/video/:hash', function(req, res, next) {
	
	var hash = req.params.hash;
	
	try {
		client.add(hash, function (torrent) {	
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
	}
	catch (err) {
		console.error('got error', err);
	}
});

router.get('/video-info/:hash', function(req, res, next) {
	
	var hash = req.params.hash;
	
	try {
		client.add(hash, function (torrent) {	
			var file = getMovie(torrent);
			
			res.json({ torrent: file.infoHash, name: file.name, size: file.length })
		});
	}
	catch (err) {
		console.error('got error', err);
	}
});

module.exports = router;
