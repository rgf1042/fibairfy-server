const request = require('supertest');
const chai = require('chai');
const auth = require('../utils/auth');
const project = require('../utils/project');
const geolib = require('geolib');

// We enable chai-things
chai.should();
chai.use(require('chai-things'));

// Auth info
const username = 'civil';
const passwd = 'password';
var authorization = {};

// Project info
const name = 'civil';
var projectId;

//Sites
var site1 = {
    name: 'siteTest1',
    type: 'manhole',
    latitude: 41.8368598,
    longitude: 2.2798884,
    status: 'Planned',
    zone: 2413,
};

var site2 = {
    name: 'siteTest2',
    type: 'manhole',
    latitude: 41.8368998,
    longitude: 2.2826457,
    status: 'Planned',
    zone: 2413,
};

const distance = geolib.getDistance(site1, site2);

var path = {
    name: 'pathTest1',
    type: 'notdefined',
    observations: 'Testing!',
};

const newStatus = 'Working';

describe('Civil', function() {
    before(function(done) {
        auth.createUser(username, passwd, function(err) {
            if (err) return done(err);
            auth.localAuth(
                { username: username, password: passwd },
                authorization,
                function(err) {
                    if (err) return done(err);
                    project.createDefaultProject(name, username, function(
                        project,
                        err
                    ) {
                        if (err) return done(err);
                        projectId = project.id;
                        site1.project = projectId;
                        site2.project = projectId;
                        path.project = projectId;
                        done();
                    });
                }
            );
        });
    });

    it('should create one site', function(done) {
        request(sails.hooks.http.app)
            .post('/api/v1/site')
            .set('Authorization', 'bearer ' + authorization.token)
            .send(site1)
            .end(function(err, response) {
                if (err) return done(err);
                chai.assert.equal(response.body.name, site1.name);
                chai.assert.equal(response.body.type, site1.type);
                chai.assert.equal(response.body.latitude, site1.latitude);
                chai.assert.equal(response.body.longitude, site1.longitude);
                site1.id = response.body.id;
                path.first = site1.id;
                done();
            });
    });

    it('should create another site', function(done) {
        request(sails.hooks.http.app)
            .post('/api/v1/site')
            .set('Authorization', 'bearer ' + authorization.token)
            .send(site2)
            .end(function(err, response) {
                if (err) return done(err);
                chai.assert.equal(response.body.name, site2.name);
                chai.assert.equal(response.body.type, site2.type);
                chai.assert.equal(response.body.latitude, site2.latitude);
                chai.assert.equal(response.body.longitude, site2.longitude);
                site2.id = response.body.id;
                path.last = site2.id;
                done();
            });
    });

    it('should create a path between both sites', function(done) {
        request(sails.hooks.http.app)
            .post('/api/v1/path')
            .set('Authorization', 'bearer ' + authorization.token)
            .send(path)
            .end(function(err, response) {
                if (err) return done(err);
                chai.assert.equal(response.body.name, path.name);
                chai.assert.equal(response.body.type, path.type);
                chai.assert.equal(response.body.first, path.first);
                chai.assert.equal(response.body.last, path.last);
                chai.assert.equal(
                    response.body.observations,
                    path.observations
                );
                chai.assert.equal(response.body.distance, distance);
                path.id = response.body.id;
                done();
            });
    });

    it("shouldn't create a site without project", function(done) {
        request(sails.hooks.http.app)
            .post('/api/v1/site')
            .set('Authorization', 'bearer ' + authorization.token)
            .send({
                name: site1.name + 'bad',
                type: site1.type,
                latitude: site1.latitude,
                longitude: site1.longitude,
                status: site1.status,
                zone: site1.zone,
            })
            .end(function(err, response) {
                if (err) return done(err);
                chai.assert.equal(response.status, 400);
                done();
            });
    });

    it('should update a site', function(done) {
        let newName = 'siteTest1Mod';
        request(sails.hooks.http.app)
            .put('/api/v1/site/' + site1.id)
            .set('Authorization', 'bearer ' + authorization.token)
            .send({
                name: newName,
                project: projectId,
            })
            .end(function(err, response) {
                if (err) return done(err);
                chai.assert.equal(response.body.name, newName);
                chai.assert.equal(response.body.id, site1.id);
                done();
            });
    });

    it('should update a site geoloc with associated paths and then update paths distances ', function(done) {
        let latitude = site1.latitude + 0.53698;
        let newDistance = geolib.getDistance(
            {
                latitude: latitude,
                longitude: site1.longitude,
            },
            site2
        );

        request(sails.hooks.http.app)
            .put('/api/v1/site/' + site1.id)
            .set('Authorization', 'bearer ' + authorization.token)
            .send({
                latitude: latitude,
                project: projectId,
            })
            .end(function(err, response) {
                if (err) return done(err);
                chai.assert.equal(response.body.latitude, latitude);
                chai.assert.equal(response.body.id, site1.id);
                Path.findOne(path.id).exec(function(err, path) {
                    if (err) return done(err);
                    chai.assert.equal(path.distance, newDistance);
                    done();
                });
            });
    });

    it('should update status attributtes globally (project)', async function() {
        // Get counters
        const countSites = await Site.count({ project: projectId });
        const countPaths = await Path.count({ project: projectId });
        
        const response = await request(sails.hooks.http.app)
            .patch('/api/v1/project/globalStatus')
            .set('Authorization', 'bearer ' + authorization.token)
            .send({
                id: projectId,
                status: newStatus,
            });
        chai.assert.equal(response.body.msg, 'Done');
    
        const countSitesAfter = await Site.count({
            project: projectId,
            status: newStatus,
        });
        const countPathsAfter = await Path.count({
            project: projectId,
            status: newStatus,
        });
        // We test same counters
        chai.assert.equal(countSites, countSitesAfter);
        chai.assert.equal(countPaths, countPathsAfter);
    });

    it('should destroy a site', function(done) {
        request(sails.hooks.http.app)
            .delete('/api/v1/site/' + site1.id)
            .set('Authorization', 'bearer ' + authorization.token)
            .end(function(err, response) {
                if (err) return done(err);
                Site.findOne(site1.id).exec(function(err, site) {
                    if (err) return done(err);
                    chai.expect(site).to.be.undefined;
                    done();
                });
            });
    });

    it('should destroy paths when its sites are destroyed', function(done) {
        Path.findOne(path.id).exec(function(err, path) {
            if (err) return done(err);
            chai.expect(path).to.be.undefined;
            done();
        });
    });
});
