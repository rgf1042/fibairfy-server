const request = require('supertest');
const chai = require('chai');
const auth = require('../utils/auth');
const project = require('../utils/project');

// We enable chai-things
chai.should();
chai.use(require('chai-things'));

// Auth info
const username = 'stats';
const passwd = 'password';
var authorization = {};

// Project info
const name = 'stats';
var id;

var sites = [
    {
        name: 'site-58d3e1a0-c71d-11e8-be73-2b831dc51e89',
        observations: null,
        type: 'cabinet',
        latitude: 41.38905107259808,
        longitude: 2.1539425849914555,
        elevation: null,
        notification: 'guifi@guifi.net',
        status: 'Planned',
        stable: 'Yes',
        graphServer: 0,
    },
    {
        name: 'site-27dca230-c71d-11e8-be73-2b831dc51e89',
        observations: null,
        type: 'pole',
        latitude: 41.38740811093965,
        longitude: 2.156249284744263,
        elevation: null,
        notification: 'guifi@guifi.net',
        status: 'Planned',
        stable: 'Yes',
        graphServer: 0,
    },
    {
        name: 'site-1c6c2ab0-c71d-11e8-be73-2b831dc51e89',
        observations: null,
        type: 'room',
        latitude: 41.3890430189657,
        longitude: 2.1562600135803227,
        elevation: null,
        notification: 'guifi@guifi.net',
        status: 'Planned',
        stable: 'Yes',
        graphServer: 0,
    },
    {
        name: 'site-1aea6cb0-c71d-11e8-be73-2b831dc51e89',
        observations: null,
        type: 'notdefined',
        latitude: 41.38816516705771,
        longitude: 2.155058383941651,
        elevation: null,
        notification: 'guifi@guifi.net',
        status: 'Planned',
        stable: 'Yes',
        graphServer: 0,
    },
    {
        name: 'site-19d29410-c71d-11e8-be73-2b831dc51e89',
        observations: null,
        type: 'manhole',
        latitude: 41.38735173406757,
        longitude: 2.153985500335694,
        elevation: null,
        notification: 'guifi@guifi.net',
        status: 'Planned',
        stable: 'Yes',
        graphServer: 0,
    },
];

var paths = [
    {
        name: 'path-21d8de80-c71d-11e8-be73-2b831dc51e89',
        intermedial: [],
        type: 'underground',
        distance: 127,
        observations: '',
        status: 'Planned',
        site_first: sites[4],
        site_last: sites[3],
    },
    {
        name: 'path-24ca8030-c71d-11e8-be73-2b831dc51e89',
        intermedial: [],
        type: 'facade',
        distance: 140,
        observations: '',
        status: 'Planned',
        site_last: sites[3],
        site_first: sites[2],
    },
    {
        name: 'path-2923ef40-c71d-11e8-be73-2b831dc51e89',
        intermedial: [],
        type: 'aerial',
        distance: 130,
        observations: '',
        status: 'Planned',
        site_last: sites[3],
        site_first: sites[1],
    },
    {
        name: 'path-5a50e4b0-c71d-11e8-be73-2b831dc51e89',
        intermedial: [],
        type: 'notdefined',
        distance: 136,
        observations: '',
        status: 'Planned',
        site_last: sites[3],
        site_first: sites[0],
    },
];

const WELL_ANSWER = {
    sites: [
        {
            location_type: 'cabinet',
            count: 1,
        },
        {
            location_type: 'manhole',
            count: 1,
        },
        {
            location_type: 'notdefined',
            count: 1,
        },
        {
            location_type: 'pole',
            count: 1,
        },
        {
            location_type: 'room',
            count: 1,
        },
        {
            location_type: 'total',
            count: 5,
        },
    ],
    paths: [
        {
            type: 'aerial',
            distance: 130,
        },
        {
            type: 'facade',
            distance: 140,
        },
        {
            type: 'notdefined',
            distance: 136,
        },
        {
            type: 'underground',
            distance: 127,
        },
        {
            type: 'total',
            distance: 533,
        },
    ],
};
// Functions
function eraseContent(project, callback) {
    Site.destroy({
        project: project,
    }).exec(function(err) {
        if (err) callback(err);
        callback();
    });
}

async function populateDb(callback) {
    try {
        for (let x in sites) {
            let site = sites[x];
            site.project = id;
            let result = await Site.create(site);
            site.id = result.id;
        }
        for (let x in paths) {
            let path = paths[x];
            path.project = id;
            path.first = path.site_first.id;
            delete path.site_first;
            path.last = path.site_last.id;
            delete path.site_last;
            let result = await Path.create(path);
            path.id = result.id;
            path.first = result.first;
            path.last = result.last;
        }
    } catch (err) {
        return callback(err);
    }
    callback();
}

describe('Stats', function() {
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
                        populateDb(done);
                    });
                }
            );
        });
    });

    it('should get correct project statistics', function(done) {
        request(sails.hooks.http.app)
            .get('/api/v1/stats/project/' + id)
            .set('Authorization', 'bearer ' + authorization.token)
            .end(function(err, response) {
                if (err) return done(err);
                // Test stats objects
                chai.expect(response.body).to.have.own.property('sites');
                chai.expect(response.body).to.have.own.property('paths');
                chai.expect(response.body).to.have.own.property('cables');

                // Testing sites
                for (let x in WELL_ANSWER['sites']) {
                    response.body['sites'].should.contain.a.thing.with.property(
                        'location_type',
                        WELL_ANSWER['sites'][x].location_type
                    );
                    response.body['sites'].should.contain.a.thing.with.property(
                        'count',
                        WELL_ANSWER['sites'][x].count
                    );
                }

                // Testing paths
                for (let x in WELL_ANSWER['paths']) {
                    response.body['paths'].should.contain.a.thing.with.property(
                        'type',
                        WELL_ANSWER['paths'][x].type
                    );
                    response.body['paths'].should.contain.a.thing.with.property(
                        'distance',
                        WELL_ANSWER['paths'][x].distance
                    );
                }
                done();
            });
    });
});
