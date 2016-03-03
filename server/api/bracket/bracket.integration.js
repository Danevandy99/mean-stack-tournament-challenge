'use strict';

var app = require('../..');
import request from 'supertest';

var newBracket;

describe('Bracket API:', function() {

  describe('GET /api/brackets', function() {
    var brackets;

    beforeEach(function(done) {
      request(app)
        .get('/api/brackets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          brackets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      brackets.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/brackets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/brackets')
        .send({
          name: 'New Bracket',
          info: 'This is the brand new bracket!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBracket = res.body;
          done();
        });
    });

    it('should respond with the newly created bracket', function() {
      newBracket.name.should.equal('New Bracket');
      newBracket.info.should.equal('This is the brand new bracket!!!');
    });

  });

  describe('GET /api/brackets/:id', function() {
    var bracket;

    beforeEach(function(done) {
      request(app)
        .get('/api/brackets/' + newBracket._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bracket = res.body;
          done();
        });
    });

    afterEach(function() {
      bracket = {};
    });

    it('should respond with the requested bracket', function() {
      bracket.name.should.equal('New Bracket');
      bracket.info.should.equal('This is the brand new bracket!!!');
    });

  });

  describe('PUT /api/brackets/:id', function() {
    var updatedBracket;

    beforeEach(function(done) {
      request(app)
        .put('/api/brackets/' + newBracket._id)
        .send({
          name: 'Updated Bracket',
          info: 'This is the updated bracket!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBracket = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBracket = {};
    });

    it('should respond with the updated bracket', function() {
      updatedBracket.name.should.equal('Updated Bracket');
      updatedBracket.info.should.equal('This is the updated bracket!!!');
    });

  });

  describe('DELETE /api/brackets/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/brackets/' + newBracket._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bracket does not exist', function(done) {
      request(app)
        .delete('/api/brackets/' + newBracket._id)
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
