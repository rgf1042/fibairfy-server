const request = require('supertest');
const chai = require('chai');
const auth = require('../utils/auth');
const project = require('../utils/project');
const fs = require('fs');

// We enable chai-things
chai.should();
chai.use(require('chai-things'));

// Auth info
const username = 'output';
const passwd = 'password';
var authorization = {};

// Project info
const name = 'export';
var id;

// Functions
function importProject(done) {
    request(sails.hooks.http.app)
        .post('/api/v1/import')
        .set('Authorization', 'bearer ' + authorization.token)
        .field('project', id)
        .attach('data', 'test/assets/well2.geojson')
        .end(function(err, response) {
            if (err) return done(err);
            done();
        });
}

describe('Output', function() {
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
                        id = project.id;
                        importProject(done);
                        // done()
                    });
                }
            );
        });
    });

    it('should export a feature array with equal size (project)', function(done) {
        request(sails.hooks.http.app)
            .get('/api/v1/export/' + id)
            .set('Authorization', 'bearer ' + authorization.token)
            .end(function(err, response) {
                if (err) return done(err);
                let well2file = fs.readFileSync('test/assets/well2.geojson');
                let well2content = JSON.parse(well2file);
                // First we test sizes between well2 and response
                chai.assert.strictEqual(
                    well2content.features.length,
                    response.body.features.length
                );
                done();
            });
    });

    it('should export geometry values well formatted (project)', function(done) {
        request(sails.hooks.http.app)
            .get('/api/v1/export/' + id)
            .set('Authorization', 'bearer ' + authorization.token)
            .end(function(err, response) {
                if (err) return done(err);
                let well2file = fs.readFileSync('test/assets/well2.geojson');
                let well2content = JSON.parse(well2file);
                for (let x in well2content.features) {
                    let content = well2content.features[x].geometry;
                    let flag = false;
                    for (
                        let y = 0;
                        y < response.body.features.length && !flag;
                        ++y
                    ) {
                        let content2 = response.body.features[y].geometry;
                        if (
                            content.type === content2.type &&
                            content.type === 'Point'
                        ) {
                            flag =
                                content2.coordinates[0] ===
                                    content.coordinates[0] &&
                                content2.coordinates[1] ===
                                    content.coordinates[1];
                        } else if (
                            content.type === content2.type &&
                            content.type === 'LineString'
                        ) {
                            for (
                                let z = 0;
                                z < content.coordinates.length && !flag;
                                ++z
                            ) {
                                // In this case the flag indicates there is a fail (we invalidate)
                                if (
                                    content2.coordinates[z] &&
                                    content.coordinates[z]
                                ) {
                                    flag = !(
                                        content2.coordinates[z][0] ===
                                            content.coordinates[z][0] &&
                                        content2.coordinates[z][1] ===
                                            content.coordinates[z][1]
                                    );
                                }
                            }
                            flag = !flag; // This flag is inverse
                        }
                    }
                    chai.assert.isOk(flag);
                }
                done();
            });
    });

    it('should export a feature array with equal size (all)', async function() {
        let number = 0;
        number = await Path.count();
        number += await Site.count();
        
        const response = await request(sails.hooks.http.app)
            .get('/api/v1/export/all')
            .set('Authorization', 'bearer ' + authorization.token);    
        chai.assert.strictEqual(number, response.body.features.length);
    });
});
