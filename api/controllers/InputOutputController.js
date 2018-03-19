/**
 * InputOutputController
 *
 * @description :: Server-side logic for managing Input/Output data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const tj = require('togeojson')
const fs = require('fs')
const DOMParser = require('xmldom').DOMParser
const mime = require('mime-types')

function importSites (data, project) {
  return new Promise((resolve, reject) => {
    try {
      if (data.type !== 'FeatureCollection') {
        reject({ msg: 'GeoJSON its not well formatted'})
      }
      let promises = []
      let sites = []
      let positions = data.features
      for (let x in positions) {
        // We iterate geojson
        if (positions[x].type !== 'Feature') {
          reject({ msg: 'GeoJSON its not well formatted'})
        }
        if (positions[x].geometry.type === 'Point') {
          // We import this site
          let site = {}
          site['type'] = 'manhole' // Define default not hardcoded
          if (positions[x].properties) { // We have to test if it's possible somewhere
            if (positions[x].properties.name) site['name'] = positions[x].properties.name
            if (positions[x].properties.type) site['type'] = positions[x].properties.type
            if (positions[x].properties.status) site['status'] = positions[x].properties.status
          }

          site['latitude'] = positions[x].geometry.coordinates[1]
          site['longitude'] = positions[x].geometry.coordinates[0]
          site['project'] = project

          // sites.push(site)
          // Call database ORM
          promises.push(Site.create(site))

        }
      }
      Promise.all(promises).then(function (values) {
        resolve(values)
      })
    }
    catch (err) {
      console.log('trace1: ' + err)
      reject(err)
    }
  })
}

 module.exports = {
   exports: function (req, res) {

   },

   imports: function (req, res) {
     req.file('data').upload({
        // don't allow the total upload size to exceed ~10MB
        maxBytes: 10000000
      }, function whenDone(err, uploadedFiles) {

        if (err) {
          return res.negotiate(err);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0){
          return res.badRequest('No file was uploaded');
        }

        // If no project_id is issued, respond with an error
        if (!req.body.project) {
          return res.badRequest('No project id was issued');
        }

        var data = fs.readFileSync(uploadedFiles[0].fd, 'utf8')
        if (mime.lookup(uploadedFiles[0].fd) === mime.lookup('.geojson')) {
          fs.unlinkSync(uploadedFiles[0].fd)
          importSites(JSON.parse(data), req.body.project).then(response => {
            return res.json(response)
          }, error => {
            return res.json({msg: error})
          })
        }

        if (mime.lookup(uploadedFiles[0].fd) === mime.lookup('.kml')) {
          let kml = new DOMParser().parseFromString(data)
          let converted = tj.kml(kml)
          fs.unlinkSync(uploadedFiles[0].fd)
          importSites(converted, req.body.project).then(response => {
            return res.json({content: response})
          }, error => {
            return res.json({msg: error})
          })
        }

        // fs.unlinkSync(uploadedFiles[0].fd)
        // return res.json({ file: uploadedFiles[0].fd})
        // var kml = new DOMParser().parseFromString(fs.readFileSync(uploadedFiles[0].fd, 'utf8'))
    })
   }
 };
