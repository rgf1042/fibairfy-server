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
const geolib = require('geolib')
const unzip = require('unzip')

function processKML (path) {
  let data = fs.readFileSync(path, 'utf8')
  let kml = new DOMParser().parseFromString(data)
  let converted = tj.kml(kml)
  fs.unlinkSync(path)
  return converted
}

function importSites (data, project, zone) {
  console.log(zone)
  return new Promise((resolve, reject) => {
    try {
      if (data.type !== 'FeatureCollection') {
        reject({ msg: 'GeoJSON its not well formatted'})
      }
      let sites = []
      let paths = []
      let positions = data.features
      for (let x in positions) {
        // We iterate geojson
        if (positions[x].type !== 'Feature') {
          reject({ msg: 'GeoJSON its not well formatted'})
        }
        if (positions[x].geometry.type === 'Point') {
          // We import this site
          let site = {}
          site['type'] = 'notdefined' // Define default not hardcoded
          if (positions[x].properties) { // We have to test if it's possible somewhere
            if (positions[x].properties.name) site['name'] = positions[x].properties.name
            if (positions[x].properties.type) site['type'] = positions[x].properties.type
            if (positions[x].properties.status) site['status'] = positions[x].properties.status
          }

          site['latitude'] = positions[x].geometry.coordinates[1]
          site['longitude'] = positions[x].geometry.coordinates[0]
          site['project'] = project
          site['zone'] = zone
          // Call database ORM
          if (!isNaN(site.latitude) && !isNaN(site.longitude)) {
            sites.push(site)
          }
        }
        else if (positions[x].geometry.type === 'LineString') {
          // Test minimum 2
          let path = {}
          let flag = true
          path['name'] = 'path' + Math.floor(Math.random() * 100000)
          path['type'] = 'notdefined'
          path['intermedial'] = []
          for (let y in positions[x].geometry.coordinates) {
            let latitude = positions[x].geometry.coordinates[y][1]
            let longitude = positions[x].geometry.coordinates[y][0]
            if (isNaN(latitude) || isNaN(longitude)) flag = false
            // let siteName = 'site' + Math.floor(Math.random() * 100000) // This must improve
            path.intermedial.push([
              latitude,
              longitude
            ])
          }
          if (flag) {
            paths.push(path)
          }
        }
      }

      let sitesPromises = []
      let pathsPromises = []
      // Now we have to work with paths and sites
      let threshold = 10 // Not hardcoded (in meters)
      for (let x in paths) {
        // Search first/end point existence
        // If exists use existing point
        let posIni = sites.findIndex(function (e, index) {
          let dist = geolib.getDistance(
            {latitude: paths[x].intermedial[0][0],
            longitude: paths[x].intermedial[0][1]},
            {latitude: e.latitude, longitude: e.longitude}
          )
          return (dist < threshold)
        })
        let posEnd = sites.findIndex(function (e, index) {
          let end = paths[x].intermedial.length -1
          let dist = geolib.getDistance(
            {latitude: paths[x].intermedial[end][0],
            longitude: paths[x].intermedial[end][1]},
            {latitude: e.latitude, longitude: e.longitude}
          )
          return (dist < threshold)
        })
        if(posIni < 0) { // In this case we have to create a Site
          let newSite = {}
          newSite['name'] = 'site' + Math.floor(Math.random() * 100000)
          newSite['type'] = 'notdefined'
          newSite['latitude'] = paths[x].intermedial[0][0]
          newSite['longitude'] = paths[x].intermedial[0][1]
          newSite['project'] = project
          newSite['zone'] = zone
          sites.push(newSite)
          posIni = sites.length - 1
        }
        if(posEnd < 0) { // In this case we have to create a Site
          let newSite = {}
          let end = paths[x].intermedial.length -1
          newSite['name'] = 'site' + Math.floor(Math.random() * 100000)
          newSite['type'] = 'notdefined'
          newSite['latitude'] = paths[x].intermedial[end][0]
          newSite['longitude'] = paths[x].intermedial[end][1]
          newSite['project'] = project
          newSite['zone'] = zone
          sites.push(newSite)
          posEnd = sites.length - 1
        }
        paths[x].posIni = posIni
        paths[x].posEnd = posEnd
      }
      for (let x in sites) {
        sitesPromises.push(Site.create(sites[x]))
      }
      let result = []
      Promise.all(sitesPromises).then(function (values) {
        for (let x in paths) {
          let path = paths[x]
          path.intermedial.splice(0, 1)
          path.intermedial.splice(path.intermedial.length - 1, 1)
          pathsPromises.push(Path.create({
            name: path.name,
            type: path.type,
            intermedial: path.intermedial,
            first: values[path.posIni].id,
            last: values[path.posEnd].id,
            project: project
          }))
          result = result.concat(values)
        }
        Promise.all(pathsPromises).then(function (values) {
          resolve(result.concat(values))
        }).catch(function (reason) {
          console.log(reason)
          reject(reason)
        })
      }).catch(function (reason) {
        console.log(reason)
        reject(reason)
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
        console.log(req.body.defaultZone)
        if (mime.lookup(uploadedFiles[0].fd) === mime.lookup('.kmz')) {
          fs.createReadStream(uploadedFiles[0].fd)
            .pipe(unzip.Parse())
            .on('entry', function (entry) {
              var fileName = entry.path
              var type = entry.type // 'Directory' or 'File'
              var size = entry.size
              if (fileName === 'doc.kml') {
                entry.pipe(fs.createWriteStream(uploadedFiles[0].fd + '.kml'))
                  .on('close', function () {
                    fs.unlinkSync(uploadedFiles[0].fd)
                    let data = processKML(uploadedFiles[0].fd + '.kml')
                    importSites(data, req.body.project, req.body.defaultZone).then(response => {
                      return res.json(response)
                    }, error => {
                      return res.json({msg: error})
                    })
                  })
              } else {
                entry.autodrain()
              }
            })
        }
        else if (mime.lookup(uploadedFiles[0].fd) === mime.lookup('.geojson')) {
          let data = fs.readFileSync(uploadedFiles[0].fd, 'utf8')
          fs.unlinkSync(uploadedFiles[0].fd)
          importSites(JSON.parse(data), req.body.project).then(response => {
            return res.json(response)
          }, error => {
            return res.json({msg: error})
          })
        }
        else if (mime.lookup(uploadedFiles[0].fd) === mime.lookup('.kml')) {
          let data = processKML(fs.readFileSync(uploadedFiles[0].fd, 'utf8'))
          importSites(data, req.body.project).then(response => {
            return res.json(response)
          }, error => {
            return res.json({msg: error})
          })
        }
    })
   }
 };
