const request = require('supertest')
const chai = require('chai')
const auth = require('../../auth')

// We enable chai-things
chai.should()
chai.use(require('chai-things'))


// Auth info
const username = 'input'
const passwd = 'password'
var authorization = {}

// Project info
const name = 'import'
const latitude = 41.66060124302088
const longitude = 1.571044921875
const zoom = 8
const defaultZone = 2413
const status = 'Planned'
var id

// Well attributes (to compare)
const wellContent = [
  {
    'notification': 'guifi@guifi.net',
    'stable': 'Yes',
    'name': 'siteTest1',
    'type': 'manhole',
    'latitude': 41.8368598,
    'longitude': 2.2798884,
    'status': 'Planned',
    'graphServer': 0,
    'userCreated': 1,
    'autoCreatedAt': 1521457695,
    'zone': 2413
  },
  {
    'notification': 'guifi@guifi.net',
    'stable': 'Yes',
    'name': 'siteTest2',
    'type': 'manhole',
    'latitude': 41.8368998,
    'longitude': 2.2826457,
    'status': 'Planned',
    'graphServer': 0,
    'userCreated': 1,
    'autoCreatedAt': 1521457695,
    'zone': 2413
  },
  {
    'notification': 'guifi@guifi.net',
    'stable': 'Yes',
    'name': 'Punto 3',
    'type': 'manhole',
    'latitude': 41.8348694,
    'longitude': 2.2809398,
    'status': 'Planned',
    'graphServer': 0,
    'userCreated': 1,
    'autoCreatedAt': 1521457695,
    'zone': 2413
  },
  {
    'notification': 'guifi@guifi.net',
    'stable': 'Yes',
    'id': 100680,
    'name': 'siteTest3',
    'type': 'manhole',
    'latitude': 41.8372915,
    'longitude': 2.2810364,
    'status': 'Planned',
    'graphServer': 0,
    'userCreated': 1,
    'autoCreatedAt': 1521457695,
    'zone': 2413
  },
  {
    'notification': 'guifi@guifi.net',
    'stable': 'Yes',
    'name': 'siteTest4',
    'type': 'manhole',
    'latitude': 41.8368279,
    'longitude': 2.2814226,
    'status': 'Planned',
    'graphServer': 0,
    'userCreated': 1,
    'autoCreatedAt': 1521457695,
    'zone': 2413
  }
]

describe('Input', function() {
  before( function (done) {
    User
    .create({username:username,password:passwd}).exec(function(err, user) {
      if (err) done(err)
      auth.localAuth({username: username, password: passwd}, authorization, function () {
        request(sails.hooks.http.app)
          .post('/api/v1/project')
          .set('Authorization', 'bearer ' + authorization.token)
          .send({
              name: name,
              latitude: latitude,
              longitude: longitude,
              zoom: zoom,
              defaultZone: defaultZone
            })
          .end(function(err, response) {
            if (err) done(err)
            id = response.body.project
            done()
          })
      })
    })
  })

  it('should import well formatted GeoJSON', function(done) {
    request(sails.hooks.http.app)
      .post('/api/v1/import')
      .set('Authorization', 'bearer ' + authorization.token)
      .field('project', id)
      .attach('data', 'test/assets/well.geojson')
      .end(function(err, response) {
        if (err) return done(err)
        for (let x in wellContent) {
          // TODO: busqueda
          response.body.should.contain.a.thing.with.property('name', wellContent[x].name)
          // chai.expect(response.body).to.have.deep.property('name', wellContent[x].name)
        }
        done()
      })
  })
})
