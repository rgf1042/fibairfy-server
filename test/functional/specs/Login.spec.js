const request = require('supertest')
const chai = require('chai')
const faker = require('faker')

describe('Login', function() {
  										it('should local login', function(done) {
    										let name = 'agusti'
    										let password = '1234'

    										request(sails.hooks.http.app)
      .post('/auth/login')
      .send({
        										name,
        										password
      })
      .expect(200)
      .then(() => {
          										chai.assert.isNotEmpty(response.body.token)
          										done()
      })
  })

})
