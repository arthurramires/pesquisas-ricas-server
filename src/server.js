import app from './app';
var stress = require('stress-node');
stress({
	url: 'http://google.com',
	method: 'GET',
	amount: 6000,
	timeout: 600000, 
	concurrent: 30,
	data: null,
}, function(report) {
});

app.listen(3333);
