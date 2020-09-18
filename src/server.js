import app from './app';
var stress = require('stress-node');
stress({
	url: 'http://google.com',
	method: 'GET',
	amount: 1000,
	timeout: 60000, 
	concurrent: 5,
	data: null,
}, function(report) {
});

app.listen(3333);
