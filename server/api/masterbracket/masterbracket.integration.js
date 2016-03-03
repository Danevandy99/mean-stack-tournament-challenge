'use strict';

var app = require('../..');
import request from 'supertest';

var newMasterbracket;

describe('Masterbracket API:', function() {

  describe('GET /api/masterbracket', function() {
    var masterbrackets;

    beforeEach(function(done) {
      request(app)
        .get('/api/masterbracket')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          masterbrackets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      masterbrackets.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/masterbracket', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/masterbracket')
        .send({
          name: 'New Masterbracket',
          info: 'This is the brand new masterbracket!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMasterbracket = res.body;
          done();
        });
    });

    it('should respond with the newly created masterbracket', function() {
      newMasterbracket.name.should.equal('New Masterbracket');
      newMasterbracket.info.should.equal('This is the brand new masterbracket!!!');
    });

  });

  describe('GET /api/masterbracket/:id', function() {
    var masterbracket;

    beforeEach(function(done) {
      request(app)
        .get('/api/masterbracket/' + newMasterbracket._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          masterbracket = res.body;
          done();
        });
    });

    afterEach(function() {
      masterbracket = {};
    });

    it('should respond with the requested masterbracket', function() {
      masterbracket.name.should.equal('New Masterbracket');
      masterbracket.info.should.equal('This is the brand new masterbracket!!!');
    });

  });

  describe('PUT /api/masterbracket/:id', function() {
    var updatedMasterbracket;

    beforeEach(function(done) {
      request(app)
        .put('/api/masterbracket/' + newMasterbracket._id)
        .send({
          name: 'Updated Masterbracket',
          info: 'This is the updated masterbracket!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMasterbracket = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMasterbracket = {};
    });

    it('should respond with the updated masterbracket', function() {
      updatedMasterbracket.name.should.equal('Updated Masterbracket');
      updatedMasterbracket.info.should.equal('This is the updated masterbracket!!!');
    });

  });

  describe('DELETE /api/masterbracket/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/masterbracket/' + newMasterbracket._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when masterbracket does not exist', function(done) {
      request(app)
        .delete('/api/masterbracket/' + newMasterbracket._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
