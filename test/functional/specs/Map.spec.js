const request = require('supertest')
const chai = require('chai')
const auth = require('../utils/auth')
const project = require('../utils/project')

// We enable chai-things
chai.should()
chai.use(require('chai-things'))


// Auth info
const username = 'map'
const passwd = 'password'
var authorization = {}

const WELL_ANSWER = [
    {
        'layers': [
            {
                'id': 1,
                'name': 'Llocs',
                'description': 'Obra cívil localitzacions',
                'isBase': false,
                'options': {
                    'format': 'image/png',
                    'transparent': true,
                    'version': '1.1.1',
                    'uppercase': true,
                    'layers': 'Sites',
                    'attribution': 'Guifi.net FO'
                },
                'map': 1
            },
            {
                'id': 6,
                'name': 'Trams de fibra',
                'description': 'Obra civil trams',
                'isBase': false,
                'options': {
                    'format': 'image/png',
                    'transparent': true,
                    'version': '1.1.1',
                    'uppercase': true,
                    'layers': 'Paths',
                    'attribution': 'Guifi.net FO'
                },
                'map': 1
            },
            {
                'id': 8,
                'name': 'Nodes',
                'description': 'Nodes de Guifi.net',
                'isBase': false,
                'options': {
                    'format': 'image/png',
                    'transparent': true,
                    'version': '1.1.1',
                    'uppercase': true,
                    'layers': 'Nodes',
                    'attribution': 'Guifi.net Radio'
                },
                'map': 1
            },
            {
                'id': 7,
                'name': 'Enllaços radio',
                'description': 'Enllaços de radio de Guifi.net',
                'isBase': false,
                'options': {
                    'format': 'image/png',
                    'transparent': true,
                    'version': '1.1.1',
                    'uppercase': true,
                    'layers': 'Links',
                    'attribution': 'Guifi.net Radio'
                },
                'map': 1
            }
        ],
        'id': 1,
        'name': 'Guifi WMS Maps',
        'description': 'Mapes de Guifi.net',
        'type': 'wms',
        'internal': true,
        'options': {
            'crs': 'EPSG:3857'
        },
        'url': 'http://localhost:1337/api/v1/maps/wms/auth/1'
    },
    {
        'layers': [
            {
                'id': 5,
                'name': 'Viari',
                'description': 'Mapa viari d\'OpenStreetMap.org',
                'isBase': true,
                'options': {
                    'path': '{z}/{x}/{y}.png',
                    'maxZoom': 20,
                    'attribution': '<a href=\"http://openstreetmap.org\">&copy; OpenStreetMap</a>, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>'
                },
                'map': 3
            }
        ],
        'id': 3,
        'name': 'OpenStreetMap.org',
        'description': 'Mapes d\'OpenStreetMap.org',
        'type': 'tiles',
        'url': 'https://{s}.tile.openstreetmap.org/',
        'internal': false,
        'options': null
    },
    {
        'layers': [
            {
                'id': 2,
                'name': 'Satelit',
                'description': 'Vistes aeries Google Maps',
                'isBase': true,
                'options': {
                    'subdomains': [
                        'mt0',
                        'mt1',
                        'mt2',
                        'mt3'
                    ],
                    'path': 'lyrs=s&x={x}&y={y}&z={z}',
                    'attribution': '<a href=\"http://maps.google.es\">&copy; Google Maps</a> contributors'
                },
                'map': 2
            },
            {
                'id': 3,
                'name': 'Topografic',
                'description': 'Topogràfic de Google Maps',
                'isBase': true,
                'options': {
                    'subdomains': [
                        'mt0',
                        'mt1',
                        'mt2',
                        'mt3'
                    ],
                    'path': 'lyrs=p&x={x}&y={y}&z={z}',
                    'attribution': '<a href=\"http://maps.google.es\">&copy; Google Maps</a> contributors'
                },
                'map': 2
            },
            {
                'id': 4,
                'name': 'Viari',
                'description': 'Mapa viari de Google Maps',
                'isBase': true,
                'options': {
                    'subdomains': [
                        'mt0',
                        'mt1',
                        'mt2',
                        'mt3'
                    ],
                    'path': 'lyrs=m&x={x}&y={y}&z={z}',
                    'attribution': '<a href=\"http://maps.google.es\">&copy; Google Maps</a> contributors'
                },
                'map': 2
            }
        ],
        'id': 2,
        'name': 'Google Maps',
        'description': 'Google Maps tiles',
        'type': 'tiles',
        'url': 'https://{s}.google.com/vt/',
        'internal': false,
        'options': null
    }
]

