'use strict';

var express = require('express');
var controller = require('./news.controller');
var nodemailer = require('nodemailer');

var router = express.Router();

router.get('/', controller.index);
router.post('/sendemail', function(req, res) {
	var api_key = process.env.MG_API_KEY;
	var domain = 'vanderbilttournamentchallenge.com';
	console.log(api_key + domain);
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
	console.log(req.body.html);

	var data = {
		from: 'Vanderbilt Tournament Challenge <postmaster@vanderbilttournamentchallenge.com>',
		to: req.body.to,
		subject: req.body.subject,
		html: req.body.html
	};

	mailgun.messages().send(data, function (error, body) {
		console.log(error);
		console.log(body);
		res.json(body);
	});
});
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
