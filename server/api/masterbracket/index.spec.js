'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var masterbracketCtrlStub = {
  index: 'masterbracketCtrl.index',
  show: 'masterbracketCtrl.show',
  create: 'masterbracketCtrl.create',
  update: 'masterbracketCtrl.update',
  destroy: 'masterbracketCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var masterbracketIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './masterbracket.controller': masterbracketCtrlStub
});

describe('Masterbracket API Router:', function() {

  it('should return an express router instance', function() {
    masterbracketIndex.should.equal(routerStub);
  });

  describe('GET /api/masterbracket', function() {

    it('should route to masterbracket.controller.index', function() {
      routerStub.get
        .withArgs('/', 'masterbracketCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/masterbracket/:id', function() {

    it('should route to masterbracket.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'masterbracketCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/masterbracket', function() {

    it('should route to masterbracket.controller.create', function() {
      routerStub.post
        .withArgs('/', 'masterbracketCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/masterbracket/:id', function() {

    it('should route to masterbracket.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'masterbracketCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/masterbracket/:id', function() {

    it('should route to masterbracket.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'masterbracketCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/masterbracket/:id', function() {

    it('should route to masterbracket.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'masterbracketCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