const WELL_ANSWER_NOAUTH = [
    {
        'layers': [
            {
                'id': 8,
                'name': 'Nodes',
                'description': 'Nodes de Guifi.net',
                'isBase': false,
                'options': {
                    'format': 'image/png',
                    'transparent': true,
                    'version': '1.1.1',
                    'uppercase': true,
                    'layers': 'Nodes',
                    'attribution': 'Guifi.net Radio'
                },
                'map': 1
            },
            {
                'id': 7,
                'name': 'Enllaços radio',
                'description': 'Enllaços de radio de Guifi.net',
                'isBase': false,
                'options': {
                    'format': 'image/png',
                    'transparent': true,
                    'version': '1.1.1',
                    'uppercase': true,
                    'layers': 'Links',
                    'attribution': 'Guifi.net Radio'
                },
                'map': 1
            }
        ],
        'id': 1,
        'name': 'Guifi WMS Maps',
        'description': 'Mapes de Guifi.net',
        'type': 'wms',
        'internal': true,
        'options': {
            'crs': 'EPSG:3857'
        },
        'url': 'http://localhost:1337/api/v1/maps/wms/noauth/1'
    },
    {
        'layers': [
            {
                'id': 5,
                'name': 'Viari',
                'description': 'Mapa viari d\'OpenStreetMap.org',
                'isBase': true,
                'options': {
                    'path': '{z}/{x}/{y}.png',
                    'maxZoom': 20,
                    'attribution': '<a href=\"http://openstreetmap.org\">&copy; OpenStreetMap</a>, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>'
                },
                'map': 3
            }
        ],
        'id': 3,
        'name': 'OpenStreetMap.org',
        'description': 'Mapes d\'OpenStreetMap.org',
        'type': 'tiles',
        'url': 'https://{s}.tile.openstreetmap.org/',
        'internal': false,
        'options': null
    },
    {
        'layers': [
            {
                'id': 2,
                'name': 'Satelit',
                'description': 'Vistes aeries Google Maps',
                'isBase': true,
                'options': {
                    'subdomains': [
                        'mt0',
                        'mt1',
                        'mt2',
                        'mt3'
                    ],
                    'path': 'lyrs=s&x={x}&y={y}&z={z}',
                    'attribution': '<a href=\"http://maps.google.es\">&copy; Google Maps</a> contributors'
                },
                'map': 2
            },
            {
                'id': 3,
                'name': 'Topografic',
                'description': 'Topogràfic de Google Maps',
                'isBase': true,
                'options': {
                    'subdomains': [
                        'mt0',
                        'mt1',
                        'mt2',
                        'mt3'
                    ],
                    'path': 'lyrs=p&x={x}&y={y}&z={z}',
                    'attribution': '<a href=\"http://maps.google.es\">&copy; Google Maps</a> contributors'
                },
                'map': 2
            },
            {
                'id': 4,
                'name': 'Viari',
                'description': 'Mapa viari de Google Maps',
                'isBase': true,
                'options': {
                    'subdomains': [
                        'mt0',
                        'mt1',
                        'mt2',
                        'mt3'
                    ],
                    'path': 'lyrs=m&x={x}&y={y}&z={z}',
                    'attribution': '<a href=\"http://maps.google.es\">&copy; Google Maps</a> contributors'
                },
                'map': 2
            }
        ],
        'id': 2,
        'name': 'Google Maps',
        'description': 'Google Maps tiles',
        'type': 'tiles',
        'url': 'https://{s}.google.com/vt/',
        'internal': false,
        'options': null
    }
]

describe('Map', function() {
  before( function (done) {
    auth.createUser(username, passwd, function (err) {
      if (err) return done(err)
      auth.localAuth({username: username, password: passwd}, authorization, function (err) {
        if (err) return done(err)
        done()
      })
    })
  })

  it('should get sources and layers list (auth)', function(done) {
    request(sails.hooks.http.app)
      .get('/api/v1/maps/auth')
      .set('Authorization', 'bearer ' + authorization.token)
      .end(function(err, response) {
        if (err) return done(err)
        // Test map objects
        chai.expect(response.body).to.deep.equal(WELL_ANSWER)
        done()
      })
  })

  it('should get sources and layers list (no auth)', function(done) {
    request(sails.hooks.http.app)
      .get('/api/v1/maps/noauth')
      .set('Authorization', 'bearer ' + authorization.token)
      .end(function(err, response) {
        if (err) return done(err)
        // Test map objects
        chai.expect(response.body).to.deep.equal(WELL_ANSWER_NOAUTH)
        done()
      })
  })

})
