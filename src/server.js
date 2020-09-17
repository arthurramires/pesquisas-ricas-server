import app from './app';
var stress = require('stress-node');
stress({
	url: 'http://google.com',
	method: 'GET',
	amount: 1000,
	concurrent: 5,
	data: null,
	progress: function(report) {
	}
}, function(report) {
});

app.listen(3333);
