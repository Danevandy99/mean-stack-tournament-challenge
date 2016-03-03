'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var rankingsCtrlStub = {
  index: 'rankingsCtrl.index',
  show: 'rankingsCtrl.show',
  create: 'rankingsCtrl.create',
  update: 'rankingsCtrl.update',
  destroy: 'rankingsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rankingsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './rankings.controller': rankingsCtrlStub
});

describe('Rankings API Router:', function() {

  it('should return an express router instance', function() {
    rankingsIndex.should.equal(routerStub);
  });

  describe('GET /api/rankings', function() {

    it('should route to rankings.controller.index', function() {
      routerStub.get
        .withArgs('/', 'rankingsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/rankings/:id', function() {

    it('should route to rankings.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'rankingsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/rankings', function() {

    it('should route to rankings.controller.create', function() {
      routerStub.post
        .withArgs('/', 'rankingsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/rankings/:id', function() {

    it('should route to rankings.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'rankingsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/rankings/:id', function() {

    it('should route to rankings.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'rankingsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/rankings/:id', function() {

    it('should route to rankings.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'rankingsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
