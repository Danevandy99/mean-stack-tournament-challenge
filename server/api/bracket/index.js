'use strict';

var express = require('express');
var controller = require('./bracket.controller');

var router = express.Router();

router.get('/stats', controller.stats);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/create_success', function(req, res) {
	console.log(req.body);
	res.redirect('http://' + req.headers.host + '/createbracket?payment_status=' + req.body.payment_status + '&payer_id=' + req.body.payer_id + '&txn_id=' + req.body.txn_id);
});

module.exports = router;
