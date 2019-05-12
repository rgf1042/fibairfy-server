const request = require('supertest');
const chai = require('chai');
const auth = require('../utils/auth');
const project = require('../utils/project');

// We enable chai-things
chai.should();
chai.use(require('chai-things'));

// Auth info
const username = 'input';
const passwd = 'password';
var authorization = {};

// Project info
const name = 'import';
var id;

// Functions
function eraseContent(project, callback) {
    Site.destroy({
        project: project,
    }).exec(function(err) {
        if (err) callback(err);
        callback();
    });
}

// Well attributes (to compare)
const wellContent = {
    sites: [
        {
            notification: 'guifi@guifi.net',
            stable: 'Yes',
            name: 'siteTest1',
            type: 'manhole',
            latitude: 41.8368598,
            longitude: 2.2798884,
            status: 'Planned',
            graphServer: 0,
            userCreated: 1,
            autoCreatedAt: 1521457695,
            zone: 2413,
        },
        {
            notification: 'guifi@guifi.net',
            stable: 'Yes',
            name: 'siteTest2',
            type: 'manhole',
            latitude: 41.8368998,
            longitude: 2.2826457,
            status: 'Planned',
            graphServer: 0,
            userCreated: 1,
            autoCreatedAt: 1521457695,
            zone: 2413,
        },
        {
            notification: 'guifi@guifi.net',
            stable: 'Yes',
            name: 'Punto 3',
            type: 'manhole',
            latitude: 41.8348694,
            longitude: 2.2809398,
            status: 'Planned',
            graphServer: 0,
            userCreated: 1,
            autoCreatedAt: 1521457695,
            zone: 2413,
        },
        {
            notification: 'guifi@guifi.net',
            stable: 'Yes',
            id: 100680,
            name: 'siteTest3',
            type: 'manhole',
            latitude: 41.8372915,
            longitude: 2.2810364,
            status: 'Planned',
            graphServer: 0,
            userCreated: 1,
            autoCreatedAt: 1521457695,
            zone: 2413,
        },
        {
            notification: 'guifi@guifi.net',
            stable: 'Yes',
            name: 'siteTest4',
            type: 'manhole',
            latitude: 41.8368279,
            longitude: 2.2814226,
            status: 'Planned',
            graphServer: 0,
            userCreated: 1,
            autoCreatedAt: 1521457695,
            zone: 2413,
        },
    ],
    paths: [],
};

describe('Input', function() {
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
                        done();
                    });
                }
            );
        });
    });

    it('should import well formatted GeoJSON', function(done) {
        request(sails.hooks.http.app)
            .post('/api/v1/import')
            .set('Authorization', 'bearer ' + authorization.token)
            .field('project', id)
            .attach('data', 'test/assets/well.geojson')
            .end(function(err, response) {
                if (err) return done(err);
                for (let x in wellContent.sites) {
                    response.body.sites.should.contain.a.thing.with.property(
                        'name',
                        wellContent.sites[x].name
                    );
                    response.body.sites.should.contain.a.thing.with.property(
                        'type',
                        wellContent.sites[x].type
                    );
                }
                done();
            });
    });
});
