const request = require('supertest')
const chai = require('chai')

const name = "default"
const latitude = 41.66060124302088
const longitude = 1.571044921875
const zoom = 8
const defaultZone = 2413
const status = 'Planned'

describe('Project', function() {
  it('should create project', function(done){
    // Create User
    Project
    .create({
        name: name,
        latitude: latitude,
        longitude: longitude,
        zoom: zoom,
        defaultZone: defaultZone
      }
    ).exec(function(err, project) {
        chai.assert.equal(project.name, name)
        chai.assert.equal(project.latitude, latitude)
        chai.assert.equal(project.longitude, longitude)
        chai.assert.equal(project.zoom, zoom)
        chai.assert.equal(project.defaultZone, defaultZone)
        done()
    })
  })

})
