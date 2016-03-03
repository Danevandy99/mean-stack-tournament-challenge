'use strict';

var app = require('../..');
import request from 'supertest';

var newRankings;

describe('Rankings API:', function() {

  describe('GET /api/rankings', function() {
    var rankingss;

    beforeEach(function(done) {
      request(app)
        .get('/api/rankings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          rankingss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      rankingss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/rankings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rankings')
        .send({
          name: 'New Rankings',
          info: 'This is the brand new rankings!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRankings = res.body;
          done();
        });
    });

    it('should respond with the newly created rankings', function() {
      newRankings.name.should.equal('New Rankings');
      newRankings.info.should.equal('This is the brand new rankings!!!');
    });

  });

  describe('GET /api/rankings/:id', function() {
    var rankings;

    beforeEach(function(done) {
      request(app)
        .get('/api/rankings/' + newRankings._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          rankings = res.body;
          done();
        });
    });

    afterEach(function() {
      rankings = {};
    });

    it('should respond with the requested rankings', function() {
      rankings.name.should.equal('New Rankings');
      rankings.info.should.equal('This is the brand new rankings!!!');
    });

  });

  describe('PUT /api/rankings/:id', function() {
    var updatedRankings;

    beforeEach(function(done) {
      request(app)
        .put('/api/rankings/' + newRankings._id)
        .send({
          name: 'Updated Rankings',
          info: 'This is the updated rankings!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRankings = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRankings = {};
    });

    it('should respond with the updated rankings', function() {
      updatedRankings.name.should.equal('Updated Rankings');
      updatedRankings.info.should.equal('This is the updated rankings!!!');
    });

  });

  describe('DELETE /api/rankings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/rankings/' + newRankings._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when rankings does not exist', function(done) {
      request(app)
        .delete('/api/rankings/' + newRankings._id)
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
