'use strict'

const Controller = require('trails-controller')

/**
 * @module FiberTemplateController
 * @description Generated Trails.js Controller.
 */
module.exports = class FiberTemplateController extends Controller{
  _Model() {
    return ('FiberTemplate')
  }
  create(request, reply) {
    this.log.debug('[',this.constructor.name,'] (create) model =',
      this._Model(), ', criteria =', request.query,
      ', values = ', request.body)

    request.body.user = request.user.id

    let that = this

    if (!request.body
      || !request.body.user) {
      reply.json({flag: false, data: '', message: 'Error!'})
      return
    }

    const FootprintService = that.app.services.FootprintService

    FootprintService.create(this._Model(), request.body)
      .then(elements => {
        reply.status(200).json(elements || {})
      }).catch(error => {
        if (error.code == 'E_VALIDATION') {
          reply.status(400).json(error)
        }
        else if (error.code == 'E_NOT_FOUND') {
          reply.status(404).json(error)
        }
      else {
          reply.boom.wrap(error)
        }
      })
  }
  find(request, reply) {
    const FootprintService = this.app.services.FootprintService

    const id = request.params.id

    this.log.debug('[',this.constructor.name,'] (find) model =',
      this._Model(), ', criteria =', request.query, id,
      ', values = ')

    let response

    //let where =  { user: request.user.id }
    let where = {}
    if (id) where.id = id

    response = FootprintService.find(this._Model(), where)

    response.then(elements => {
      reply.status(elements ? 200 : 404).json(elements || {})
    }).catch(error => {
      if (error.code == 'E_VALIDATION') {
        reply.status(400).json(error)
      }
      else if (error.code == 'E_NOT_FOUND') {
        reply.status(404).json(error)
      }
      else {
        reply.boom.wrap(error)
      }
    })
  }
  update(request, reply) {
    const id = request.params.id
    this.log.debug('[',this.constructor.name,'] (update) model =',
      this._Model(), ', criteria =', request.query, id,
      ', values = ', request.body)
    let response

    let that = this
    let where =  { user: request.user.id }
    if (id) where.id = id

    const FootprintService = that.app.services.FootprintService
    response = FootprintService.update(this._Model(), where , request.body)

    response.then(elements => {
      reply.status(200).json(elements || {})
    }).catch(error => {
      if (error.code == 'E_VALIDATION') {
        reply.status(400).json(error)
      }
      else if (error.code == 'E_NOT_FOUND') {
        reply.status(404).json(error)
      }
      else {
        reply.boom.wrap(error)
      }
    })
  }
  destroy(request, reply) {
    const id = request.params.id
    this.log.debug('[',this.constructor.name,'] (destroy) model =',
      this._Model(), ', criteria =', request.query, id, request.user.username, request.user.id)

    let response

    let that = this

    const FootprintService = this.app.services.FootprintService
    let where =  { user: request.user.id }
    if (!id) {
      reply.status(500).json({flag: false, data: '', message: 'Error, you can not remove without id.'})
      return
    }

    where.id = id

    response = FootprintService.destroy(this._Model(), where)

    response.then(elements => {
      reply.status(200).json(elements || {})
    }).catch(error => {
      if (error.code == 'E_VALIDATION') {
        reply.status(400).json(error)
      }
      else if (error.code == 'E_NOT_FOUND') {
        reply.status(404).json(error)
      }
      else {
        reply.boom.wrap(error)
      }
    })
  }

}
