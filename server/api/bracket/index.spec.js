'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bracketCtrlStub = {
  index: 'bracketCtrl.index',
  show: 'bracketCtrl.show',
  create: 'bracketCtrl.create',
  update: 'bracketCtrl.update',
  destroy: 'bracketCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bracketIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bracket.controller': bracketCtrlStub
});

describe('Bracket API Router:', function() {

  it('should return an express router instance', function() {
    bracketIndex.should.equal(routerStub);
  });

  describe('GET /api/brackets', function() {

    it('should route to bracket.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bracketCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/brackets/:id', function() {

    it('should route to bracket.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bracketCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/brackets', function() {

    it('should route to bracket.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bracketCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/brackets/:id', function() {

    it('should route to bracket.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'bracketCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/brackets/:id', function() {

    it('should route to bracket.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'bracketCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/brackets/:id', function() {

    it('should route to bracket.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bracketCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
