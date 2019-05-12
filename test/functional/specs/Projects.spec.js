const request = require('supertest');
const chai = require('chai');
const auth = require('../utils/auth');

// Auth info
const username = 'testProject';
const passwd = 'password';
var authorization = {};

// Project info
const name = 'default';
const latitude = 41.66060124302088;
const longitude = 1.571044921875;
const zoom = 8;
const defaultZone = 2413;
const status = 'Planned';
var id;

describe('Project', function() {
    // First we have to login and get a valid token
    before(function(done) {
        auth.createUser(username, passwd, function(err) {
            if (err) return done(err);
            auth.localAuth(
                { username: username, password: passwd },
                authorization,
                done
            );
        });
    });

    it('should create project', function(done) {
        // Create Project
        request(sails.hooks.http.app)
            .post('/api/v1/project')
            .set('Authorization', 'bearer ' + authorization.token)
            .send({
                name: name,
                latitude: latitude,
                longitude: longitude,
                zoom: zoom,
                defaultZone: defaultZone,
            })
            .end(function(err, response) {
                if (err) return done(err);
                id = response.body.id;
                Project.findOne({ id: response.body.id }).exec(function(
                    err,
                    project
                ) {
                    if (err) return done(err, sails);
                    chai.assert.equal(project.name, name);
                    chai.assert.equal(project.latitude, latitude);
                    chai.assert.equal(project.longitude, longitude);
                    chai.assert.equal(project.zoom, zoom);
                    chai.assert.equal(project.defaultZone, defaultZone);
                    done();
                });
            });
    });

    it('should count total projects', function(done) {
        Project.count().exec(function(err, count) {
            if (err) return done(err);
            request(sails.hooks.http.app)
                .get('/api/v1/project/count')
                .set('Authorization', 'bearer ' + authorization.token)
                .end(function(err, response) {
                    if (err) return done(err);
                    chai.assert.equal(response.body.count, count);
                    done();
                });
        });
    });

    it('should count projects with given criteria', function(done) {
        Project.count({ where: { name: { contains: name } } }).exec(function(
            err,
            count
        ) {
            if (err) return done(err);
            request(sails.hooks.http.app)
                .get('/api/v1/project/count')
                .set('Authorization', 'bearer ' + authorization.token)
                .query({ where: { name: { contains: 'default' } } })
                .end(function(err, response) {
                    if (err) return done(err);
                    chai.assert.equal(response.body.count, count);
                    done();
                });
        });
    });

    it('should delete project', function(done) {
        // Delete Project
        request(sails.hooks.http.app)
            .delete('/api/v1/project')
            .set('Authorization', 'bearer ' + authorization.token)
            .send({
                id: id,
            })
            .end(function(err, response) {
                if (err) return done(err);
                Project.findOne({ id: id }).exec(function(err, project) {
                    if (err) return done(err);
                    try {
                        chai.expect(project).to.be.undefined;
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });
    });

    it('should not get ProjectOwnership entries from deleted project', function(done) {
        // Test Project assignations to users
        ProjectOwnership.find({ project: id }).exec(function(err, ownerships) {
            if (err) return done(err);
            try {
                chai.expect(ownerships).to.be.empty;
                done();
            } catch (e) {
                done(e);
            }
        });
    });
});
